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
      "group-has-[.css-primary-invert]/body:bg-primary group-has-[.css-primary-invert]/body:text-primary-foreground",
      className
    )}
  >
    <div className="max-w-8xl relative mx-auto grid grid-cols-1 px-10 md:h-[420px] md:grid-cols-2">
      <div className="z-10 place-self-center">
        <h1 className="max-md:text-center">{heading}</h1>
        {children}
      </div>
      {/* // TODO: Debug hero bg sizing */}
      <div className="relative inset-y-0 end-0 z-0 place-items-center max-md:grid md:absolute">
        <div
          className="bg-background group-has-[.css-primary-invert]/body:bg-primary absolute inset-0 max-md:hidden"
          style={{
            mask: "linear-gradient(to right, white 0%, transparent 40%)",
          }}
        />
        <HeroBg className="h-full max-w-full place-self-center" />
        {Shape && (
          <Shape className="group-has-[.css-primary-invert]/body:fill-primary fill-background absolute inset-0 place-self-center" />
        )}
      </div>
    </div>
    <div className="w-screen py-10">{beneath}</div>
  </div>
)

export default Hero
