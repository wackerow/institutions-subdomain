"use server"

import type { DataTimestamped } from "@/lib/types"

import { modFilter } from "@/lib/utils/data"

type JSONData = { date: number; tvl: number }[]

export type HistoricalChainTvlEthereumData = {
  date: number
  defiTvl: number
}[]

export const fetchHistoricalChainTvlEthereum = async (): Promise<
  DataTimestamped<HistoricalChainTvlEthereumData>
> => {
  const url = "https://api.llama.fi/v2/historicalChainTvl/ethereum"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["llama:v2:historicalChainTvl:ethereum"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    // TODO: Debug filterFirstAndFifteenth function
    // const trimmedData: JSONData = filterFirstAndFifteenth(json)
    const trimmedData = modFilter(json)

    const data = trimmedData.map(({ date, tvl }) => ({
      date: date * 1e3,
      defiTvl: tvl,
    }))

    return { data, lastUpdated: Date.now() }
  } catch (error: unknown) {
    console.error("fetchHistoricalChainTvlEthereum failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchHistoricalChainTvlEthereum
