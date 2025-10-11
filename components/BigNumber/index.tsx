import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { AnimatedNumberInView } from "../ui/animated-number"

type BigNumberProps = Pick<ComponentProps<"div">, "className" | "children"> & {
  value: string
}

const BigNumber = ({ value, className, children }: BigNumberProps) => (
  <div
    className={cn("flex flex-col items-center gap-2 text-center", className)}
  >
    {value && (
      <AnimatedNumberInView className="text-h3-mobile sm:text-h3 font-bold tracking-[0.055rem]">
        {value}
      </AnimatedNumberInView>
    )}
    {children && (
      <p className="text-muted-foreground mx-auto max-w-52 tracking-[0.02rem]">
        {children}
      </p>
    )}
  </div>
)

export default BigNumber
