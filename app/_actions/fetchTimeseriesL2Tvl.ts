"use server"

import type {
  DataSeries,
  DataSeriesWithCurrent,
  DataTimestamped,
  L2TvlExportData,
} from "@/lib/types"

import { getDataSeriesWithCurrent } from "@/lib/utils/data"

type JSONData = { data: L2TvlExportData }

export type TimeseriesL2TvlData = DataSeriesWithCurrent

export const fetchTimeseriesL2Tvl = async (): Promise<
  DataTimestamped<TimeseriesL2TvlData>
> => {
  const url = "https://api.growthepie.com/v1/export/tvl.json"

  try {
    // Call internal trimmed endpoint and let Next cache the small response.
    const internalOrigin =
      process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000"
    const secret = process.env.INTERNAL_API_SECRET || ""
    if (!secret) throw new Error("Internal API secret not found")

    const internalUrl = new URL("api/growthepie-v1-export-tvl", internalOrigin)
    internalUrl.searchParams.set("secret", secret)
    const url = internalUrl.toString()

    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: ["internal:growthepie:v1:export:tvl"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const seriesMapped: DataSeries = json.data

    return getDataSeriesWithCurrent(seriesMapped, true)
  } catch (error: unknown) {
    console.error("fetchTimeseriesL2Tvl failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTimeseriesL2Tvl
