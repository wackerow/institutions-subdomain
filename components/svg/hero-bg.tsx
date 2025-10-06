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

type Ripple = {
  id: number
  x: number
  y: number
  start: number // ms timestamp from performance.now()
  amplitude: number // px
  wavelength: number // px between crests
  speed: number // px/sec radial propagation speed
  decay: number // per-second amplitude decay
  spread: number // px thickness of the wavefront ring
}

type HeroBgProps = Omit<React.SVGProps<SVGSVGElement>, "height"> & {
  gap?: number
  lineCount?: number
  hoverSigmaX?: number
  hoverSigmaY?: number
  hoverStrokeGain?: number
  pointerMargin?: number
  rippleAmplitude?: number
  rippleWavelength?: number
  rippleSpeed?: number
  rippleDecay?: number
  rippleSpread?: number
  rippleLifetimeMs?: number
  rippleSampleCount?: number
  splineTension?: number
  pauseWhileRippling?: boolean
}

const HeroBg = ({
  // Layout
  width = 670,
  strokeWidth = 2,
  gap = 8,
  lineCount = 42,
  // Hover emphasis
  hoverSigmaX = 80,
  hoverSigmaY = 48,
  hoverStrokeGain = 1.1,
  // Pointer tracking margin (keeps hover alive just outside bbox)
  pointerMargin = 120,
  // Ripple behavior
  rippleAmplitude = 12,
  rippleWavelength = 80,
  rippleSpeed = 240,
  rippleDecay = 1.0,
  rippleSpread = 18,
  rippleLifetimeMs = 6000,
  rippleSampleCount = 21,
  splineTension = 1,
  pauseWhileRippling = true,
  ...props
}: HeroBgProps) => {
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

  // Pointer hover state (for opacity/weight emphasis only)
  const [pointer, setPointer] = useState<XYCoord | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Ripple animation state
  const ripplesRef = useRef<Ripple[]>([])
  const rafRef = useRef<number | null>(null)
  const [, setNow] = useState(0) // used to trigger re-renders during ripple animation

  // Track pointer globally so hover effect persists slightly outside the SVG bbox
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      const margin = pointerMargin
      if (
        pos.x >= -margin &&
        pos.x <= rect.width + margin &&
        pos.y >= -margin &&
        pos.y <= rect.height + margin
      ) {
        setPointer(pos)
      } else {
        setPointer(null)
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [pointerMargin])

  // Start/stop the ripple RAF loop depending on active ripples
  const ensureAnimating = useCallback(() => {
    if (rafRef.current != null) return
    const tick = () => {
      const now = performance.now()
      // Drop old ripples after configured lifetime
      ripplesRef.current = ripplesRef.current.filter(
        (r) => now - r.start < rippleLifetimeMs
      )
      setNow(now) // trigger re-render for path regeneration
      if (ripplesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [rippleLifetimeMs])

  const handlePointerDown = useCallback<
    React.PointerEventHandler<SVGSVGElement>
  >(
    (e) => {
      const svg = e.currentTarget
      const rect = svg.getBoundingClientRect()
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }

      // Create a new ripple centered at the click/tap
      const ripple: Ripple = {
        id: Math.floor(Math.random() * 1e9),
        x: pos.x,
        y: pos.y,
        start: performance.now(),
        amplitude: rippleAmplitude,
        wavelength: rippleWavelength,
        speed: rippleSpeed,
        decay: rippleDecay,
        spread: rippleSpread,
      }
      ripplesRef.current = [...ripplesRef.current, ripple]
      ensureAnimating()
    },
    [
      ensureAnimating,
      rippleAmplitude,
      rippleWavelength,
      rippleSpeed,
      rippleDecay,
      rippleSpread,
    ]
  )

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Compute ripple vertical offset at a given x,y position
  const rippleOffsetAt = useCallback(
    (px: number, y: number, ripples: Ripple[], now: number) => {
      let offset = 0
      for (const r of ripples) {
        const dt = (now - r.start) / 1000
        if (dt < 0) continue
        const dx = px - r.x
        const dy = y - r.y
        const dist = Math.hypot(dx, dy)
        const phase = dist - r.speed * dt // 0 along the ring center
        const envelope = Math.exp(-(phase * phase) / (2 * r.spread * r.spread))
        const osc = Math.cos((2 * Math.PI * phase) / r.wavelength)
        const decay = Math.exp(-r.decay * dt)
        offset += r.amplitude * envelope * osc * decay
      }
      return offset
    },
    []
  )

  // Convert polyline points to a smooth Catmull–Rom Bezier path
  const toBezierPath = useCallback(
    (pts: { x: number; y: number }[], t: number) => {
      if (pts.length === 0) return ""
      if (pts.length === 1) return `M${pts[0].x} ${pts[0].y}`
      let path = `M${pts[0].x} ${pts[0].y}`
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i]
        const p1 = pts[i]
        const p2 = pts[i + 1]
        const p3 = pts[i + 2] ?? pts[i + 1]
        const cp1x = p1.x + ((p2.x - p0.x) / 6) * t
        const cp1y = p1.y + ((p2.y - p0.y) / 6) * t
        const cp2x = p2.x - ((p3.x - p1.x) / 6) * t
        const cp2y = p2.y - ((p3.y - p1.y) / 6) * t
        path += ` C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
      }
      return path
    },
    []
  )

  // Produce distorted path for a line (hover thickness/opacity applied elsewhere)
  const generatePath = useCallback(
    (line: LineData): string => {
      const { x, y, length } = line
      const ripples = ripplesRef.current
      if (ripples.length === 0) {
        return `M${x} ${y}H${x + length}`
      }

      // Combine contributions from all ripples to get vertical offset
      // Build sampling set: uniform samples plus, for each ripple, include a sample at the ripple's x if within the line bounds to anchor the wave onset exactly where clicked.
      const uniformSamples = rippleSampleCount
      const positions: number[] = []
      for (let i = 0; i < uniformSamples; i++) {
        const t = i / (uniformSamples - 1)
        positions.push(x + t * length)
      }
      for (const r of ripples) {
        if (r.x >= x && r.x <= x + length) positions.push(r.x)
      }
      // sort and dedupe
      positions.sort((a, b) => a - b)
      const pxs: number[] = []
      for (let i = 0; i < positions.length; i++) {
        if (i === 0 || Math.abs(positions[i] - positions[i - 1]) > 0.5) {
          pxs.push(positions[i])
        }
      }

      const points: { x: number; y: number }[] = []
      const now = performance.now()
      for (let i = 0; i < pxs.length; i++) {
        const px = pxs[i]
        const py = y + rippleOffsetAt(px, y, ripples, now)
        points.push({ x: px, y: py })
      }
      // Smooth with Catmull–Rom -> Bezier using configured tension
      return toBezierPath(points, splineTension)
    },
    [rippleOffsetAt, splineTension, rippleSampleCount, toBezierPath]
  )

  if (!mounted) return null

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      onPointerDown={handlePointerDown}
      style={{ touchAction: "none" }}
      {...props}
    >
      {lines.map((line) => {
        const d = generatePath(line)
        const ripplesActive = ripplesRef.current.length > 0
        // Hover emphasis: adjust stroke width and opacity based on proximity to pointer
        let hoverFactor = 0
        if (pointer) {
          const { x, y, length } = line
          const dx =
            pointer.x < x
              ? x - pointer.x
              : pointer.x > x + length
                ? pointer.x - (x + length)
                : 0
          const dy = Math.abs(pointer.y - y)
          const fx = Math.exp(-(dx * dx) / (2 * hoverSigmaX * hoverSigmaX))
          const fy = Math.exp(-(dy * dy) / (2 * hoverSigmaY * hoverSigmaY))
          hoverFactor = fx * fy // 0..1
        }

        const baseStroke = +strokeWidth
        const perPathStrokeWidth =
          baseStroke * (1 + hoverStrokeGain * hoverFactor)
        const perPathOpacity = Math.min(
          1,
          line.opacity + (1 - line.opacity) * hoverFactor
        )
        const style: CSSProperties & { "--x-travel"?: string } = {
          "--x-travel": `${line.travel}px`,
          animation: `heroBgSlide ${line.duration}s linear ${line.delay}s infinite alternate`,
          animationPlayState:
            ripplesActive && pauseWhileRippling ? "paused" : "running",
          willChange: "transform",
        }
        return (
          <path
            key={line.id}
            id={line.id}
            d={d}
            strokeOpacity={perPathOpacity}
            strokeWidth={perPathStrokeWidth}
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
