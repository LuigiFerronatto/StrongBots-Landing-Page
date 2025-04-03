"use client"

import type React from "react"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function EnhancedButton({
  children,
  onClick,
  className,
  ...props
}: ButtonProps & { onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    onClick && onClick(e)
  }

  return (
    <Button
      className={cn(
        "relative transition-all duration-300 transform",
        isPressed ? "scale-95" : "hover:scale-105",
        "after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity hover:after:opacity-10",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  )
}

