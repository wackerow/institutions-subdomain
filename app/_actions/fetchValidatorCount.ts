"use server"

import type { DataTimestamped } from "@/lib/types"

type JSONData = { data: { validatorscount: number } }

export type ValidatorCountData = {
  validatorCount: number
}

export const fetchValidatorCount = async (): Promise<
  DataTimestamped<ValidatorCountData>
> => {
  const url = "https://beaconcha.in/api/v1/epoch/latest"

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1 hour
        tags: ["beaconchain:v1:epoch:latest"],
      },
    })

    if (!response.ok)
      throw new Error(
        `Fetch response not OK from ${url}: ${response.status} ${response.statusText}`
      )

    const json: JSONData = await response.json()

    const { validatorscount } = json.data

    const data = { validatorCount: validatorscount }

    return { data, lastUpdated: Date.now() }
  } catch (error: unknown) {
    console.error("fetchValidatorCount failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
      url,
    })
    throw error
  }
}

export default fetchValidatorCount
