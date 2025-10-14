"use server"

import type { DataTimestamped } from "@/lib/types"

type JSONData = { total1y: number }

export type DexVolumeData = {
  trailing12moAvgDexVolume: number
}

export const fetchDexVolume = async (): Promise<
  DataTimestamped<DexVolumeData>
> => {
  const url =
    "https://api.llama.fi/overview/dexs/ethereum?excludeTotalDataChartBreakdown=true"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["llama:dexs:ethereum"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const trailing12moAvgDexVolume = json.total1y / 365

    return { data: { trailing12moAvgDexVolume }, lastUpdated: Date.now() }
  } catch (error: unknown) {
    console.error("fetchDexVolume failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchDexVolume
