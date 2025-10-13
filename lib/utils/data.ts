import type {
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
 * @param array - The array to filter.
 * @param mod - The modulus value used for filtering. Defaults to 7 (one value per week).
 * @returns A new array containing elements that satisfy the filtering condition.
 */
export const modFilter = <T>(array: T[], mod: number = 28): T[] =>
  array.filter((_, idx) => idx % mod === (array.length - 1) % mod)

/**
 * Filters an array of objects with a `date` property to only include those where the date is the first or fifteenth day of any month.
 *
 * @param array - The array to filter.
 * @returns A new array containing only elements with dates on the first of the month.
 */
export const filterFirstAndFifteenth = <
  T extends { date: string | number | Date } & Record<string, unknown>,
>(
  array: T[]
): T[] =>
  array.filter((item) => {
    const d = new Date(item.date)
    return d.getDate() === 1 || d.getDate() === 15
  })
