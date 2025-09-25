import type { JSX, ReactNode } from "react"

import { cn } from "@/lib/utils"

import HeroBg from "../svg/hero-bg"

type HeroProps = {
  heading: string
  children?: ReactNode
  shape?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  className?: string
}
const Hero = ({ heading, shape: Shape, className, children }: HeroProps) => (
  <div className={cn("bg-primary text-primary-foreground", className)}>
    <div className="max-w-8xl mx-auto grid grid-cols-1 px-10 md:grid-cols-2">
      <h1 className="place-self-center">{heading}</h1>
      <div className="relative">
        <HeroBg className="place-self-center" />
        {Shape && (
          <Shape className="fill-primary absolute inset-0 place-self-center" />
        )}
      </div>
    </div>
    {children}
  </div>
)

export default Hero
