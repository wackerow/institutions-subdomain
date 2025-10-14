// TODO: FIX DATA FETCH LOGIC: Compare to https://app.rwa.xyz/
"use server"

import type {
  DataSeries,
  DataSeriesWithCurrent,
  DataTimestamped,
} from "@/lib/types"

import { getDataSeriesWithCurrent } from "@/lib/utils/data"

import { RWA_XYZ_STABLECOINS_GROUP_ID, SOURCE } from "@/lib/constants"

type JSONData = {
  results: {
    group: {
      id: number
    }
    points: [string, number][]
  }[]
}

export type TimeseriesRwaValueData = DataSeriesWithCurrent<string>

export const fetchTimeseriesRwaValue = async (): Promise<
  DataTimestamped<TimeseriesRwaValueData>
> => {
  const url = "https://api.rwa.xyz/v4/timeseries/total_rwa_value"

  const apiKey = process.env.RWA_API_KEY || ""

  if (!apiKey) {
    throw new Error(`No API key available for ${url}`)
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["rwa:v4:timeseries:total_rwa_value:rwa"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    /**
     * results[x].name:
     * - US Treasury Debt
     * - Stablecoins
     * - non-US Government Debt
     * - Corporate Bonds
     * - Stocks
     * - Private Equity
     * - Real Estate
     * - Commodities
     * - Institutional Alternative Funds
     * - Actively-Managed Strategies
     * - Private Credit
     */

    const rwaData = json.results.find(
      ({ group: { id } }) => id !== RWA_XYZ_STABLECOINS_GROUP_ID
    )

    const seriesMapped: DataSeries<string> = rwaData?.points?.length
      ? rwaData?.points.map(([dateString, mktCapValue]) => ({
          date: dateString,
          value: mktCapValue,
        }))
      : []

    return {
      ...getDataSeriesWithCurrent(seriesMapped),
      sourceInfo: SOURCE.RWA,
    }
  } catch (error: unknown) {
    console.error("fetchTimeseriesTotalRwaValue failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTimeseriesRwaValue
