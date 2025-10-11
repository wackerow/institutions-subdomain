"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { motion, SpringOptions, useSpring, useTransform } from "motion/react"

import { cn } from "@/lib/utils/index"
import { getValueParts } from "@/lib/utils/number"

export type AnimatedNumberProps = {
  value: number
  className?: string
  springOptions?: SpringOptions
  as?: React.ElementType
  fractionDigits?: number
}

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
  fractionDigits = 0,
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as)

  const spring = useSpring(value, springOptions)
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })

  const display = useTransform(spring, (current) => {
    // quantize so we step in units of the fraction digit (e.g., 0.1 for 1 digit)
    const step = Math.pow(10, fractionDigits)
    const quantized = Math.round(current * step) / step
    return formatter.format(quantized)
  })

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <MotionComponent
      data-slot="animated-number"
      className={cn("tabular-nums", className)}
    >
      {display}
    </MotionComponent>
  )
}

export function AnimatedNumberInView({
  children,
  className,
  springOptions,
}: {
  children: number | string
  className?: string
  springOptions?: Partial<SpringOptions>
}) {
  const [targetValue, setTargetValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  const parts = getValueParts(children)

  useEffect(() => {
    if (isInView) setTargetValue(Number.isFinite(parts.value) ? parts.value : 0)
  }, [isInView, parts.value])

  const options = { bounce: 0, duration: 2_500, ...springOptions }
  return (
    <div className={className} ref={ref}>
      {parts.prefix}
      <AnimatedNumber
        springOptions={options}
        value={targetValue}
        fractionDigits={parts.fractionDigits}
      />
      {parts.suffix}
    </div>
  )
}
