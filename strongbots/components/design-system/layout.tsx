import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  fullWidth?: boolean
  fullHeight?: boolean
  centered?: boolean
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  background?: string
  icon?: React.ReactNode
  iconPosition?: "top" | "left"
  iconSize?: "sm" | "md" | "lg"
  iconBackground?: string
  hasDivider?: boolean
  variant?: "default" | "card" | "highlight" | "gradient" | "dark" | "accent"
}

export function Section({
  as: Component = "section",
  fullWidth = false,
  fullHeight = false,
  centered = false,
  padding = "lg",
  background,
  icon,
  iconPosition = "top",
  iconSize = "md",
  iconBackground,
  hasDivider = false,
  variant = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const paddingMap = {
    none: "",
    sm: "py-8",
    md: "py-12",
    lg: "py-16 md:py-24",
    xl: "py-24 md:py-32",
  }

  const iconSizeMap = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const variantStyles = {
    default: "",
    card: "rounded-xl shadow-md border border-gray-100",
    highlight: "rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200",
    gradient: "gradient-animated text-white",
    dark: "section-dark",
    accent: "section-accent",
  }

  return (
    <Component
      className={cn(
        paddingMap[padding],
        fullWidth ? "w-full" : "container mx-auto px-4 md:px-8",
        fullHeight && "min-h-screen",
        centered && "flex items-center justify-center",
        background && `bg-${background}`,
        variant !== "default" && variantStyles[variant],
        "transition-all duration-300 ease-in-out",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-200/50",
        className,
      )}
      data-section-type={variant}
      aria-labelledby={icon ? "section-heading" : undefined}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "flex",
            iconPosition === "top" ? "flex-col items-center mb-6" : "flex-row items-start mb-4",
            "animate-fade-in",
          )}
        >
          <div
            className={cn(
              iconSizeMap[iconSize],
              "rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105",
              iconBackground ? `bg-${iconBackground}` : "gradient-primary text-white shadow-md",
              iconPosition === "left" && "mr-4",
            )}
          >
            {icon}
          </div>
          {hasDivider && iconPosition === "top" && <div className="h-8 w-px bg-gray-200 my-2"></div>}
        </div>
      )}
      {children}
    </Component>
  )
}

interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: "none" | "sm" | "md" | "lg"
  rowGap?: "none" | "sm" | "md" | "lg"
  columnGap?: "none" | "sm" | "md" | "lg"
  iconColor?: string
  hasBorder?: boolean
}

export function GridLayout({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "md",
  rowGap,
  columnGap,
  iconColor = "text-primary-500",
  hasBorder = false,
  className,
  children,
  ...props
}: GridLayoutProps) {
  const gapMap = {
    none: "",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  const rowGapMap = {
    none: "",
    sm: "row-gap-4",
    md: "row-gap-6",
    lg: "row-gap-8",
  }

  const columnGapMap = {
    none: "",
    sm: "column-gap-4",
    md: "column-gap-6",
    lg: "column-gap-8",
  }

  let columnsClass = ""

  if (typeof columns === "number") {
    columnsClass = `grid-cols-${columns}`
  } else {
    const { sm, md, lg, xl } = columns
    columnsClass = [
      sm && `grid-cols-1`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
    ]
      .filter(Boolean)
      .join(" ")
  }

  return (
    <div
      className={cn(
        "grid",
        columnsClass,
        gap !== "none" && gapMap[gap],
        rowGap && rowGapMap[rowGap],
        columnGap && columnGapMap[columnGap],
        iconColor,
        hasBorder && "divide-y divide-gray-100 md:divide-y-0 md:divide-x",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface FlexLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  wrap?: boolean
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  gap?: "none" | "sm" | "md" | "lg"
}

export function FlexLayout({
  direction = "row",
  wrap = false,
  justify = "start",
  align = "start",
  gap = "none",
  className,
  children,
  ...props
}: FlexLayoutProps) {
  const directionMap = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    column: "flex-col",
    "column-reverse": "flex-col-reverse",
  }

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  }

  const gapMap = {
    none: "",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  return (
    <div
      className={cn(
        "flex",
        directionMap[direction],
        wrap && "flex-wrap",
        justifyMap[justify],
        alignMap[align],
        gap !== "none" && gapMap[gap],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
  children: React.ReactNode
}

export function AspectRatio({ ratio = 16 / 9, className, children, ...props }: AspectRatioProps) {
  return (
    <div className={cn("relative w-full", className)} style={{ paddingBottom: `${(1 / ratio) * 100}%` }} {...props}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical"
  size?: "sm" | "md" | "lg"
  color?: string
  variant?: "solid" | "dashed" | "dotted" | "gradient"
}

export function Divider({
  orientation = "horizontal",
  size = "md",
  color = "gray-200",
  variant = "solid",
  className,
  ...props
}: DividerProps) {
  const sizeMap = {
    sm: orientation === "horizontal" ? "h-px" : "w-px",
    md: orientation === "horizontal" ? "h-0.5" : "w-0.5",
    lg: orientation === "horizontal" ? "h-1" : "w-1",
  }

  const variantMap = {
    solid: "",
    dashed: "border-dashed",
    dotted: "border-dotted",
    gradient: variant === "gradient" && orientation === "horizontal" ? "divider-gradient" : "",
  }

  return (
    <hr
      className={cn(
        sizeMap[size],
        variant !== "gradient" && `bg-${color}`,
        orientation === "vertical" && "h-full",
        variantMap[variant],
        className,
      )}
      {...props}
    />
  )
}

export function Container({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container mx-auto px-4 md:px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  )
}

