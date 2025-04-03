"use client"

import type React from "react"
import { motion, type Variants } from "framer-motion"

interface FadeProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
  as?: React.ElementType
}

export function Fade({
  children,
  duration = 0.5,
  delay = 0,
  className,
  direction = "none",
  distance = 20,
  once = false,
  as: Component = motion.div,
}: FadeProps) {
  let initial: { opacity: number; x?: number; y?: number } = { opacity: 0 }
  let animate: { opacity: number; x?: number; y?: number } = { opacity: 1 }

  if (direction === "up") {
    initial = { ...initial, y: distance }
    animate = { ...animate, y: 0 }
  } else if (direction === "down") {
    initial = { ...initial, y: -distance }
    animate = { ...animate, y: 0 }
  } else if (direction === "left") {
    initial = { ...initial, x: distance }
    animate = { ...animate, x: 0 }
  } else if (direction === "right") {
    initial = { ...initial, x: -distance }
    animate = { ...animate, x: 0 }
  }

  return (
    <Component
      initial={initial}
      animate={animate}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      viewport={{ once }}
      className={className}
    >
      {children}
    </Component>
  )
}

interface FadeInWhenVisibleProps {
  children: React.ReactNode
  threshold?: number
  delay?: number
  duration?: number
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  as?: React.ElementType
}

export function FadeInWhenVisible({
  children,
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  className,
  direction = "up",
  distance = 20,
  as: Component = motion.div,
}: FadeInWhenVisibleProps) {
  let initial: { opacity: number; x?: number; y?: number } = { opacity: 0 }
  let animate: { opacity: number; x?: number; y?: number } = { opacity: 1 }

  if (direction === "up") {
    initial = { ...initial, y: distance }
    animate = { ...animate, y: 0 }
  } else if (direction === "down") {
    initial = { ...initial, y: -distance }
    animate = { ...animate, y: 0 }
  } else if (direction === "left") {
    initial = { ...initial, x: distance }
    animate = { ...animate, x: 0 }
  } else if (direction === "right") {
    initial = { ...initial, x: -distance }
    animate = { ...animate, x: 0 }
  }

  return (
    <Component
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, threshold }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}

interface ScaleInWhenVisibleProps {
  children: React.ReactNode
  threshold?: number
  delay?: number
  duration?: number
  className?: string
  as?: React.ElementType
}

export function ScaleInWhenVisible({
  children,
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  className,
  as: Component = motion.div,
}: ScaleInWhenVisibleProps) {
  return (
    <Component
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, threshold }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  staggerChildren?: number
  delayChildren?: number
  className?: string
  as?: React.ElementType
}

export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className,
  as: Component = motion.div,
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }

  return (
    <Component variants={variants} initial="hidden" animate="show" className={className}>
      {children}
    </Component>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  as?: React.ElementType
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 20,
  as: Component = motion.div,
}: StaggerItemProps) {
  let hidden: { opacity: number; x?: number; y?: number } = { opacity: 0 }
  let show: { opacity: number; x?: number; y?: number } = { opacity: 1 }

  if (direction === "up") {
    hidden = { ...hidden, y: distance }
    show = { ...show, y: 0 }
  } else if (direction === "down") {
    hidden = { ...hidden, y: -distance }
    show = { ...show, y: 0 }
  } else if (direction === "left") {
    hidden = { ...hidden, x: distance }
    show = { ...show, x: 0 }
  } else if (direction === "right") {
    hidden = { ...hidden, x: -distance }
    show = { ...show, x: 0 }
  }

  const variants: Variants = {
    hidden,
    show: {
      ...show,
      transition: {
        type: "spring",
        damping: 15,
      },
    },
  }

  return (
    <Component variants={variants} className={className}>
      {children}
    </Component>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  amplitude?: number
  duration?: number
  delay?: number
  className?: string
  as?: React.ElementType
}

export function FloatingElement({
  children,
  amplitude = 10,
  duration = 6,
  delay = 0,
  className,
  as: Component = motion.div,
}: FloatingElementProps) {
  return (
    <Component
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

