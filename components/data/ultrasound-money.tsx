// https://ultrasound.money/api/fees/total-value-secured

const UltrasoundMoney = async () => {
  const response = await fetch(
    "https://ultrasound.money/api/fees/total-value-secured"
  )

  if (!response.ok) return "Oops!"

  const json: { sum: number; securityRatio: number } = await response.json()
  const { sum, securityRatio } = json

  return (
    <>
      <p>
        Total Value Secured:{" "}
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(sum)}
      </p>
      <p>
        Total Value Locked (L2s, current):{" "}
        {Intl.NumberFormat("en-US", {
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 2,
        }).format(securityRatio)}
        x
      </p>
    </>
  )
}

export default UltrasoundMoney
