const fetchRWAStablecoins = async () => {
  const apiKey = process.env.RWA_API_KEY || ""

  // TODO: Robust error handling
  if (!apiKey) {
    console.error("No API key available for RWA.xyz")
    return []
  }

  // const query = {}
  const url = new URL("https://api.rwa.xyz/v4/timeseries/total_rwa_value")
  // url.searchParams.set("query", JSON.stringify(query))

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    console.log("Response NOT OK from:", url.toString())
    return []
  }

  const {
    results,
  }: {
    results: {
      group: {
        id: number
        type: string
        name: string
        color: string
      }
      points: [string, number][]
    }[]
  } = await response.json()

  /**
  results[x].name:
    - US Treasury Debt
    - Stablecoins
    - non-US Government Debt
    - Corporate Bonds
    - Stocks
    - Private Equity
    - Real Estate
    - Commodities
    - Institutional Alternative Funds
    - Actively-Managed Strategies
    - Private Credit
   */
  const stablecoinData = results.find(({ group: { id } }) => id === 28) // Stablecoins: id === 28

  const dataPoints = stablecoinData?.points?.length
    ? stablecoinData?.points.map(([dateString, mktCapValue]) => ({
        date: dateString,
        stablecoins: mktCapValue,
      }))
    : []

  return dataPoints
}

export default fetchRWAStablecoins
