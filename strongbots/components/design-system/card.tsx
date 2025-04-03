import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-lg overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white border border-gray-100",
      elevated: "bg-white shadow-card hover:shadow-card-hover transition-all duration-300",
      outlined: "bg-transparent border border-gray-200",
      filled: "bg-secondary-50",
      glass: "glass-card",
      gradient: "bg-gradient-primary text-white",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    hover: {
      none: "",
      lift: "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      highlight: "transition-all duration-300 hover:border-primary-300",
      scale: "transition-all duration-300 hover:scale-[1.02]",
      glow: "hover-glow",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    hover: "none",
  },
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, hover, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, padding, hover }), className)} {...props} />
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: boolean
}

function CardHeader({ className, separator = false, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5", separator && "pb-4 border-b border-gray-100", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold text-xl leading-none tracking-tight", className)} {...props} />
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center pt-4 border-t border-gray-100 mt-auto", className)} {...props} />
}

function CardImage({ src, alt = "", className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className="relative w-full h-48 overflow-hidden">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn("w-full h-full object-cover transition-transform duration-500 hover:scale-105", className)}
        {...props}
      />
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage }

