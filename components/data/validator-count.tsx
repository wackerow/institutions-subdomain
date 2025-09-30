const ValidatorCount = async () => {
  const response = await fetch("https://beaconcha.in/api/v1/epoch/latest")

  if (!response.ok) return "Oops!"

  const json: { data: { validatorscount: number } } = await response.json()
  const { validatorscount } = json.data

  return (
    <p>Validator count: {Intl.NumberFormat("en-US").format(validatorscount)}</p>
  )
}

export default ValidatorCount
