import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

export function InlineText({
  className,
  asChild,
  ...props
}: React.ComponentProps<"span"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      className={cn("relative inline-block pr-[1.25em]", className)}
      data-slot="inline-text"
      {...props}
    />
  )
}

export function InlineTextIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "absolute ml-[.25em] inline-flex h-[1lh] flex-none items-center [&>svg]:size-[1em]",
        className
      )}
      data-slot="inline-text-icon"
      {...props}
    />
  )
}
