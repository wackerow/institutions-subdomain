const DeFiTotalValueLocked = async () => {
  const response = await fetch("https://api.llama.fi/v2/chains")

  if (!response.ok) return "Oops!"

  const json: { name: string; tvl: number }[] = await response.json()
  const data = json.sort((a, b) => (b.tvl || 0) - (a.tvl || 0))

  const ethereumData = data.find(
    ({ name }) => name.toLowerCase() === "ethereum"
  )

  const runnerUpData = data.find(
    ({ name }) => name.toLowerCase() !== "ethereum"
  )

  if (!ethereumData?.tvl || !runnerUpData?.tvl) return "Oops!"

  const multiplier = ethereumData?.tvl / runnerUpData.tvl
  return (
    <>
      <p>
        Ethereum Total Value Locked (DeFi):{" "}
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(ethereumData.tvl)}
      </p>
      <p>
        DeFi TVL Multiplier:{" "}
        {Intl.NumberFormat("en-US", {
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 2,
        }).format(multiplier)}
        x
      </p>
    </>
  )
}

export default DeFiTotalValueLocked
