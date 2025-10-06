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
  initialDrawMs?: number
  initialDrawStaggerMs?: number
  reducedMotionFadeMs?: number
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
  pauseWhileRippling = false,
  initialDrawMs = 300,
  initialDrawStaggerMs = 12,
  reducedMotionFadeMs = 250,
  ...props
}: HeroBgProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  // Trigger a one-time stroke draw animation on initial mount
  const [drawReady, setDrawReady] = useState(false)
  useEffect(() => {
    if (!mounted) return
    const id = requestAnimationFrame(() => setDrawReady(true))
    return () => cancelAnimationFrame(id)
  }, [mounted])

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
  // Keep a ref for the latest pointer to avoid rescheduling timers on movement
  const pointerRef = useRef<XYCoord | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Ripple animation state
  const ripplesRef = useRef<Ripple[]>([])
  const rafRef = useRef<number | null>(null)
  const [, setNow] = useState(0) // used to trigger re-renders during ripple animation
  // Track animation timeline start and paused timestamp to sync with CSS slide
  const animationStartRef = useRef<number>(performance.now())
  const pausedAtRef = useRef<number | null>(null)
  // Auto-hint ripple timers and last-trigger tracking
  const hintTimeoutRef = useRef<number | null>(null)
  const lastRippleAtRef = useRef<number | null>(null)

  const clearHintTimeout = useCallback(() => {
    if (hintTimeoutRef.current != null) {
      clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }
  }, [])

  const randBetween = useCallback((minMs: number, maxMs: number) => {
    return Math.floor(minMs + Math.random() * (maxMs - minMs))
  }, [])

  const isPointInsideSvg = useCallback(
    (p: XYCoord | null) =>
      !!p && p.x >= 0 && p.x <= +width && p.y >= 0 && p.y <= height,
    [width, height]
  )

  const randomPointInSvg = useCallback((): XYCoord => {
    return { x: Math.random() * +width, y: Math.random() * height }
  }, [width, height])

  // Prefers-reduced-motion handling
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduceMotion(mql.matches)
    onChange()
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }
  }, [])

  // If reduced motion toggles on, clear ripples and stop RAF
  useEffect(() => {
    if (!reduceMotion) return
    ripplesRef.current = []
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    pausedAtRef.current = null
  }, [reduceMotion])

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
        pointerRef.current = pos
      } else {
        setPointer(null)
        pointerRef.current = null
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
        pausedAtRef.current = null // resume slide timeline reference
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [rippleLifetimeMs])

  // (handlePointerDown is defined after helper declarations)

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

  // Helper to create a ripple at a specific position and reset hint timer
  const createRippleAt = useCallback(
    (x: number, y: number): boolean => {
      if (reduceMotion) return false
      const start = performance.now()
      const ripple: Ripple = {
        id: Math.floor(Math.random() * 1e9),
        x,
        y,
        start,
        amplitude: rippleAmplitude,
        wavelength: rippleWavelength,
        speed: rippleSpeed,
        decay: rippleDecay,
        spread: rippleSpread,
      }
      ripplesRef.current = [...ripplesRef.current, ripple]
      lastRippleAtRef.current = start
      if (pauseWhileRippling && ripplesRef.current.length === 1) {
        pausedAtRef.current = start
      }
      ensureAnimating()
      return true
    },
    [
      reduceMotion,
      rippleAmplitude,
      rippleWavelength,
      rippleSpeed,
      rippleDecay,
      rippleSpread,
      pauseWhileRippling,
      ensureAnimating,
    ]
  )

  // Schedule the next hint ripple with random delay (8–16s), unless reduced motion
  const scheduleNextHint = useCallback(() => {
    clearHintTimeout()
    if (reduceMotion) return
    const delay = randBetween(8000, 16000)
    hintTimeoutRef.current = window.setTimeout(() => {
      // Only hint if no ripple is currently active
      if (ripplesRef.current.length === 0 && !reduceMotion) {
        const pt = randomPointInSvg()
        createRippleAt(pt.x, pt.y)
      }
      // Schedule next hint regardless
      scheduleNextHint()
    }, delay)
  }, [
    clearHintTimeout,
    reduceMotion,
    randBetween,
    randomPointInSvg,
    createRippleAt,
  ])

  // Initial hint timer (4–8s) on mount or when reduced motion toggles off
  useEffect(() => {
    if (!mounted || reduceMotion) return
    // If user already interacted (unlikely during initial seconds), skip immediate hint and schedule normal cadence
    const initialDelay = randBetween(4000, 8000)
    clearHintTimeout()
    hintTimeoutRef.current = window.setTimeout(() => {
      if (
        ripplesRef.current.length === 0 &&
        lastRippleAtRef.current == null &&
        !reduceMotion
      ) {
        // Bias to cursor if inside bounding box; otherwise center of the SVG
        const currentPointer = pointerRef.current
        const pt = isPointInsideSvg(currentPointer)
          ? (currentPointer as XYCoord)
          : { x: +width / 2, y: height / 2 }
        createRippleAt(pt.x, pt.y)
      }
      scheduleNextHint()
    }, initialDelay)
    return clearHintTimeout
  }, [
    mounted,
    reduceMotion,
    randBetween,
    clearHintTimeout,
    scheduleNextHint,
    isPointInsideSvg,
    width,
    height,
    createRippleAt,
  ])

  // Clean up on unmount
  useEffect(() => () => clearHintTimeout(), [clearHintTimeout])

  const handlePointerDown = useCallback<
    React.PointerEventHandler<SVGSVGElement>
  >(
    (e) => {
      if (reduceMotion) return
      const svg = e.currentTarget
      const rect = svg.getBoundingClientRect()
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (createRippleAt(pos.x, pos.y)) scheduleNextHint()
    },
    [reduceMotion, createRippleAt, scheduleNextHint]
  )

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

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

  // Current horizontal offset for a line's CSS slide at a given timestamp
  const getLineOffsetX = useCallback((line: LineData, now: number) => {
    const t0 = animationStartRef.current + line.delay * 1000
    if (now <= t0) return 0
    const period = line.duration * 1000
    if (period <= 0) return 0
    const cycle = 2 * period
    const elapsed = (now - t0) % cycle
    const phase = elapsed / period // 0..2
    const f = phase <= 1 ? phase : 2 - phase // 0..1..0
    return line.travel * f
  }, [])

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
      const ripplesActive = ripples.length > 0
      // Use a frozen time for slide offset while paused, but let ripples keep animating
      const offsetNow =
        pauseWhileRippling && ripplesActive && pausedAtRef.current != null
          ? pausedAtRef.current
          : now
      const offsetX = getLineOffsetX(line, offsetNow)
      for (let i = 0; i < pxs.length; i++) {
        const px = pxs[i]
        // Compare distances in visible coordinates by adding current slide offset
        const visiblePx = px + offsetX
        const py = y + rippleOffsetAt(visiblePx, y, ripples, now)
        points.push({ x: px, y: py })
      }
      // Smooth with Catmull–Rom -> Bezier using configured tension
      return toBezierPath(points, splineTension)
    },
    [
      rippleOffsetAt,
      splineTension,
      rippleSampleCount,
      toBezierPath,
      getLineOffsetX,
      pauseWhileRippling,
    ]
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
      style={{
        touchAction: "none",
        // For reduced motion, do a simple opacity fade-in instead of dash draw
        opacity: reduceMotion ? (drawReady ? 1 : 0) : 1,
        transition: reduceMotion
          ? `opacity ${reducedMotionFadeMs}ms ease`
          : undefined,
      }}
      {...props}
    >
      {lines.map((line, idx) => {
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
            // Normalize path length so dash values use 0..1 and animate drawing from 0 to full
            pathLength={1}
            style={{
              ...style,
              // Reduced motion: no dash draw; use full stroke and fade SVG opacity instead
              ...(reduceMotion
                ? {
                    strokeDasharray: undefined,
                    strokeDashoffset: undefined,
                    transition: undefined,
                    transitionDelay: undefined,
                  }
                : {
                    // Center-out reveal: when not ready, zero-length dash centered at 0.5
                    strokeDasharray: drawReady ? "1 0" : "0 1",
                    strokeDashoffset: drawReady ? 0 : 0.5,
                    transition: `stroke-dasharray ${initialDrawMs}ms ease-out, stroke-dashoffset ${initialDrawMs}ms ease-out`,
                    transitionDelay: `${idx * initialDrawStaggerMs}ms`,
                  }),
            }}
            data-hero-bg-line
            className="motion-reduce:!animate-none"
          />
        )
      })}
    </svg>
  )
}
export default HeroBg
