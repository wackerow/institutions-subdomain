"use server"

import type { DataTimestamped } from "@/lib/types"

import { SOURCE } from "@/lib/constants"

export type TokenizedPrivateCreditExamplesData = {
  centrifuge: number
  maple: number
  truefi: number
}

export const fetchTokenizedPrivateCreditExamples = async (): Promise<
  DataTimestamped<TokenizedPrivateCreditExamplesData>
> => {
  // Call internal trimmed endpoint and let Next cache the small response.
  const internalOrigin =
    process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000"

  const secret = process.env.INTERNAL_API_SECRET || ""

  if (!secret) throw new Error("Internal API secret not found")

  const internalUrl = new URL(
    "/api/rwa-v3-aggregates-timeseries-private-credit-examples",
    internalOrigin
  )

  internalUrl.searchParams.set("secret", secret)

  const url = internalUrl.toString()

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60 * 24, // 1 day
        tags: [
          "internal:rwa:internal/protocols/timeseries:private-credit:examples",
        ],
      },
    })

    if (!response.ok)
      return {
        data: {
          centrifuge: 0,
          maple: 0,
          truefi: 0,
        },
        lastUpdated: Date.now(),
        sourceInfo: SOURCE.RWA,
      }

    // throw new Error(
    //   `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
    // )

    const json: DataTimestamped<TokenizedPrivateCreditExamplesData> =
      await response.json()

    return {
      data: json.data,
      lastUpdated: new Date(json.lastUpdated).getTime(),
      sourceInfo: SOURCE.RWA,
    }
  } catch (error: unknown) {
    console.error("fetchTokenizedPrivateCreditExamples failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTokenizedPrivateCreditExamples
