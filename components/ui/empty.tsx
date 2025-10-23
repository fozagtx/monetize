import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const emptyVariants = cva(
  "flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive/50 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface EmptyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyVariants> {
  asChild?: boolean
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(emptyVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Empty.displayName = "Empty"

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 flex items-center justify-center", className)}
    {...props}
  />
))
EmptyHeader.displayName = "EmptyHeader"

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4", className)}
    {...props}
  />
))
EmptyMedia.displayName = "EmptyMedia"

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
EmptyContent.displayName = "EmptyContent"

const EmptyTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-2 text-sm text-muted-foreground", className)}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyContent,
  EmptyTitle,
  EmptyDescription,
}
