import type React from "react"
import { cn } from "@/lib/utils"
import type { spacing } from "@/lib/design-tokens"

interface SpacerProps {
  size?: keyof typeof spacing | number
  axis?: "horizontal" | "vertical"
  className?: string
}

export function Spacer({ size = 4, axis = "vertical", className }: SpacerProps) {
  const width = axis === "horizontal" ? `w-${size}` : "w-full"
  const height = axis === "vertical" ? `h-${size}` : "h-full"

  return <div className={cn(width, height, className)} />
}

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: keyof typeof spacing | number
  direction?: "row" | "column"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: boolean
}

export function Stack({
  spacing = 4,
  direction = "column",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  const alignmentMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  }

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }

  const directionClass = direction === "row" ? "flex-row" : "flex-col"
  const gapClass = `gap-${spacing}`
  const wrapClass = wrap ? "flex-wrap" : "flex-nowrap"

  return (
    <div
      className={cn("flex", directionClass, alignmentMap[align], justifyMap[justify], gapClass, wrapClass, className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: keyof typeof spacing | number
  rowGap?: keyof typeof spacing | number
  columnGap?: keyof typeof spacing | number
}

export function Grid({ columns = 1, gap, rowGap, columnGap, className, children, ...props }: GridProps) {
  let columnsClass = ""

  if (typeof columns === "number") {
    columnsClass = `grid-cols-${columns}`
  } else {
    const { sm, md, lg, xl } = columns
    columnsClass = [
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
    ]
      .filter(Boolean)
      .join(" ")
  }

  const gapClass = gap !== undefined ? `gap-${gap}` : ""
  const rowGapClass = rowGap !== undefined ? `row-gap-${rowGap}` : ""
  const columnGapClass = columnGap !== undefined ? `column-gap-${columnGap}` : ""

  return (
    <div className={cn("grid", columnsClass, gapClass, rowGapClass, columnGapClass, className)} {...props}>
      {children}
    </div>
  )
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: keyof typeof spacing | number
  center?: boolean
}

export function Container({ size = "lg", padding = 4, center = true, className, children, ...props }: ContainerProps) {
  const sizeMap = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  }

  const paddingClass = `px-${padding}`
  const centerClass = center ? "mx-auto" : ""

  return (
    <div className={cn(sizeMap[size], paddingClass, centerClass, "w-full", className)} {...props}>
      {children}
    </div>
  )
}

