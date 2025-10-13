"use server"

import type { DataTimestamped } from "@/lib/types"

type JSONData = {
  metric_key: "txcosts_median_usd" | "txcount"
  origin_key: string // Network, e.g., "ethereum"
  date: string // '2025-07-30'
  value: number // USD
}[]

export type L2MedianTxCostData = {
  latestWeightedMedianTxCostUsd: number
}

export const fetchL2MedianTxCost = async (): Promise<
  DataTimestamped<L2MedianTxCostData>
> => {
  const url = "https://api.growthepie.com/v1/fundamentals_7d.json"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["l2beat:fundamentals_7d"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    // const filteredData = json.filter((item) =>
    //   ["txcosts_median_usd", "txcount"].includes(item.metric_key)
    // )

    // TODO: Confirm usage of most recent day
    const latestDate = json.reduce((latest, item) => {
      const itemDate = new Date(item.date)
      return itemDate > new Date(latest) ? item.date : latest
    }, json[0].date)

    const latestDayData = json.filter((item) => item.date === latestDate)

    const txcosts = latestDayData.filter(
      (item) => item.metric_key === "txcosts_median_usd"
    )
    const txcounts = latestDayData.filter(
      (item) => item.metric_key === "txcount"
    )

    const latestWeightedMedianTxCostUsd = (() => {
      // Map origin_key to txcost and txcount
      const txcostMap = new Map<string, number>()
      txcosts.forEach((item) => txcostMap.set(item.origin_key, item.value))

      let totalTxCount = 0
      let weightedSum = 0

      txcounts.forEach((item) => {
        const txcost = txcostMap.get(item.origin_key)
        if (typeof txcost === "number") {
          weightedSum += txcost * item.value
          totalTxCount += item.value
        }
      })

      return totalTxCount > 0 ? weightedSum / totalTxCount : 0
    })()

    return {
      data: { latestWeightedMedianTxCostUsd },
      lastUpdated: new Date(latestDate).getTime(),
    }
  } catch (error: unknown) {
    console.error("fetchL2MedianTxCost failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchL2MedianTxCost
