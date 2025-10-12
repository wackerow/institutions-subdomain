"use server"

import type { DataTimestamped, NetworkResult } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"

import { RWA_ETHEREUM_NETWORK_ID } from "@/lib/constants"

type JSONData = {
  results: NetworkResult[]
}

export type StablecoinMarketshareData = {
  ethereumL1StablecoinUSD: number
  ethereumL2StablecoinUSD: number
  altNetwork2ndStablecoinUSD: number
  altNetwork3rdStablecoinUSD: number
  altNetworksRestStablecoinUSD: number
}

export const fetchStablecoinMarketshare = async (): Promise<
  DataTimestamped<StablecoinMarketshareData>
> => {
  const url = new URL("https://api.rwa.xyz/v4/networks")

  const apiKey = process.env.RWA_API_KEY || ""

  if (!apiKey) {
    throw new Error(`No API key available for ${url.toString()}`)
  }

  const query = (page: number = 1) => ({
    sort: {
      direction: "desc",
      field: "circulating_asset_value_dollar:val",
    },
    pagination: {
      page,
      perPage: 20,
    },
  })

  try {
    // Page 1 results (broken out to prevent hitting 2MB cache limit)
    url.searchParams.set("query", JSON.stringify(query(1)))
    const response1 = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["rwa:v4:networks:stablecoins:page-1"],
      },
    })

    if (!response1.ok)
      throw new Error(
        `Fetch response1 not OK from ${url}: ${response1.status} ${response1.statusText}`
      )

    const json1: JSONData = await response1.json()

    // Page 2
    url.searchParams.set("query", JSON.stringify(query(2)))
    const response2 = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["rwa:v4:networks:stablecoins:page-2"],
      },
    })

    if (!response2.ok)
      console.error(
        `Fetch response2 not OK from ${url}: ${response2.status} ${response2.statusText}`
      )

    const json2: JSONData = response2.ok
      ? await response2.json()
      : { results: [] }

    const json: JSONData = { results: [...json1.results, ...json2.results] }

    // Network separation
    const ethereumL1 = json.results.filter(
      (result) => result.network_id === RWA_ETHEREUM_NETWORK_ID
    )[0]
    const ethereumL2s = json.results.filter((r) => r.layer_description === "L2")
    const altNetworks = json.results.filter(
      (result) =>
        result.layer_description === "L1" &&
        result.network_id !== RWA_ETHEREUM_NETWORK_ID
    )

    // Stablecoins only
    const ethL1Stables = ethereumL1.asset_class_stats.filter(
      (result) => result.slug === "stablecoins"
    )[0]
    const ethL2Stables = ethereumL2s.flatMap((result) =>
      result.asset_class_stats.filter((stat) => stat.slug === "stablecoins")
    )
    const altNetworksSorted = altNetworks
      .map((network) => {
        const stablecoinStat = network.asset_class_stats.find(
          (stat) => stat.slug === "stablecoins"
        )
        return stablecoinStat
          ? {
              network,
              stablecoinValue:
                stablecoinStat.circulating_asset_value_dollar.val,
            }
          : null
      })
      .filter((item) => item !== null)
      .sort((a, b) => b!.stablecoinValue - a!.stablecoinValue)
    const [altNetwork2nd, altNetwork3rd, ...altNetworksRest] = altNetworksSorted

    // USD Values
    const ethereumL1StablecoinUSD =
      ethL1Stables.circulating_asset_value_dollar.val
    const ethereumL2StablecoinUSD = ethL2Stables.reduce(
      (sum, stat) => sum + stat.circulating_asset_value_dollar.val,
      0
    )
    const altNetwork2ndStablecoinUSD = altNetwork2nd.stablecoinValue
    const altNetwork3rdStablecoinUSD = altNetwork3rd.stablecoinValue
    const altNetworksRestStablecoinUSD = altNetworksRest.reduce(
      (sum, stat) => sum + stat.stablecoinValue,
      0
    )

    const lastUpdated = isValidDate(ethereumL1._updated_at)
      ? new Date(ethereumL1._updated_at).getTime()
      : Date.now()

    return {
      data: {
        ethereumL1StablecoinUSD,
        ethereumL2StablecoinUSD,
        altNetwork2ndStablecoinUSD,
        altNetwork3rdStablecoinUSD,
        altNetworksRestStablecoinUSD,
      },
      lastUpdated,
    }
  } catch (error: unknown) {
    console.error("fetchStablecoinMarketshare failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchStablecoinMarketshare
