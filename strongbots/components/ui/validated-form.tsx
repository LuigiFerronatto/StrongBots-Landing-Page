"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"

interface FormField {
  name: string
  label: string
  type: string
  placeholder?: string
  required?: boolean
  validation?: z.ZodType<any>
  errorMessage?: string
}

interface ValidatedFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  submitText: string
  className?: string
}

export function ValidatedForm({ fields, onSubmit, submitText, className = "" }: ValidatedFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = (field: FormField, value: any): string | null => {
    if (field.required && (!value || value.trim() === "")) {
      return field.errorMessage || `${field.label} é obrigatório`
    }

    if (field.validation) {
      try {
        field.validation.parse(value)
        return null
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors[0].message
        }
        return "Valor inválido"
      }
    }

    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const field = fields.find((f) => f.name === name)
      if (field) {
        const error = validate(field, value)
        setErrors((prev) => ({ ...prev, [name]: error }))
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const field = fields.find((f) => f.name === name)
    if (field) {
      const error = validate(field, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    let hasErrors = false
    const newErrors: Record<string, string | null> = {}

    fields.forEach((field) => {
      const value = formData[field.name] || ""
      const error = validate(field, value)
      newErrors[field.name] = error
      if (error) hasErrors = true
    })

    setErrors(newErrors)

    if (!hasErrors) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          <label htmlFor={field.name} className="block text-sm font-medium">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange as any}
              onBlur={handleBlur as any}
              placeholder={field.placeholder}
              className={`w-full p-2 border rounded-md ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={field.placeholder}
              className={`w-full p-2 border rounded-md ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
            />
          )}

          {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600">
        {submitText}
      </button>
    </form>
  )
}

