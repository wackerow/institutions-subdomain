import React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "border-input placeholder:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/75 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full border-b bg-transparent px-1.5 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      hasError: {
        true: "border-destructive hover:not-disabled:border-destructive focus-visible:outline-destructive",
        false:
          "border-primary-foreground/50 hover:not-disabled:border-primary-hover focus-visible:outline-primary-hover",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
)

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(textareaVariants({ hasError, className }))}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
