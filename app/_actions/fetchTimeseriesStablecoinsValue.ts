"use server"

import type {
  DataSeries,
  DataSeriesWithCurrent,
  DataTimestamped,
} from "@/lib/types"

import { getDataSeriesWithCurrent } from "@/lib/utils/data"

type JSONData = {
  results: {
    group: {
      name: string
    }
    points: [string, number][]
  }[]
}

export type TimeseriesStablecoinsValueData = DataSeriesWithCurrent<string>

export const fetchTimeseriesStablecoinsValue = async (): Promise<
  DataTimestamped<TimeseriesStablecoinsValueData>
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
          value: 70,
        },
        {
          field: "assetClassID",
          operator: "equals",
          value: 28,
        },
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
        tags: ["rwa:v3:assets:aggregates:timeseries"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url.toString()}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const ethereumStablecoinData = json.results.find(
      ({ group: { name } }) => name.toLowerCase() === "ethereum" // && id === RWA_XYZ_STABLECOINS_GROUP_ID
    )

    const seriesMapped: DataSeries<string> = ethereumStablecoinData?.points
      ?.length
      ? ethereumStablecoinData?.points.map(([dateString, mktCapValue]) => ({
          date: dateString,
          value: mktCapValue,
        }))
      : []

    return getDataSeriesWithCurrent(seriesMapped)
  } catch (error: unknown) {
    console.error("fetchTimeseriesTotalRwaValue failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTimeseriesStablecoinsValue
