import { cn } from "@/lib/utils"

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted h-4 rounded opacity-5",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
