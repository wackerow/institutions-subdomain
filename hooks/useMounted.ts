import { useEffect, useState } from "react"

export const useMounted = () => {
  const [isClient, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}
