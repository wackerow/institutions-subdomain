import React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  cn(
    "disabled:cursor-not-allowed disabled:border-muted",
    "file:text-foreground placeholder:text-primary-foreground selection:bg-transparent selection:text-primary-foreground h-9 w-full min-w-0 border-b bg-transparent px-1.5 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/75 aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
  ),
  {
    variants: {
      hasError: {
        true: "border-destructive hover:not-disabled:border-destructive focus-visible:outline-destructive",
        false:
          "border-primary-foreground/50 hover:not-disabled:border-primary-hover focus-visible:outline-accent-foreground",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
)

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputVariants({ hasError, className }))}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
