const Layer2Data = async () => {
  const response = await fetch("https://l2beat.com/api/scaling/summary")

  if (!response.ok) return "Oops!"

  type DataStruct = {
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
  const json: DataStruct = await response.json()

  const latestCanonicalTvl = json.chart.data[json.chart.data.length - 1][2]
  const allProjectsCount = Object.keys(json.projects).length
  const stageZeroCount = Object.values(json.projects).filter(
    ({ stage }) => stage.toLowerCase() === "stage 0"
  ).length
  const stageOneCount = Object.values(json.projects).filter(
    ({ stage }) => stage.toLowerCase() === "stage 1"
  ).length
  const stageTwoCount = Object.values(json.projects).filter(
    ({ stage }) => stage.toLowerCase() === "stage 2"
  ).length

  return (
    <>
      <p>
        Total Value Locked (L2s, current):{" "}
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(latestCanonicalTvl)}
      </p>
      <p>
        Layer 2 Networks (Live—Any stage):{" "}
        {Intl.NumberFormat("en-US", {}).format(allProjectsCount)}
      </p>
      <p>
        Layer 2 Networks (Live—Stage 0):{" "}
        {Intl.NumberFormat("en-US", {}).format(stageZeroCount)}
      </p>
      <p>
        Layer 2 Networks (Live—Stage 1):{" "}
        {Intl.NumberFormat("en-US", {}).format(stageOneCount)}
      </p>
      <p>
        Layer 2 Networks (Live—Stage 2):{" "}
        {Intl.NumberFormat("en-US", {}).format(stageTwoCount)}
      </p>
    </>
  )
}

export default Layer2Data
