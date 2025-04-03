"use client"

import { type ReactNode, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useHasMounted } from "@/hooks/use-has-mounted"

interface FadeInWhenVisibleProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  className?: string
}

export const FadeInWhenVisible = ({
  children,
  delay = 0.2,
  direction = "up",
  duration = 0.5,
  className = "",
}: FadeInWhenVisibleProps) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const mounted = useHasMounted()

  useEffect(() => {
    if (inView && mounted) {
      controls.start("visible")
    }
  }, [controls, inView, mounted])

  const getDirectionAnimation = () => {
    switch (direction) {
      case "up":
        return { y: 30 }
      case "down":
        return { y: -30 }
      case "left":
        return { x: 30 }
      case "right":
        return { x: -30 }
      case "none":
        return {}
      default:
        return { y: 30 }
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionAnimation(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        ease: "easeOut",
        delay,
      },
    },
  }

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

interface ScaleInWhenVisibleProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export const ScaleInWhenVisible = ({
  children,
  delay = 0.2,
  duration = 0.5,
  className = "",
}: ScaleInWhenVisibleProps) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const mounted = useHasMounted()

  useEffect(() => {
    if (inView && mounted) {
      controls.start("visible")
    }
  }, [controls, inView, mounted])

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        ease: "easeOut",
        delay,
      },
    },
  }

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

