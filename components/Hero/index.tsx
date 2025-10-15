import {
  BadgeDollarSign,
  BookOpenText,
  ChartNoAxesCombined,
  Coins,
  Handshake,
  Layers2,
  Lock,
} from "lucide-react"
import type { ReactNode } from "react"

import EthGlyph from "@/components/svg/eth-glyph"

import { cn } from "@/lib/utils"

import HeroBg from "../svg/hero-bg"

const heroShapes = {
  "badge-dollar-sign": <BadgeDollarSign />,
  "eth-glyph": <EthGlyph />,
  "chart-no-axes-combined": <ChartNoAxesCombined />,
  "layers-2": <Layers2 />,
  lock: <Lock className="[&_rect]:fill-current" />,
  handshake: <Handshake />,
  coins: <Coins />,
  "book-open-text-fill": <BookOpenText />,
} as const satisfies Record<string, ReactNode>

type HeroShape = keyof typeof heroShapes

type HeroProps = {
  heading: string
  children?: ReactNode
  shape?: HeroShape
  beneath?: ReactNode
  className?: string
}
const Hero = ({ heading, beneath, shape, className, children }: HeroProps) => (
  <div
    className={cn(
      "group-has-[.css-primary-invert]/body:bg-primary group-has-[.css-primary-invert]/body:text-primary-foreground text-primary overflow-hidden",
      className
    )}
  >
    <div className="max-w-8xl relative mx-auto grid w-screen grid-cols-1 md:h-[420px] md:grid-cols-2">
      <div
        className={cn(
          "pointer-events-none z-10 space-y-8 place-self-center px-10",
          "group-has-[.css-primary-invert]/body:from-primary/90 from-background/90 bg-radial from-75% to-transparent md:from-50% md:to-70%",
          "from-background from-85% max-md:bg-gradient-to-br"
        )}
      >
        <h1 className="leading-tight">{heading}</h1>
        {children && <div className="space-y-6 font-medium">{children}</div>}
      </div>
      <div
        className={cn(
          "relative end-0 z-0 place-items-center max-md:hidden max-md:inset-y-0 max-lg:grid md:absolute md:h-full ",
          "group-has-[.css-primary-invert]/body:text-background text-secondary-foreground"
        )}
      >
        <HeroBg
          strokeWidth={1.5}
          // calmer motion
          splineTension={0.6}          // smoother, less overshoot
          hoverStrokeGain={0.35}       // subtler hover
          hoverSigmaX={80}
          hoverSigmaY={48}
          // gentler ripple cost/shape
          rippleAmplitude={6}
          rippleSpread={10}
          rippleSampleCount={17}
          initialDrawMs={500}
          initialDrawStaggerMs={16}
          className={cn(
            "w-full max-w-full place-self-center",
            "max-[25rem]:scale-150 min-[25rem]:max-[32rem]:scale-130 min-[32rem]:max-sm:scale-120 sm:max-md:scale-110"
          )}
        />
        {shape && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 place-self-center [&_svg]:size-72",
              "group-has-[.css-primary-invert]/body:text-primary text-background"
            )}
          >
            {heroShapes[shape]}
          </div>
        )}
      </div>
    </div>
    <div className="group-has-[.css-primary-invert]/body:to-primary to-background isolate z-10 w-screen bg-gradient-to-b to-25% py-6">
      {beneath}
    </div>
  </div>
)

export default Hero
