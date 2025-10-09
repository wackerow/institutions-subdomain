import {
  BadgeDollarSign,
  ChartNoAxesCombined,
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
      "group-has-[.css-primary-invert]/body:bg-primary group-has-[.css-primary-invert]/body:text-primary-foreground text-primary overflow-x-hidden",
      className
    )}
  >
    <div className="max-w-8xl relative mx-auto grid w-screen grid-cols-1 md:h-[420px] md:grid-cols-2">
      <div
        className={cn(
          "pointer-events-none z-10 space-y-8 place-self-center px-10",
          "group-has-[.css-primary-invert]/body:from-primary/90 from-background/90 bg-radial from-50% to-transparent md:to-70%"
        )}
      >
        <h1 className="leading-tight max-md:text-center">{heading}</h1>
        {children && <div className="space-y-6 font-medium">{children}</div>}
      </div>
      <div
        className={cn(
          "relative inset-y-0 end-0 z-0 min-h-screen place-items-center max-md:grid md:absolute md:min-h-0",
          "max-[25rem]:-my-32 min-[25rem]:max-[32rem]:-my-24 min-[32rem]:max-sm:-my-20 sm:max-md:-my-12"
        )}
      >
        <HeroBg
          className={cn(
            "w-full max-w-full place-self-center",
            "max-[25rem]:scale-y-150 min-[25rem]:max-[32rem]:scale-y-130 min-[32rem]:max-sm:scale-y-120 sm:max-md:scale-y-110"
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
    <div className="w-full py-10">{beneath}</div>
  </div>
)

export default Hero
