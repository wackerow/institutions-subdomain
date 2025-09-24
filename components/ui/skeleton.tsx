import { cn } from "@/lib/utils"

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse-light bg-disabled h-4 rounded opacity-5 dark:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
