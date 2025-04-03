"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-in" | "slide-up" | "slide-in-right"
  delay?: 1 | 2 | 3
}

export function AnimatedSection({ children, className = "", animation = "fade-in", delay = 1 }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible ? animation : "opacity-0",
        isVisible ? "" : "transform translate-y-10",
        isVisible ? "" : `delay-${delay * 100}`,
        className,
      )}
    >
      {children}
    </div>
  )
}

