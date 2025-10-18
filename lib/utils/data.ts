import { RWA_API_LAYER_2S, RWA_API_MAINNET } from "../constants"
import type { DataSeries, DataTimestamped, NetworkPieChartData } from "../types"

import { AssetMarketShareData } from "@/app/_actions/fetchAssetMarketShare"

export const stablecoinMarketShareToPieChartData = (
  apiData: DataTimestamped<AssetMarketShareData>
): DataTimestamped<NetworkPieChartData> => {
  return {
    ...apiData,
    data: [
      {
        network: "ethereum",
        marketShare: apiData.data.marketShare.mainnet,
        fill: "var(--color-ethereum)",
      },
      {
        network: "ethereum-l2s",
        marketShare: apiData.data.marketShare.layer2,
        fill: "var(--color-ethereum-l2s)",
      },
      {
        network: "alt-2nd",
        marketShare: apiData.data.marketShare.altNetwork2nd,
        fill: "var(--color-alt-2nd)",
      },
      {
        network: "alt-3rd",
        marketShare: apiData.data.marketShare.altNetwork3rd,
        fill: "var(--color-alt-3rd)",
      },
      {
        network: "alt-rest",
        marketShare: apiData.data.marketShare.altNetworksRest,
        fill: "var(--color-alt-rest)",
      },
    ],
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
 * Filters an array of objects, returning only those whose `date` property falls on the specified days of the month (UTC),
 * and always includes the most recent element in the array (based on UTC time) if not already included.
 *
 * Notes:
 * - The input array is not mutated.
 * - All date checks use UTC (getUTCDate / getTime) to ensure timezone-independent behavior.
 *
 * @template T - The type of objects in the array, which must include a `date` property.
 * @param array - The array of objects to filter.
 * @param dateMatches - An array of day numbers (1-31) to match against the day of the month in each object's `date` property. Defaults to `[1, 15]`.
 * @returns A new array containing only the objects whose `date` property matches one of the specified days (UTC), plus the last element if not already included. Results are returned in ascending chronological order (UTC).
 */
export const filterFirstAndFifteenth = <
  T extends { date: string | number | Date } & Record<string, unknown>,
>(
  array: T[],
  dateMatches = [1, 15]
): T[] => {
  if (!array || array.length < 2) return array

  // Normalize and validate the dateMatches into a Set of integers 1..31
  const matches = new Set<number>(
    dateMatches
      .map((d) => Number(d))
      .filter((n) => Number.isInteger(n) && n >= 1 && n <= 31)
  )

  // Sort a copy of the array by UTC timestamp to avoid mutating the original
  const sorted = [...array].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Filter by UTC day-of-month
  const filtered = sorted.filter((item) =>
    matches.has(new Date(item.date).getUTCDate())
  )

  if (filtered.length < 2) return sorted

  if (filtered[filtered.length - 1].date === sorted[sorted.length - 1].date)
    return filtered

  return [...filtered, sorted[sorted.length - 1]]
}

export const getSeriesWithCurrent = (
  seriesMapped: DataSeries,
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
 * @param seriesMapped - The array of data series objects to process.
 * @param skipFiltering - If true, skips filtering and returns the original series.
 * @returns An object with the processed data series, current value, and last updated timestamp.
 * @throws If the input data series array is empty.
 */
export const getDataSeriesWithCurrent = (
  seriesMapped: DataSeries,
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

  const BASE_FIELD_OPERATOR = {
    field: "networkID",
    operator: "equals",
  }

  const mainnetFilter = {
    ...BASE_FIELD_OPERATOR,
    value: RWA_API_MAINNET.id,
  }

  const layer2Filters = RWA_API_LAYER_2S.map(({ id }) => ({
    ...BASE_FIELD_OPERATOR,
    value: id,
  }))

  const filters = []

  if (networks.includes("mainnet")) filters.push(mainnetFilter)
  if (networks.includes("layer-2")) filters.push(...layer2Filters)

  return { operator: "or", filters }
}
/**
 * Returns an ISO string representing the date `n` days ago from the current date.
 *
 * @param n - The number of days to subtract from the current date. Defaults to 2.
 * @returns An ISO 8601 formatted string of the calculated date.
 */
export const dateNDaysAgo = (n: number = 2) =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString()
