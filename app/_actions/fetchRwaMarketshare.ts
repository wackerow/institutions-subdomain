"use server"

import type {
  AssetValueMetrics,
  DataTimestamped,
  NetworkResult,
} from "@/lib/types"

import { RWA_XYZ_ETHEREUM_NETWORK_ID } from "@/lib/constants"

type JSONData = {
  results: NetworkResult[]
}

export type RwaMarketshareData = {
  ethereumL1RwaUSD: number
  ethereumL2RwaUSD: number
  altNetwork2ndRwaUSD: number
  altNetwork3rdRwaUSD: number
  altNetworksRestRwaUSD: number
}

const sumRwaForNetwork = (network: NetworkResult): number => {
  return network.asset_class_stats.reduce((sum, stat) => {
    // RWA = everything except stablecoins and cryptocurrencies
    if (stat.slug !== "stablecoins" && stat.slug !== "cryptocurrencies") {
      const metric = stat.circulating_asset_value_dollar as
        | AssetValueMetrics
        | undefined
        | null
      const val = metric?.val
      // Some networks/asset classes may not have this metric populated
      return sum + (typeof val === "number" && Number.isFinite(val) ? val : 0)
    }
    return sum
  }, 0)
}

export const fetchRwaMarketshare = async (): Promise<
  DataTimestamped<RwaMarketshareData>
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

  const fetchInit = (page: number = 1) => ({
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: [`rwa:v4:networks:rwa:page-${page}`],
    },
  })

  try {
    // Page 1 results (broken out to prevent hitting 2MB cache limit)
    url.searchParams.set("query", JSON.stringify(query(1)))
    const response1 = await fetch(url.toString(), fetchInit(1))

    if (!response1.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response1.status} ${response1.statusText}`
      )

    const json1: JSONData = await response1.json()

    // Page 2
    url.searchParams.set("query", JSON.stringify(query(2)))
    const response2 = await fetch(url.toString(), fetchInit(2))

    if (!response2.ok)
      console.error(
        `Fetch response2 not OK from ${url}: ${response2.status} ${response2.statusText}`
      )

    const json2: JSONData = response2.ok
      ? await response2.json()
      : { results: [] }

    const json: JSONData = { results: [...json1.results, ...json2.results] }

    const ethereumL1 = json.results.filter(
      (result) => result.network_id === RWA_XYZ_ETHEREUM_NETWORK_ID
    )[0]
    const ethereumL2s = json.results.filter((r) => r.layer_description === "L2")
    const altNetworks = json.results.filter(
      (result) =>
        result.layer_description === "L1" &&
        result.network_id !== RWA_XYZ_ETHEREUM_NETWORK_ID
    )

    const altNetworksSorted = altNetworks
      .map((network) => ({
        network,
        rwaValue: sumRwaForNetwork(network),
      }))
      .sort((a, b) => b.rwaValue - a.rwaValue)

    const [altNetwork2nd, altNetwork3rd, ...altNetworksRest] = altNetworksSorted

    const ethereumL1RwaUSD = sumRwaForNetwork(ethereumL1)
    const ethereumL2RwaUSD = ethereumL2s.reduce(
      (sum, n) => sum + sumRwaForNetwork(n),
      0
    )
    const altNetwork2ndRwaUSD = altNetwork2nd?.rwaValue ?? 0
    const altNetwork3rdRwaUSD = altNetwork3rd?.rwaValue ?? 0
    const altNetworksRestRwaUSD = altNetworksRest.reduce(
      (sum, stat) => sum + stat.rwaValue,
      0
    )

    const lastUpdated = new Date(ethereumL1._updated_at).getTime()

    const data: RwaMarketshareData = {
      ethereumL1RwaUSD,
      ethereumL2RwaUSD,
      altNetwork2ndRwaUSD,
      altNetwork3rdRwaUSD,
      altNetworksRestRwaUSD,
    }

    return { data, lastUpdated }
  } catch (error: unknown) {
    console.error("fetchRwaMarketshare failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchRwaMarketshare
