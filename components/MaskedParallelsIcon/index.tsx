"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

type MaskedParallelsIconLine = {
  id: string
  x: number
  y: number
  length: number
  opacity: number
  travel: number
  duration: number
  delay: number
}

type MaskedParallelsIconProps = Omit<
  React.SVGProps<SVGSVGElement>,
  "height" | "width"
> & {
  boxSize?: number
  strokeWidth?: number
  gap?: number
  /**
   * optional override; if omitted it's computed to fill the square
   */
  lineCount?: number
  hoverSigmaX?: number
  hoverSigmaY?: number
  hoverStrokeGain?: number
  maskId?: string
  maskShape?: React.ReactNode
  /**
   * number of pixels outside the SVG bbox to still consider for proximity hover
   */
  pointerMargin?: number
}

const randomId = (prefix = "id") =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`

const MaskedParallelsIcon = ({
  boxSize = 128,
  strokeWidth = 1.5,
  gap = 3,
  pointerMargin = 28,
  lineCount,
  hoverSigmaX = 48,
  hoverSigmaY = 28,
  hoverStrokeGain = 1.0,
  maskId: providedMaskId,
  maskShape,
  style,
  ...props
}: MaskedParallelsIconProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const svgRef = useRef<SVGSVGElement | null>(null)
  // pointer carries optional edgeXFactor to smooth approaches from left/right
  const pointerRef = useRef<{
    x: number
    y: number
    edgeXFactor?: number
  } | null>(null)
  const [pointer, setPointer] = useState<{
    x: number
    y: number
    edgeXFactor?: number
  } | null>(null)

  const maskId = useMemo(
    () => providedMaskId ?? randomId("hero-icon-mask"),
    [providedMaskId]
  )

  // simple rect clip to ensure nothing bleeds outside the SVG bbox
  const rectClipId = useMemo(() => `${maskId}-rect-clip`, [maskId])

  // internal drawing size (fixed viewBox); actual rendered size comes from CSS
  const width = boxSize
  const height = boxSize

  const segmentHeight = +strokeWidth + gap
  const computedLineCount =
    typeof lineCount === "number"
      ? Math.max(1, Math.floor(lineCount))
      : Math.max(1, Math.floor(height / segmentHeight))

  // stable random lines per-mount
  const lines = useMemo<MaskedParallelsIconLine[]>(() => {
    const minLength = 0.6 * width
    const maxLength = 0.9 * width
    const xRange = Math.max(0, width - minLength)
    return Array.from({ length: computedLineCount }).map((_, idx) => {
      const x = Math.random() * xRange
      const y = (idx + 0.5) * segmentHeight
      const maxLineLength = Math.min(maxLength, width - x)
      const length = minLength + Math.random() * (maxLineLength - minLength)
      const opacity = 0.4 * Math.random() + 0.2 // 0.2..0.6 for icons (subtle)
      const direction = Math.random() > 0.5 ? 1 : -1
      const travel = direction * (0.08 * width + Math.random() * 0.18 * width)
      const duration = 6 + Math.random() * 8 // 6s - 14s (faster for icons)
      const delay = Math.random() * 2
      return {
        id: `hero-icon-line-${idx}`,
        x,
        y,
        length,
        opacity,
        travel,
        duration,
        delay,
      }
    })
  }, [computedLineCount, width, segmentHeight])

  // Map client coords -> svg internal coords
  const svgPointFromClient = useCallback(
    (svg: SVGSVGElement, clientX: number, clientY: number) => {
      const pt = svg.createSVGPoint()
      pt.x = clientX
      pt.y = clientY
      const ctm = svg.getScreenCTM()
      if (ctm) {
        const inv = ctm.inverse()
        const mapped = pt.matrixTransform(inv)
        return { x: mapped.x, y: mapped.y }
      }
      const rect = svg.getBoundingClientRect()
      const sx = width / rect.width
      const sy = height / rect.height
      return { x: (clientX - rect.left) * sx, y: (clientY - rect.top) * sy }
    },
    [width, height]
  )

  // Pointer handlers (local to the SVG; keeps things simple and avoids global listeners)
  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current
      if (!svg) return
      const pt = svgPointFromClient(svg, e.clientX, e.clientY)
      const p = { ...pt, edgeXFactor: 1 }
      setPointer(p)
      pointerRef.current = p
    },
    [svgPointFromClient]
  )
  const onPointerLeave = useCallback(() => {
    setPointer(null)
    pointerRef.current = null
  }, [])

  // Keep hover active when the cursor is just outside the SVG bbox.
  // This does not change layout — it only listens for pointer movement on the document,
  // maps client coords to SVG coords and updates the same pointer state.
  useEffect(() => {
    if (!svgRef.current) return
    const svg = svgRef.current
    const onDocPointer = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect()
      const margin = +pointerMargin
      // quick rejection if far away
      if (
        e.clientX < rect.left - margin ||
        e.clientX > rect.right + margin ||
        e.clientY < rect.top - margin ||
        e.clientY > rect.bottom + margin
      ) {
        // outside expanded bbox -> clear pointer
        if (pointerRef.current) {
          pointerRef.current = null
          setPointer(null)
        }
        return
      }

      // Compute an edgeXFactor (0..1) representing proximity to the nearest vertical edge.
      // When outside, map X to the nearest interior edge for SVG mapping and keep the factor
      // separate so horizontal proximity ramps smoothly.
      let edgeXFactor = 1
      let clientXForMapping = e.clientX
      if (e.clientX < rect.left) {
        const dist = rect.left - e.clientX
        edgeXFactor = Math.max(0, Math.min(1, 1 - dist / margin))
        clientXForMapping = rect.left
      } else if (e.clientX > rect.right) {
        const dist = e.clientX - rect.right
        edgeXFactor = Math.max(0, Math.min(1, 1 - dist / margin))
        clientXForMapping = rect.right
      } else {
        edgeXFactor = 1
      }

      // clamp the client Y to the expanded bbox so vertical approach ramps nicely
      const clampedClientY = Math.min(
        rect.bottom + margin,
        Math.max(rect.top - margin, e.clientY)
      )

      // map to svg coords: intentionally map X to the interior edge when outside
      const pt = svgPointFromClient(svg, clientXForMapping, clampedClientY)
      const p = { ...pt, edgeXFactor }
      pointerRef.current = p
      setPointer(p)
    }

    window.addEventListener("pointermove", onDocPointer, { passive: true })
    return () => window.removeEventListener("pointermove", onDocPointer)
  }, [svgPointFromClient, pointerMargin, mounted])

  // Key helper to build a simple horizontal path
  const buildLinePath = (l: MaskedParallelsIconLine) =>
    `M${l.x} ${l.y}H${l.x + l.length}`

  if (!mounted) return null

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      overflow="hidden"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
      aria-hidden
      focusable={false}
      {...props}
    >
      <defs>
        {/* rect clip prevents any bleed outside the SVG bbox */}
        <clipPath id={rectClipId} clipPathUnits="userSpaceOnUse">
          <rect x={2} y={2} width={width - 4} height={height - 4} />
        </clipPath>

        {maskShape ? (
          // render mask in user-space coords and force an opaque shape for the mask
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            {/* hide everything by default */}
            <rect x="0" y="0" width={width} height={height} fill="black" />

            {/* force the passed shape to render as opaque white in the mask.
                Stroke and fill become white so outlines from Lucide icons reveal a solid area.
                Increase strokeWidth here if outlines are too thin. */}
            <g
              fill="#fff"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {maskShape}
            </g>
          </mask>
        ) : null}
      </defs>

      <g
        mask={maskShape ? `url(#${maskId})` : undefined}
        clipPath={`url(#${rectClipId})`}
      >
        {lines.map((line) => {
          // hover emphasis based on pointer proximity
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
            const edgeFactor =
              typeof pointer.edgeXFactor === "number" ? pointer.edgeXFactor : 1
            hoverFactor = fx * fy * edgeFactor
          }

          const perPathStrokeWidth =
            +strokeWidth * (1 + hoverStrokeGain * hoverFactor)
          const perPathOpacity = Math.min(
            1,
            line.opacity + (1 - line.opacity) * hoverFactor
          )

          const styleObj: React.CSSProperties & { "--x-travel"?: string } = {
            "--x-travel": `${line.travel}px`,
            animation: `hero-bg-slide ${line.duration}s linear ${line.delay}s infinite alternate`,
            willChange: "transform",
          }

          return (
            <g
              key={line.id}
              style={styleObj}
              // keep transform via CSS animation, avoid inline transform so animation can use keyframes
            >
              <path
                d={buildLinePath(line)}
                strokeOpacity={perPathOpacity}
                strokeWidth={perPathStrokeWidth}
                vectorEffect="non-scaling-stroke"
                fill="none"
                pathLength={1}
                style={{ transformBox: "fill-box", transformOrigin: "0 0" }}
                aria-hidden
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export default MaskedParallelsIcon
