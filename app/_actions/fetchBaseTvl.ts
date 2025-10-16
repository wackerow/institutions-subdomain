"use server"

import type { DataTimestamped } from "@/lib/types"

import { SOURCE } from "@/lib/constants"

type JSONData = DataTimestamped<BaseTvlData> // { data: number }

export type BaseTvlData = { baseTvl: number }

export const fetchBaseTvl = async (): Promise<DataTimestamped<BaseTvlData>> => {
  // Call internal trimmed endpoint and let Next cache the small response.
  const internalOrigin =
    process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000"

  const secret = process.env.INTERNAL_API_SECRET || ""

  if (!secret) throw new Error("Internal API secret not found")

  const internalUrl = new URL(
    "/api/growthepie-v1-export-tvl-base",
    internalOrigin
  )

  internalUrl.searchParams.set("secret", secret)

  const url = internalUrl.toString()

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: ["internal:growthepie:v1:export:tvl:base-tvl"],
      },
    })

    if (!response.ok)
      return {
        data: { baseTvl: 0 },
        lastUpdated: Date.now(),
        sourceInfo: SOURCE.GROWTHEPIE,
      }
    // throw new Error(
    //   `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
    // )

    const json: JSONData = await response.json()

    return {
      data: json.data,
      lastUpdated: json.lastUpdated,
      sourceInfo: SOURCE.GROWTHEPIE,
    }
  } catch (error: unknown) {
    console.error("fetchBaseTvl failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchBaseTvl
