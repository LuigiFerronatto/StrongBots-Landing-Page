"use client"

import { useState } from "react"

export function SkipLink() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <a
      href="#main-content"
      className={`
        fixed top-4 left-4 z-50 bg-primary text-white px-4 py-2 rounded-md
        transition-transform duration-200
        ${isFocused ? "transform-none" : "-translate-y-20"}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Pular para o conteúdo principal
    </a>
  )
}

