"use server"

import type { DataTimestamped } from "@/lib/types"

type JSONData = {
  results: {
    group: {
      id: number
      // type: string
      // name: string
      // color: string
    }
    points: [string, number][]
  }[]
}

export type TimeseriesTotalRwaValueData = {
  date: string
  stablecoins: number
}[]

export const fetchTimeseriesTotalRwaValue = async (): Promise<
  DataTimestamped<TimeseriesTotalRwaValueData>
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
        tags: ["rwa:v4:timeseries:total_rwa_value"],
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

    const stablecoinData = json.results.find(({ group: { id } }) => id === 28) // Stablecoins: id === 28

    const dataPoints = stablecoinData?.points?.length
      ? stablecoinData?.points.map(([dateString, mktCapValue]) => ({
          date: dateString,
          stablecoins: mktCapValue,
        }))
      : []

    // Take one data point per week for loading efficiency
    const data = dataPoints.filter((_, idx) => idx % 7 === 0)

    return { data, lastUpdated: Date.now() }
  } catch (error: unknown) {
    console.error("fetchTimeseriesTotalRwaValue failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTimeseriesTotalRwaValue
