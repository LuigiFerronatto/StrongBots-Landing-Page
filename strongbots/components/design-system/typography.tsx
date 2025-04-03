import type React from "react"
import { cn } from "@/lib/utils"

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "body-large" | "body-small" | "caption" | "overline" | "lead"
  weight?: "regular" | "medium" | "semibold" | "bold"
  color?: string
  as?: React.ElementType
}

export function Text({
  variant = "body",
  weight = "regular",
  color,
  className,
  as: Component = "p",
  ...props
}: TextProps) {
  const variantStyles = {
    body: "text-base leading-normal",
    "body-large": "text-lg leading-relaxed",
    "body-small": "text-sm leading-normal",
    caption: "text-xs leading-normal",
    overline: "text-xs uppercase tracking-wider leading-normal",
    lead: "text-xl leading-relaxed",
  }

  const weightStyles = {
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }

  return (
    <Component
      className={cn("font-nunito", variantStyles[variant], weightStyles[weight], color && `text-${color}`, className)}
      {...props}
    />
  )
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold"
  color?: string
  as?: React.ElementType
  hasGradient?: boolean
  hasAnimation?: boolean
}

export function Heading({
  level = 2,
  weight = "bold",
  color,
  className,
  as,
  hasGradient = false,
  hasAnimation = false,
  ...props
}: HeadingProps) {
  const Component = as || (`h${level}` as React.ElementType)

  const sizeStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
    2: "text-3xl md:text-4xl leading-tight",
    3: "text-2xl md:text-3xl leading-tight",
    4: "text-xl md:text-2xl leading-tight",
    5: "text-lg md:text-xl leading-tight",
    6: "text-base md:text-lg leading-tight",
  }

  const weightStyles = {
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  }

  const gradientClass = hasGradient ? (hasAnimation ? "gradient-text-animated" : "gradient-text") : ""

  return (
    <Component
      className={cn(
        "font-montserrat",
        sizeStyles[level],
        weightStyles[weight],
        color && !hasGradient && `text-${color}`,
        gradientClass,
        className,
      )}
      {...props}
    />
  )
}

interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "small" | "medium" | "large"
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold"
  color?: string
  as?: React.ElementType
  hasGradient?: boolean
  hasAnimation?: boolean
}

export function Display({
  size = "medium",
  weight = "bold",
  color,
  className,
  as: Component = "h1",
  hasGradient = false,
  hasAnimation = false,
  ...props
}: DisplayProps) {
  const sizeStyles = {
    small: "text-4xl md:text-5xl leading-tight",
    medium: "text-5xl md:text-6xl leading-tight",
    large: "text-6xl md:text-7xl leading-tight",
  }

  const weightStyles = {
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  }

  const gradientClass = hasGradient ? (hasAnimation ? "gradient-text-animated" : "gradient-text") : ""

  return (
    <Component
      className={cn(
        "font-montserrat",
        sizeStyles[size],
        weightStyles[weight],
        color && !hasGradient && `text-${color}`,
        gradientClass,
        className,
      )}
      {...props}
    />
  )
}

export function Highlight({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-highlight relative inline-block", className)} {...props}>
      {children}
    </span>
  )
}

export function GradientText({
  children,
  className,
  animated = false,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { animated?: boolean }) {
  return (
    <span className={cn(animated ? "gradient-text-animated" : "gradient-text", className)} {...props}>
      {children}
    </span>
  )
}

