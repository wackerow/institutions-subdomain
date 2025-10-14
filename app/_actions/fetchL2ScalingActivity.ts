"use server"

import type { DataTimestamped } from "@/lib/types"

import { SOURCE } from "@/lib/constants"

type JSONData = {
  data: {
    chart: {
      data: [
        number, // timestamp, e.g., 1760313600 (seconds, daily x 1 month, ascending)
        number, // count, e.g., 39404445
        number, // uopsCount, e.g., 43021589 (user operations per second)
      ][]
    }
  }
}

export type L2ScalingActivityData = { uops: number }

export const fetchL2ScalingActivity = async (): Promise<
  DataTimestamped<L2ScalingActivityData>
> => {
  const url = "https://l2beat.com/api/scaling/activity"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["l2beat:scaling:activity"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()
    const latestData = json.data.chart.data

    if (!latestData.length) throw new Error(`Empty data array from ${url}`)

    const [timestamp, , uopsCount] = latestData[latestData.length - 1]

    return {
      data: {
        uops: uopsCount,
      },
      lastUpdated: new Date(timestamp * 1e3).getTime() || Date.now(),
      sourceInfo: SOURCE.L2BEAT,
    }
  } catch (error: unknown) {
    console.error("fetchL2ScalingActivity failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchL2ScalingActivity
