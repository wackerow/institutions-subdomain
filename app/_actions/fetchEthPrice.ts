"use server"

import type { DataTimestamped } from "@/lib/types"

import { SOURCE } from "@/lib/constants"

type JSONData = { ethereum: { usd: number } }

export type EthPriceData = { usd: number }

export const fetchEthPrice = async (): Promise<
  DataTimestamped<EthPriceData>
> => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["coingecko:v3:simple:price"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    return {
      data: json.ethereum,
      lastUpdated: Date.now(),
      sourceInfo: SOURCE.COINGECKO,
    }
  } catch (error: unknown) {
    console.error("fetchEthPrice failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchEthPrice
