"use client"

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion, Transition, useMotionValue } from "motion/react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils/index"

import ArrowLeftSharp from "../svg/arrow-left-sharp"
import ArrowRightSharp from "../svg/arrow-right-sharp"

export type CarouselContextType = {
  index: number
  setIndex: (newIndex: number) => void
  itemsCount: number
  setItemsCount: (newItemsCount: number) => void
  disableDrag: boolean
}

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
)

function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within an CarouselProvider")
  }
  return context
}

export type CarouselProviderProps = {
  children: ReactNode
  initialIndex?: number
  onIndexChange?: (newIndex: number) => void
  disableDrag?: boolean
}

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}: CarouselProviderProps) {
  const [index, setIndex] = useState<number>(initialIndex)
  const [itemsCount, setItemsCount] = useState<number>(0)

  const handleSetIndex = (newIndex: number) => {
    setIndex(newIndex)
    onIndexChange?.(newIndex)
  }

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  return (
    <CarouselContext.Provider
      value={{
        index,
        setIndex: handleSetIndex,
        itemsCount,
        setItemsCount,
        disableDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  )
}

export type CarouselProps = {
  children: ReactNode
  className?: string
  initialIndex?: number
  index?: number
  onIndexChange?: (newIndex: number) => void
  disableDrag?: boolean
}

function Carousel({
  children,
  className,
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
  disableDrag = false,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState<number>(initialIndex)
  const isControlled = externalIndex !== undefined
  const currentIndex = isControlled ? externalIndex : internalIndex

  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalIndex(newIndex)
    }
    onIndexChange?.(newIndex)
  }

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={handleIndexChange}
      disableDrag={disableDrag}
    >
      <div className={cn("group/hover relative", className)}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </CarouselProvider>
  )
}

export type CarouselNavigationProps = {
  className?: string
  classNameButton?: string
  alwaysShow?: boolean
}

function CarouselNavigation({
  className,
  classNameButton,
  alwaysShow,
}: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = useCarousel()

  const classes = cn(
    "pointer-events-auto size-fit transition-[opacity,colors] duration-300",
    !alwaysShow && "opacity-0 group-hover/hover:opacity-100",
    alwaysShow
      ? "disabled:*:text-muted"
      : "group-hover/hover:disabled:*:text-muted",
    classNameButton
  )
  return (
    <div
      className={cn(
        "pointer-events-none mt-10 flex w-fit gap-x-4 max-sm:justify-center sm:mt-14",
        className
      )}
    >
      <button
        type="button"
        aria-label="Previous slide"
        className={classes}
        disabled={index === 0}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1)
          }
        }}
      >
        <ArrowLeftSharp className="text-secondary-foreground" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className={classes}
        disabled={index + 1 === itemsCount}
        onClick={() => {
          if (index < itemsCount - 1) {
            setIndex(index + 1)
          }
        }}
      >
        <ArrowRightSharp className="text-secondary-foreground" />
      </button>
    </div>
  )
}

export type CarouselIndicatorProps = {
  className?: string
  classNameButton?: string
}

function CarouselIndicator({
  className,
  classNameButton,
}: CarouselIndicatorProps) {
  const { index, itemsCount, setIndex } = useCarousel()

  return (
    <div className={cn("mt-14 w-fit", className)}>
      <div className="flex space-x-1.5">
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "size-[9px] shrink-0 rounded-full transition-opacity duration-300",
              index === i ? "bg-secondary-foreground" : "bg-muted",
              classNameButton
            )}
          />
        ))}
      </div>
    </div>
  )
}

export type CarouselContentProps = {
  children: ReactNode
  className?: string
  transition?: Transition
}

function CarouselContent({
  children,
  className,
  transition,
}: CarouselContentProps) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel()
  const [visibleItemsCount, setVisibleItemsCount] = useState(1)
  const dragX = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsLength = Children.count(children)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const options = {
      root: containerRef.current,
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      const visibleCount = entries.filter(
        (entry) => entry.isIntersecting
      ).length
      setVisibleItemsCount(visibleCount)
    }, options)

    const childNodes = containerRef.current.children
    Array.from(childNodes).forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [children, setItemsCount])

  useEffect(() => {
    if (!itemsLength) {
      return
    }

    setItemsCount(itemsLength)
  }, [itemsLength, setItemsCount])

  const onDragEnd = () => {
    const x = dragX.get()

    if (x <= -10 && index < itemsLength - 1) {
      setIndex(index + 1)
    } else if (x >= 10 && index > 0) {
      setIndex(index - 1)
    }
  }

  return (
    <motion.div
      drag={disableDrag ? false : "x"}
      dragConstraints={
        disableDrag
          ? undefined
          : {
              left: 0,
              right: 0,
            }
      }
      dragMomentum={disableDrag ? undefined : false}
      style={{
        x: disableDrag ? undefined : dragX,
      }}
      animate={{
        translateX: `-${index * (100 / visibleItemsCount)}%`,
      }}
      onDragEnd={disableDrag ? undefined : onDragEnd}
      transition={
        transition || {
          damping: 18,
          stiffness: 90,
          type: "spring",
          duration: 0.2,
        }
      }
      className={cn(
        "flex w-full items-center",
        !disableDrag && "cursor-grab active:cursor-grabbing",
        className
      )}
      ref={containerRef}
    >
      {children}
    </motion.div>
  )
}

export type CarouselItemProps = {
  children: ReactNode
  className?: string
}

function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <motion.div
      className={cn(
        "w-full min-w-0 shrink-0 grow-0 overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

function CarouselFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-8 flex items-center justify-between [&>div]:!mt-0",
        className
      )}
      {...props}
    />
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselFooter,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
  useCarousel,
}
