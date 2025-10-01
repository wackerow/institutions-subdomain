"use client"

import { useEffect, useState } from "react"

const HeroBg = ({
  width = 670, // pixels
  strokeWidth = 2, // pixels
  gap = 8, // pixels
  lineCount = 42, // pixels
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "height"> & {
  gap?: number
  lineCount?: number
}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const minLength = 0.4 * +width
  const maxLength = 0.9 * +width
  const xRange = +width - minLength
  const segmentHeight = +strokeWidth + gap
  const height = segmentHeight * lineCount

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {Array.from({ length: lineCount }).map((_, idx) => {
        const x = Math.random() * xRange
        const y = (idx + 0.5) * segmentHeight
        const maxLineLength = Math.min(maxLength, +width - x)
        const length = minLength + Math.random() * (maxLineLength - minLength)
        const d = `M${x} ${y}H${length + x}`

        const opacity = 0.8 * Math.random() + 0.2

        const id = "line-index-" + idx

        return <path key={id} id={id} d={d} strokeOpacity={opacity} />
      })}
    </svg>
  )
}
export default HeroBg
