"use client"

import React, { useState, forwardRef } from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string
  onChange?: (value: string) => void
  children: React.ReactNode
}

interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  label?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value: controlledValue, onChange, children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(
      controlledValue
    )

    const handleChange = (newValue: string) => {
      if (onChange) onChange(newValue)
      else setUncontrolledValue(newValue)
    }

    const currentValue = controlledValue ?? uncontrolledValue

    return (
      <div
        ref={ref}
        className={cn("grid gap-2", className)}
        {...props}
      >
        {/* Clone each child and inject group behavior */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                checked: child.props.value === currentValue,
                onChange: () => handleChange(child.props.value),
              })
            : child
        )}
      </div>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, value, checked, onChange, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          className={cn(
            "peer appearance-none aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "checked:border-4 checked:border-primary",
            className
          )}
          {...props}
        />
        <span className="relative flex h-4 w-4 items-center justify-center">
          {checked && <Circle className="absolute h-2.5 w-2.5 fill-current text-primary" />}
        </span>
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"
