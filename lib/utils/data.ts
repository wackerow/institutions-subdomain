import type {
  DataSeries,
  DataTimestamped,
  NetworkPieChartData,
  RwaMarketshareSummaryData,
} from "../types"

import { RwaMarketshareData } from "@/app/_actions/fetchRwaMarketshare"
import type { StablecoinMarketshareData } from "@/app/_actions/fetchStablecoinMarketshare"

export const stablecoinMarketshareToPieChartData = (
  apiData: DataTimestamped<StablecoinMarketshareData>
): DataTimestamped<NetworkPieChartData> => {
  const totalUSD = Object.values(apiData.data).reduce((sum, v) => sum + v, 0)

  return {
    ...apiData,
    data: [
      {
        network: "ethereum",
        marketshare: apiData.data.ethereumL1StablecoinUSD / totalUSD,
        fill: "var(--color-ethereum)",
      },
      {
        network: "ethereum-l2s",
        marketshare: apiData.data.ethereumL2StablecoinUSD / totalUSD,
        fill: "var(--color-ethereum-l2s)",
      },
      {
        network: "alt-2nd",
        marketshare: apiData.data.altNetwork2ndStablecoinUSD / totalUSD,
        fill: "var(--color-alt-2nd)",
      },
      {
        network: "alt-3rd",
        marketshare: apiData.data.altNetwork3rdStablecoinUSD / totalUSD,
        fill: "var(--color-alt-3rd)",
      },
      {
        network: "alt-rest",
        marketshare: apiData.data.altNetworksRestStablecoinUSD / totalUSD,
        fill: "var(--color-alt-rest)",
      },
    ],
  }
}

export const rwaMarketshareToSummaryData = (
  apiData: DataTimestamped<RwaMarketshareData>
): DataTimestamped<RwaMarketshareSummaryData> => {
  const totalUSD = Object.values(apiData.data).reduce((sum, v) => sum + v, 0)
  return {
    ...apiData,
    data: {
      ethereumL1RwaMarketshare: apiData.data.ethereumL1RwaUSD / totalUSD,
      ethereumL1L2RwaMarketshare:
        (apiData.data.ethereumL1RwaUSD + apiData.data.ethereumL2RwaUSD) /
        totalUSD,
    },
  }
}

/**
 * Trim large timeseries data, default one value per week (mod 7).
 * Filters any array to include only elements whose index modulo `mod` equals the last index modulo `mod`.
 *
 * @deprecated Use filterFirstAndFifteenth for data series trimming
 * @param array - The array to filter.
 * @param mod - The modulus value used for filtering. Defaults to 7 (one value per week).
 * @returns A new array containing elements that satisfy the filtering condition.
 */
export const modFilter = <T>(array: T[], mod: number = 28): T[] =>
  array.filter((_, idx) => idx % mod === (array.length - 1) % mod)

/**
 * Filters an array of objects, returning only those whose `date` property falls on the specified days of the month,
 * and always includes the last element in the array if not already included.
 *
 * @template T - The type of objects in the array, which must include a `date` property.
 * @param array - The array of objects to filter.
 * @param dateMatches - An array of day numbers (1-31) to match against the day of the month in each object's `date` property. Defaults to `[1, 15]`.
 * @returns A new array containing only the objects whose `date` property matches one of the specified days, plus the last element if not already included.
 */
export const filterFirstAndFifteenth = <
  T extends { date: string | number | Date } & Record<string, unknown>,
>(
  array: T[],
  dateMatches = [1, 15]
): T[] => {
  const filtered = array.filter((item) =>
    dateMatches.includes(new Date(item.date).getUTCDate())
  )
  const last = array[array.length - 1]
  // Check if last is already included (by reference)
  if (last && !filtered.includes(last)) {
    filtered.push(last)
  }
  return filtered
}

export const getSeriesWithCurrent = <T extends number | string = number>(
  seriesMapped: DataSeries<T>,
  skipFiltering?: boolean
) => {
  if (seriesMapped?.length <= 0) throw new Error("Data series array empty")

  const series = skipFiltering
    ? seriesMapped
    : filterFirstAndFifteenth(seriesMapped)

  return {
    series,
    currentValue: seriesMapped[seriesMapped.length - 1].value,
  }
}

/**
 * Returns a data series object containing the filtered or unfiltered series,
 * the current value, and the last updated timestamp.
 *
 * @template T - The type of the data series values (number or string).
 * @param seriesMapped - The array of data series objects to process.
 * @param skipFiltering - If true, skips filtering and returns the original series.
 * @returns An object with the processed data series, current value, and last updated timestamp.
 * @throws If the input data series array is empty.
 */
export const getDataSeriesWithCurrent = <T extends number | string = number>(
  seriesMapped: DataSeries<T>,
  skipFiltering?: boolean
) => ({
  data: getSeriesWithCurrent(seriesMapped, skipFiltering),
  lastUpdated: new Date(seriesMapped[seriesMapped.length - 1].date).getTime(),
})

/**
 * Generates a filter object for querying RWA API by Ethereum network IDs.
 *
 * @param networks - An array specifying which networks to include in the filter.
 *                   Possible values are "mainnet" and "layer-2". Defaults to both.
 * @returns An object containing an "or" operator and an array of filter conditions
 *          for the specified networks. If no networks are provided, returns an empty object.
 */
export const getRwaApiEthereumNetworksFilter = (
  networks: ("mainnet" | "layer-2")[] = ["mainnet", "layer-2"]
) => {
  if (!networks.length) return

  type NETWORK_ID = { id: number; name: string }

  const MAINNET_NETWORK_ID: NETWORK_ID = { id: 1, name: "Ethereum" }

  const RWA_API_NETWORK_IDS: NETWORK_ID[] = [
    { id: 35, name: "Blast" },
    { id: 7, name: "Celo" },
    { id: 10, name: "Base" },
    { id: 4, name: "Optimism" },
    { id: 11, name: "Arbitrum" },
    { id: 33, name: "Mantle" },
    { id: 3, name: "Polygon" },
    { id: 31, name: "ZKsync Era" },
  ]

  const BASE_FIELD_OPERATOR = {
    field: "networkID",
    operator: "equals",
  }

  const mainnetFilter = {
    ...BASE_FIELD_OPERATOR,
    value: MAINNET_NETWORK_ID.id,
  }

  const layer2Filters = RWA_API_NETWORK_IDS.map(({ id }) => ({
    ...BASE_FIELD_OPERATOR,
    value: id,
  }))

  const filters = []

  if (networks.includes("mainnet")) filters.push(mainnetFilter)
  if (networks.includes("layer-2")) filters.push(...layer2Filters)

  return { operator: "or", filters }
}
