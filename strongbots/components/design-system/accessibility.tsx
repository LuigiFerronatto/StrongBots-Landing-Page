"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface VisuallyHiddenProps {
  children: React.ReactNode
  as?: React.ElementType
}

/**
 * VisuallyHidden component hides content visually while keeping it accessible to screen readers
 */
export function VisuallyHidden({ children, as: Component = "span" }: VisuallyHiddenProps) {
  return (
    <Component
      className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      style={{ clip: "rect(0, 0, 0, 0)" }}
    >
      {children}
    </Component>
  )
}

interface SkipLinkProps {
  targetId: string
  className?: string
  children?: React.ReactNode
}

/**
 * SkipLink provides a way for keyboard users to bypass navigation and jump to main content
 */
export function SkipLink({ targetId, className, children = "Skip to content" }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "absolute z-50 top-2 left-2 p-2 bg-white border border-primary-500 rounded shadow-md",
        "opacity-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500",
        "transform -translate-y-full focus:translate-y-0 transition-transform",
        className,
      )}
    >
      {children}
    </a>
  )
}

interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  className?: string
}

/**
 * FocusTrap keeps focus within a component (useful for modals)
 */
export function FocusTrap({ children, active = true, className }: FocusTrapProps) {
  const startRef = React.useRef<HTMLDivElement>(null)
  const endRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleFocusStart = React.useCallback(() => {
    if (containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusableElements.length > 0) {
        ;(focusableElements[focusableElements.length - 1] as HTMLElement).focus()
      }
    }
  }, [])

  const handleFocusEnd = React.useCallback(() => {
    if (containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {active && <div tabIndex={0} ref={startRef} onFocus={handleFocusEnd} />}
      {children}
      {active && <div tabIndex={0} ref={endRef} onFocus={handleFocusStart} />}
    </div>
  )
}

interface LiveRegionProps {
  children: React.ReactNode
  "aria-live"?: "polite" | "assertive" | "off"
  "aria-atomic"?: boolean
  "aria-relevant"?: "additions" | "removals" | "text" | "all"
  role?: string
  className?: string
}

/**
 * LiveRegion announces dynamic content changes to screen readers
 */
export function LiveRegion({
  children,
  "aria-live": ariaLive = "polite",
  "aria-atomic": ariaAtomic = true,
  "aria-relevant": ariaRelevant = "additions",
  role,
  className,
}: LiveRegionProps) {
  return (
    <div aria-live={ariaLive} aria-atomic={ariaAtomic} aria-relevant={ariaRelevant} role={role} className={className}>
      {children}
    </div>
  )
}

