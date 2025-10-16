"use server"

import type { DataTimestamped } from "@/lib/types"

import { SOURCE } from "@/lib/constants"

export type TokenizedTreasuryExamplesData = {
  BUIDL: number
  BENJI: number
  OUSG: number
}

export const fetchTokenizedTreasuryExamples = async (): Promise<
  DataTimestamped<TokenizedTreasuryExamplesData>
> => {
  // Call internal trimmed endpoint and let Next cache the small response.
  const internalOrigin =
    process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000"

  const secret = process.env.INTERNAL_API_SECRET || ""

  if (!secret) throw new Error("Internal API secret not found")

  const internalUrl = new URL(
    "/api/rwa-v3-aggregates-timeseries-treasury-examples",
    internalOrigin
  )

  internalUrl.searchParams.set("secret", secret)

  const url = internalUrl.toString()

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: ["internal:rwa:v3:aggregates:timeseries:treasury:examples"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: DataTimestamped<TokenizedTreasuryExamplesData> =
      await response.json()

    return {
      data: json.data,
      lastUpdated: new Date(json.lastUpdated).getTime(),
      sourceInfo: SOURCE.RWA,
    }
  } catch (error: unknown) {
    console.error("fetchTokenizedTreasuryExample failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTokenizedTreasuryExamples
