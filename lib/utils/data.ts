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
        marketshare:
          (apiData.data.ethereumL1StablecoinUSD +
            apiData.data.ethereumL2StablecoinUSD) /
          totalUSD,
        fill: "var(--color-ethereum)",
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
export const modFilter = <T>(array: T[], mod: number = 7): T[] =>
  array.filter((_, idx) => idx % mod === (array.length - 1) % mod)
