"use server"

import type {
  DataSeries,
  DataSeriesWithCurrent,
  DataTimestamped,
} from "@/lib/types"

import {
  getDataSeriesWithCurrent,
  getRwaApiEthereumNetworksFilter,
} from "@/lib/utils/data"

import { SOURCE } from "@/lib/constants"

type JSONData = {
  results: {
    points: [string, number][]
  }[]
}

export type SecuritizeAumData = DataSeriesWithCurrent<string>

export const fetchSecuritizeAum = async (): Promise<
  DataTimestamped<SecuritizeAumData>
> => {
  const url = new URL("https://api.rwa.xyz/v3/assets/aggregates/timeseries")

  const apiKey = process.env.RWA_API_KEY || ""

  if (!apiKey) {
    throw new Error(`No API key available for ${url.toString()}`)
  }

  const myQuery = {
    sort: {
      direction: "asc",
      field: "date",
    },
    pagination: {
      page: 1,
      perPage: 25,
    },
    aggregate: {
      groupBy: "network",
      aggregateFunction: "sum",
      interval: "day",
    },
    filter: {
      operator: "and",
      filters: [
        {
          field: "measureID",
          operator: "equals",
          value: 71,
        },
        {
          field: "protcolID",
          operator: "equals",
          value: 10,
        },
        getRwaApiEthereumNetworksFilter(["mainnet", "layer-2"]),
      ],
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
        tags: ["rwa:v3:assets:aggregates:timeseries:securitize"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${decodeURIComponent(url.toString())}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const ethereumStablecoinData = json.results[0]

    const seriesMapped: DataSeries<string> = ethereumStablecoinData?.points
      ?.length
      ? ethereumStablecoinData?.points.map(([dateString, mktCapValue]) => ({
          date: dateString,
          value: mktCapValue,
        }))
      : []

    return {
      ...getDataSeriesWithCurrent(seriesMapped),
      sourceInfo: SOURCE.RWA,
    }
  } catch (error: unknown) {
    console.error("fetchSecuritizeAum failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchSecuritizeAum
