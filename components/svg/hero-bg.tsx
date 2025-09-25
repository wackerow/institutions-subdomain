const STROKE_WIDTH = 2
const STROKE_GAP = 8
const STROKE_COUNT = 42
const BOX_WIDTH = 670
const MIN_LENGTH = 270
const MAX_LENGTH = 600

const segmentHeight = STROKE_WIDTH + STROKE_GAP
const boxHeight = segmentHeight * STROKE_COUNT
const xRange = BOX_WIDTH - MIN_LENGTH

const opacityCurve = (b: number): number => {
  const pow = 1 / 2
  const k = 1 / 1.2
  const c = 0.15
  return k * b ** pow + c
}

const HeroBg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={BOX_WIDTH}
    height={boxHeight}
    viewBox={`0 0 ${BOX_WIDTH} ${boxHeight}`}
    stroke="currentColor"
    strokeWidth={STROKE_WIDTH}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {Array.from({ length: STROKE_COUNT }).map((_, idx) => {
      const x = Math.random() * xRange
      const y = (idx + 0.5) * segmentHeight
      const maxLineLength = Math.min(MAX_LENGTH, BOX_WIDTH - x)
      const length = MIN_LENGTH + Math.random() * (maxLineLength - MIN_LENGTH)
      const d = `M${x} ${y}H${length + x}`

      const opacity = opacityCurve(Math.random())

      const id = "line-index-" + idx

      return <path key={id} id={id} d={d} strokeOpacity={opacity} />
    })}
  </svg>
)
export default HeroBg
