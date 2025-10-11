"use server"

import type { DataTimestamped } from "@/lib/types"

type JSONData = { name: string; tvl: number }[]

export type TvlDefiEthereumCurrentData = {
  mainnetDefiTvl: number
  runnerUpMultiplier: number
}

export const fetchTvlDefiEthereumCurrent = async (): Promise<
  DataTimestamped<TvlDefiEthereumCurrentData>
> => {
  const url = "https://api.llama.fi/v2/chains"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["llama:v2:chains"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const sortedData = json.sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
    const ethereumData = sortedData.find(
      ({ name }) => name.toLowerCase() === "ethereum"
    )

    if (!ethereumData?.tvl)
      throw new Error(`Missing Ethereum or runner-up TVL data from ${url}`)

    const otherNetworkData = sortedData.filter(
      ({ name }) => name.toLowerCase() !== "ethereum"
    )

    const [networkRunnerUpData] = otherNetworkData

    const runnerUpMultiplier = ethereumData.tvl / networkRunnerUpData.tvl

    const data = {
      mainnetDefiTvl: ethereumData.tvl,
      runnerUpMultiplier,
    }

    return { data, lastUpdated: Date.now() }
  } catch (error: unknown) {
    console.error("fetchTvlDefiEthereumCurrent failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchTvlDefiEthereumCurrent
