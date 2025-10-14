import type { ComponentProps } from "react"

import { MetricWithSource } from "@/lib/types"

import { cn } from "@/lib/utils"

import { SourceInfoTooltip } from "../InfoTooltip"
import { AnimatedNumberInView } from "../ui/animated-number"
import { InlineText } from "../ui/inline-text"

type BigNumberProps = Pick<ComponentProps<"div">, "className" | "children"> &
  Omit<MetricWithSource, "label">

const BigNumber = ({
  value,
  className,
  children,
  ...sourceInfo
}: BigNumberProps) => (
  <div
    className={cn(
      "flex flex-col items-center gap-2 text-center xl:w-xs",
      className
    )}
  >
    {value && (
      <AnimatedNumberInView className="text-big-mobile sm:text-big font-bold tracking-[0.055rem]">
        {value}
      </AnimatedNumberInView>
    )}
    {children && (
      <InlineText className="text-muted-foreground mx-auto max-w-52 font-medium tracking-[0.02rem]">
        {children}
        {(sourceInfo.source || sourceInfo.lastUpdated) && (
          <SourceInfoTooltip {...sourceInfo} />
        )}
      </InlineText>
    )}
  </div>
)

export default BigNumber
