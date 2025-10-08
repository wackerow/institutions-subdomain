import * as React from "react"
import Image, { type ImageProps } from "next/image"
import Link, { LinkProps } from "next/link"
import { Slot } from "@radix-ui/react-slot"

import { isValidDate } from "@/lib/utils/date"
import { cn } from "@/lib/utils/index"

function LibraryCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("group space-y-4", className)}
      {...props}
    />
  )
}

function LibraryCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("h-52 overflow-hidden", className)}
      {...props}
    />
  )
}

function LibraryCardImage({ className, alt, ...props }: ImageProps) {
  return (
    <Image
      data-slot="card-image"
      alt={alt || ""}
      className={cn(
        "size-full object-cover transition-transform group-has-[a:hover]:scale-105 group-has-[a:hover]:transition-transform",
        className
      )}
      placeholder="blur"
      sizes="(max-width: 640px) 100vw, (max-width: 1400px) 44vw, 608px"
      {...props}
    />
  )
}

const LibraryCardTitle = React.forwardRef<
  React.ComponentRef<"h3">,
  React.ComponentProps<"header"> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "h3"

  return (
    <Comp
      ref={ref}
      data-slot="card-title"
      className={cn("text-h5 tracking-[0.03rem]", className)}
      {...props}
    />
  )
})
LibraryCardTitle.displayName = "LibraryCardTitle"

function LibraryCardTitleLink({
  className,
  href,
  ...props
}: Omit<LinkProps, "children"> &
  Pick<React.ComponentProps<"a">, "className" | "children">) {
  return (
    <Link
      data-slot="card-title-link"
      href={href}
      className={cn("hover:underline", className)}
      {...props}
    />
  )
}

function LibraryCardDate({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const date = isValidDate(children as string)
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(children as string))
    : children
  return (
    <div
      data-slot="card-date"
      className={cn(
        "text-muted-foreground text-sm font-medium tracking-[0.0175rem]",
        className
      )}
      {...props}
    >
      {date}
    </div>
  )
}

export {
  LibraryCard,
  LibraryCardDate,
  LibraryCardHeader,
  LibraryCardImage,
  LibraryCardTitle,
  LibraryCardTitleLink,
}
