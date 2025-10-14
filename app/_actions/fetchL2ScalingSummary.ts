"use server"

import type { DataTimestamped } from "@/lib/types"

import { SOURCE } from "@/lib/constants"

type JSONData = {
  chart: {
    data: [
      number, // 1756620000, timestamp (Unix seconds)
      number, // 12_527_885_542.3945, native (USD)
      number, // 21_966_306_078.2627, canonical (USD)
      number, // 21_104_738_337.5352, external (USD)
      number, // 4_214.4897, ethPrice (USD)
    ][] // Most recent last
    syncedUntil: number // timestamp (Unix seconds)
  }
  projects: Record<
    string /* network-id */,
    {
      id: string // "arbitrum"
      name: string // "Arbitrum One"
      slug: string // "arbitrum"
      type: string // "layer2"
      hostChain: string // "Ethereum"
      category: string // "Optimistic Rollup"
      providers: string[] // ["Arbitrum"]
      purposes: string[] // ["Universal"]
      isArchived: boolean // false
      isUpcoming: boolean // false
      isUnderReview: boolean // false
      badges: {
        id: string // "EVM"
        type: string // "VM"
        name: string // "EVM"
        description: string // "This project uses the Ethereum Virtual Machine to run its smart contracts and supports the Solidity programming language"
        action: {
          type: string // "scalingFilter",
          id: string // "vm",
          value: string // "EVM"
        }
      }[]
      stage: string // "Stage 1"
      risks: {
        name: string // "Data Availability"
        value: string // "Onchain"
        sentiment: string // "good"
        description: string // "All of the data needed for proof construction is published on Ethereum L1."
      }[]
      tvs: {
        breakdown: {
          total: number // 20010035000
          native: number // 3636037600
          canonical: number // 6024360400
          external: number // 10349637000
          ether: number // 4429969400
          stablecoin: number // 9685455000
          btc: number // 1123925900
          other: number // 4770684000
          associated: number // 2247438000
        }
        change7d: number // 0.0247121106830532
        associatedTokens: {
          symbol: string // "ARB"
          icon: string // "https://coin-images.coingecko.com/coins/images/16547/large/arb.jpg?1721358242"
        }[]
      }
    }
  >
}

export type L2ScalingSummaryData = {
  latestCanonicalTvl: number
  allProjectsCount: number
  allL2Slugs: string[]
}

export const fetchL2ScalingSummary = async (): Promise<
  DataTimestamped<L2ScalingSummaryData>
> => {
  const url = "https://l2beat.com/api/scaling/summary"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["l2beat:scaling:summary"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const allL2Slugs = Object.keys(json.projects).map((project) =>
      project.toLowerCase().replace(/[\s-]/g, "")
    )

    return {
      data: {
        latestCanonicalTvl: json.chart.data[json.chart.data.length - 1][2],
        allL2Slugs,
        allProjectsCount: allL2Slugs.length,
      },
      lastUpdated: Date.now(),
      sourceInfo: SOURCE.L2BEAT,
    }
  } catch (error: unknown) {
    console.error("fetchL2ScalingSummary failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchL2ScalingSummary
