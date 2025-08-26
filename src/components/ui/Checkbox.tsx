"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, ...props }, ref) => {
        return (
            <label className="inline-flex items-center">
                <input
                    type="checkbox"
                    ref={ref}
                    className={cn(
                        "peer h-4 w-4 shrink-0 rounded-sm border border-primary appearance-none cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground flex items-center justify-center",
                        className
                    )}
                    {...props}
                />
                {/* Check icon appears only when checked */}
                <span className="pointer-events-none absolute flex h-4 w-4 items-center justify-center text-primary-foreground peer-checked:opacity-100 opacity-0 transition-opacity">
                    <Check className="h-4 w-4" />
                </span>
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
