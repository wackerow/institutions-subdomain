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
  <div className={cn("bg-primary text-primary-foreground", className)}>
    <div className="max-w-8xl mx-auto grid grid-cols-1 px-10 md:grid-cols-2">
      <div className="place-self-center">
        <h1 className="max-md:text-center">{heading}</h1>
        {children}
      </div>
      <div className="relative h-[420px]">
        {/* // TODO: Debug hero bg sizing */}
        <HeroBg className="max-w-full place-self-center" />
        {Shape && (
          <Shape className="fill-primary absolute inset-0 place-self-center" />
        )}
      </div>
    </div>
    <div className="w-screen py-10">{beneath && beneath}</div>
  </div>
)

export default Hero
