"use client"

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

type LineData = {
  id: string
  x: number
  y: number
  length: number
  opacity: number
  travel: number
  duration: number
  delay: number
}

type XYCoord = { x: number; y: number }

const HeroBg = ({
  width = 670, // pixels
  strokeWidth = 2, // pixels
  gap = 8, // pixels
  lineCount = 42, // count
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "height"> & {
  gap?: number
  lineCount?: number
}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const minLength = 0.4 * +width // Minimum 40% box width
  const maxLength = 0.9 * +width // Maximum 90% box width
  const xRange = +width - minLength // Range of 60% box width
  const segmentHeight = +strokeWidth + gap
  const height = segmentHeight * lineCount

  // Precompute lines so randomness remains stable across re-renders
  const [lines] = useState<LineData[]>(() =>
    Array.from({ length: lineCount }).map((_, idx) => {
      const x = Math.random() * xRange
      const y = (idx + 0.5) * segmentHeight
      const maxLineLength = Math.min(maxLength, +width - x)
      const length = minLength + Math.random() * (maxLineLength - minLength)
      const opacity = 0.8 * Math.random() + 0.2 // Ranges from 20% to 100%
      const direction = Math.random() > 0.5 ? 1 : -1
      const travel = direction * (0.2 * +width + Math.random() * 0.35 * +width)
      const duration = 14 + Math.random() * 22 // 14s – 36s
      const delay = Math.random() * 8 // up to 8s stagger
      return {
        id: `line-index-${idx}`,
        x,
        y,
        length,
        opacity,
        travel,
        duration,
        delay,
      }
    })
  )

  // Pointer interaction state
  const [pointer, setPointer] = useState<XYCoord | null>(null)
  const lastPointerRef = useRef<XYCoord | null>(null)
  const [influence, setInfluence] = useState(0) // 0..1 scale for distortion
  const rafRef = useRef<number | null>(null)

  // Start decay loop when pointer leaves
  const startDecay = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const decay = () => {
      setInfluence((prev) => {
        if (pointer) return 1 // if pointer re-enters, snap to full
        const next = prev * 0.85 - 0.01 // exponential-ish with small linear term
        return next > 0.02 ? next : 0
      })
      if (!pointer && influence > 0) {
        rafRef.current = requestAnimationFrame(decay)
      }
    }
    rafRef.current = requestAnimationFrame(decay)
  }, [pointer, influence])

  const handlePointerMove = useCallback<
    React.PointerEventHandler<SVGSVGElement>
  >((e) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    setPointer(pos)
    lastPointerRef.current = pos
    setInfluence(1)
  }, [])

  const handlePointerLeave = useCallback(() => {
    // Keep last pointer position for smooth relaxation
    setPointer(null)
    startDecay()
  }, [startDecay])

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Produce distorted path for a line.
  const generatePath = useCallback(
    (line: LineData): string => {
      const { x, y, length } = line
      if (influence === 0) return `M${x} ${y}H${x + length}`
      const p = pointer ?? lastPointerRef.current
      if (!p) return `M${x} ${y}H${x + length}`

      const dy = p.y - y
      const maxDistort = 12 // px
      const sigmaX = Math.max(40, length * 0.25)
      const sigmaY = 60
      const samples = 7
      let d = ""
      for (let i = 0; i < samples; i++) {
        const t = i / (samples - 1)
        const px = x + t * length
        const dx = px - p.x
        const ampBase =
          Math.exp(-(dx * dx) / (2 * sigmaX * sigmaX)) *
          Math.exp(-(dy * dy) / (2 * sigmaY * sigmaY))
        let amp = ampBase * maxDistort * influence
        amp = amp * (1 - Math.abs(0.5 - t) * 0.15)
        const py = y + amp
        d += (i === 0 ? "M" : "L") + px + " " + py
      }
      return d
    },
    [pointer, influence]
  )

  if (!mounted) return null

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ touchAction: "none" }}
      {...props}
    >
      {lines.map((line) => {
        const d = generatePath(line)
        const style: CSSProperties & {
          "--x-travel"?: string
        } = {
          "--x-travel": `${line.travel}px`,
          animation: `heroBgSlide ${line.duration}s linear ${line.delay}s infinite alternate`,
          willChange: "transform",
        }
        return (
          <path
            key={line.id}
            id={line.id}
            d={d}
            strokeOpacity={line.opacity}
            vectorEffect="non-scaling-stroke"
            fill="none"
            style={style}
            data-hero-bg-line
            className="motion-reduce:!animate-none"
          />
        )
      })}
    </svg>
  )
}
export default HeroBg
