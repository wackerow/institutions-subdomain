"use server"

import type { DataTimestamped } from "@/lib/types"

import { getRwaApiEthereumNetworksFilter } from "@/lib/utils/data"

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

export type TokenizedPrivateCreditData = {
  totalPrivateCredit: number
}

export const fetchTokenizedPrivateCredit = async (): Promise<
  DataTimestamped<TokenizedPrivateCreditData>
> => {
  const url = new URL("https://api.rwa.xyz/v3/protocols/timeseries")

  const apiKey = process.env.RWA_API_KEY || ""

  if (!apiKey) {
    throw new Error(`No API key available for ${url.toString()}`)
  }

  const myQuery = {
    filter: {
      operator: "and",
      filters: [
        {
          field: "measureSlug",
          operator: "equals",
          value: "outstanding_capital_dollar",
        },
        {
          field: "protocolSlug",
          operator: "notEquals",
          value: "ribbon-lend",
        },
        {
          field: "protocolSlug",
          operator: "notEquals",
          value: "florence-finance",
        },
        {
          field: "protocolSlug",
          operator: "notEquals",
          value: "homecoin",
        },
        {
          field: "protocolSlug",
          operator: "notEquals",
          value: "clearpool",
        },
        getRwaApiEthereumNetworksFilter(["mainnet", "layer-2"]),
      ],
    },
    aggregate: {
      groupBy: "network",
      aggregateFunction: "sum",
      interval: "day",
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
        tags: ["rwa:v3:protocols:timeseries:private-credit"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${decodeURIComponent(url.toString())}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const { results } = json

    const totalPrivateCredit = results.reduce((sum, { points }) => {
      const [, value] = points[points.length - 1]
      return sum + value
    }, 0)

    const firstResultPoints = results[0].points
    const [latestDate] = firstResultPoints[firstResultPoints.length - 1]

    return {
      data: { totalPrivateCredit },
      lastUpdated: new Date(latestDate).getTime(),
      sourceInfo: SOURCE.RWA,
    }
  } catch (error: unknown) {
    console.error("fetchTokenizedPrivateCredit failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTokenizedPrivateCredit
