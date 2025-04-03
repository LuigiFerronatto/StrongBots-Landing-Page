"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItem {
  title: string
  content: React.ReactNode
}

interface AccessibleAccordionProps {
  items: AccordionItem[]
  className?: string
}

export function AccessibleAccordion({ items, className = "" }: AccessibleAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={`divide-y ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="py-3">
          <button
            className="flex justify-between items-center w-full text-left font-medium"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
            id={`accordion-header-${index}`}
          >
            {item.title}
            <ChevronDown
              className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              aria-hidden="true"
              width={20}
              height={20}
            />
          </button>

          <div
            id={`accordion-content-${index}`}
            role="region"
            aria-labelledby={`accordion-header-${index}`}
            className={`mt-2 transition-all overflow-hidden ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            hidden={openIndex !== index}
          >
            <div className="py-2">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

