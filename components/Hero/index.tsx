import type { JSX, ReactNode } from "react"

import { cn } from "@/lib/utils"

import HeroBg from "../svg/hero-bg"

type HeroProps = {
  heading: string
  children?: ReactNode
  shape?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  beneath?: ReactNode
  className?: string
}
const Hero = ({
  heading,
  beneath,
  shape: Shape,
  className,
  children,
}: HeroProps) => (
  <div
    className={cn(
      "group-has-[.css-primary-invert]/body:bg-primary group-has-[.css-primary-invert]/body:text-primary-foreground overflow-x-hidden",
      className
    )}
  >
    <div className="max-w-8xl relative mx-auto grid w-screen grid-cols-1 md:h-[420px] md:grid-cols-2">
      <div className="pointer-events-none z-10 place-self-center px-10">
        <h1 className="group-has-[.css-primary-invert]/body:from-primary/90 from-background/90 bg-radial from-35% to-transparent max-md:text-center md:to-70%">
          {heading}
        </h1>
        {children}
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
        {Shape && (
          <Shape className="group-has-[.css-primary-invert]/body:fill-primary fill-background pointer-events-none absolute inset-0 place-self-center" />
        )}
      </div>
    </div>
    <div className="w-full py-10">{beneath}</div>
  </div>
)

export default Hero
