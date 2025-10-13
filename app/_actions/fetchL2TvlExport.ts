"use server"

import type { DataTimestamped, L2TvlExportData } from "@/lib/types"

type JSONData = { data: L2TvlExportData }

export const fetchL2TvlExport = async (): Promise<
  DataTimestamped<L2TvlExportData>
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

    const { data }: JSONData = await response.json()

    return { data, lastUpdated: Date.now() }
  } catch (error: unknown) {
    console.error("fetchL2TvlExport failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchL2TvlExport
