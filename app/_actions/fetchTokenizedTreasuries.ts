"use server"

import type { DataTimestamped } from "@/lib/types"

import { dateNDaysAgo, getRwaApiEthereumNetworksFilter } from "@/lib/utils/data"

import { SOURCE } from "@/lib/constants"

type JSONData = {
  results: {
    points: [string, number][]
    group: {
      id: number
      type: string
      name: string
    }
  }[]
}

export type TokenizedTreasuriesData = {
  totalTreasuries: number
}

export const fetchTokenizedTreasuries = async (): Promise<
  DataTimestamped<TokenizedTreasuriesData>
> => {
  const url = new URL("https://api.rwa.xyz/v3/assets/aggregates/timeseries")

  const apiKey = process.env.RWA_API_KEY || ""

  if (!apiKey) {
    throw new Error(`No API key available for ${url.toString()}`)
  }

  const myQuery = {
    aggregate: {
      groupBy: "network",
      aggregateFunction: "sum",
      interval: "day",
    },
    filter: {
      operator: "and",
      filters: [
        {
          field: "assetClassID",
          operator: "equals",
          value: 27,
        },
        {
          field: "date",
          operator: "onOrAfter",
          value: dateNDaysAgo(),
        },
        {
          field: "isInvestable",
          operator: "equals",
          value: true,
        },
        {
          field: "measureID",
          operator: "equals",
          value: 71,
        },
        getRwaApiEthereumNetworksFilter(["mainnet", "layer-2"]),
      ],
    },
    sort: {
      direction: "asc",
      field: "date",
    },
    pagination: {
      page: 1,
      perPage: 25,
    },
  }

  url.searchParams.set("query", JSON.stringify(myQuery))

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["rwa:v3:assets:aggregates:timeseries"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${decodeURIComponent(url.toString())}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const { results } = json

    const totalTreasuries = results.reduce((sum, { points }) => {
      const [, value] = points[points.length - 1]
      return sum + value
    }, 0)

    const firstResultPoints = results[0].points
    const [latestDate] = firstResultPoints[firstResultPoints.length - 1]

    return {
      data: { totalTreasuries: totalTreasuries },
      lastUpdated: new Date(latestDate).getTime(),
      sourceInfo: SOURCE.RWA,
    }
  } catch (error: unknown) {
    console.error("fetchTokenizedTreasuries failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTokenizedTreasuries
