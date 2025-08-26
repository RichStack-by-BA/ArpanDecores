"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

interface Option {
  label: string
  value: string
}

interface SelectProps {
  options: Option[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export function Select({
  options,
  value,
  placeholder = "Select an option",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false)

  const selected = options.find((opt) => opt.value === value)

  return (
    <div className="relative w-full max-w-xs text-sm">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-left text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <span className="line-clamp-1 text-foreground">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value)
                setOpen(false)
              }}
              className={`relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 pr-8 text-sm hover:bg-accent hover:text-accent-foreground ${
                opt.value === value ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              {opt.label}
              {opt.value === value && (
                <Check className="absolute right-2 h-4 w-4" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
