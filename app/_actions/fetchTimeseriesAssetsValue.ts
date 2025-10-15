"use server"

import type {
  DataSeries,
  DataSeriesWithCurrent,
  DataTimestamped,
} from "@/lib/types"

import { getDataSeriesWithCurrent } from "@/lib/utils/data"

import { SOURCE } from "@/lib/constants"

const MEASURE_ID = {
  "Total Asset Value (Dollar)": 2,
  "Market Value (Dollar)": 40,
  "Bridged Token Market Cap (Dollar)": 70, // Used for Stablecoin series
  "Bridged Token Value (Dollar)": 71, // Used for RWA series
} as const

type MeasureID = keyof typeof MEASURE_ID

type JSONData = {
  results: {
    points: [string, number][]
  }[]
}

export type TimeseriesAssetsValueData = DataSeriesWithCurrent<string>

export const fetchTimeseriesAssetsValue = async (
  series: "stablecoins" | "real-world-assets" = "real-world-assets",
  measureId?: MeasureID
): Promise<DataTimestamped<TimeseriesAssetsValueData>> => {
  const url = new URL("https://api.rwa.xyz/v3/assets/aggregates/timeseries")

  const apiKey = process.env.RWA_API_KEY || ""

  if (!apiKey) {
    throw new Error(`No API key available for ${url.toString()}`)
  }

  const getMeasureIdValue = () => {
    if (measureId) return MEASURE_ID[measureId]
    if (series === "stablecoins")
      return MEASURE_ID["Bridged Token Market Cap (Dollar)"]
    if (series === "real-world-assets")
      return MEASURE_ID["Bridged Token Value (Dollar)"]
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
          field: "networkID",
          operator: "equals",
          value: 1, // Ethereum
        },
        {
          field: "measureID",
          operator: "equals",
          value: getMeasureIdValue(),
        },
        {
          field: "assetClassID",
          operator: series === "stablecoins" ? "equals" : "notEquals",
          value: 28, // Stablecoins (Else, real-world assets)
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
        tags: [`rwa:v3:assets:aggregates:timeseries:${series}`],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${decodeURIComponent(url.toString())}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()
    if (series === "stablecoins") {
      console.log("json.results LENGTH: ", json.results.length)
      console.log(json.results)
    }

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
    console.error("fetchTimeseriesAssetsValue failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTimeseriesAssetsValue
