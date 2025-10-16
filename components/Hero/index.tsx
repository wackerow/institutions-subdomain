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
    <div className="max-w-8xl relative mx-auto grid w-screen grid-cols-1 md:h-[520px] md:grid-cols-2">
      <div
        className={cn(
          "pointer-events-none z-10 space-y-8 place-self-center px-10",
          "group-has-[.css-primary-invert]/body:before:bg-primary/95 before:bg-background/95 relative before:absolute before:inset-0 before:-z-10 before:scale-x-120 before:blur-2xl max-sm:before:rounded-b-[50%] md:before:rounded-r-[25%]"
        )}
      >
        <h1 className="leading-tight">{heading}</h1>
        {children && <div className="space-y-6 font-medium">{children}</div>}
      </div>
      <div
        className={cn(
          // container for graphic; full height on desktop, natural flow on mobile
          "grid place-items-center",
          "relative z-0 max-md:inset-y-0 max-md:grid md:h-full",
          "group-has-[.css-primary-invert]/body:text-background text-secondary-foreground"
        )}
      >
        <div className="relative my-4 h-[14rem] w-full sm:h-[16rem] md:h-full">
          <HeroBg className="absolute inset-0 h-full w-full" />
          {shape && (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 grid place-items-center",
                "[&_svg]:h-2/3 [&_svg]:w-auto",
                "group-has-[.css-primary-invert]/body:text-primary text-background"
              )}
            >
              {heroShapes[shape]}
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="group-has-[.css-primary-invert]/body:to-primary to-background isolate z-10 w-screen bg-gradient-to-b to-25% py-6">
      {beneath}
    </div>
  </div>
)

export default Hero
