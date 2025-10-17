"use server"

import type { DataSeriesWithCurrent, DataTimestamped } from "@/lib/types"

import {
  getRwaApiEthereumNetworksFilter,
  getSeriesWithCurrent,
} from "@/lib/utils/data"
import { every } from "@/lib/utils/time"

import { RWA_API_STABLECOINS_GROUP_ID, SOURCE } from "@/lib/constants"

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
    group: {
      id: number
      type: string
      name: string
    }
  }[]
}

export type TimeseriesAssetsValueData = {
  mainnet: DataSeriesWithCurrent
  layer2: DataSeriesWithCurrent
}

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
          field: "measureID",
          operator: "equals",
          value: getMeasureIdValue(),
        },
        {
          field: "assetClassID",
          operator: series === "stablecoins" ? "equals" : "notEquals",
          value: RWA_API_STABLECOINS_GROUP_ID, // Stablecoins (Else, real-world assets)
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
        revalidate: every("day"),
        tags: [`rwa:v3:assets:aggregates:timeseries:${series}`],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${decodeURIComponent(url.toString())}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const mainnetAssetData = json.results[0]
    const layer2AssetDataArray = json.results.slice(1)

    const mainnetSeriesMapped = mainnetAssetData?.points?.length
      ? mainnetAssetData?.points.map(([dateString, mktCapValue]) => ({
          date: dateString,
          value: mktCapValue,
        }))
      : []

    const layer2SeriesMapped = layer2AssetDataArray.length
      ? Object.values(
          layer2AssetDataArray.reduce<
            Record<string, { date: string; value: number }>
          >((acc, assetData) => {
            assetData.points.forEach(([dateString, mktCapValue]) => {
              if (!acc[dateString]) {
                acc[dateString] = { date: dateString, value: mktCapValue }
              } else {
                acc[dateString].value += mktCapValue
              }
            })
            return acc
          }, {})
        )
      : []

    return {
      data: {
        mainnet: getSeriesWithCurrent(mainnetSeriesMapped),
        layer2: getSeriesWithCurrent(layer2SeriesMapped),
      },
      lastUpdated: Date.now(),
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
