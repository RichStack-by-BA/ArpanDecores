"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  status?: "online" | "offline" | "away" | "busy"
  tooltipText?: string
  size?: "sm" | "md" | "lg"
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  status,
  tooltipText,
  size = "md",
  className,
  ...props
}) => {
  const sizeClasses =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : size === "lg"
      ? "h-16 w-16 text-xl"
      : "h-10 w-10 text-sm"

  return (
    <div className="relative group inline-block" {...props}>
      {/* Tooltip */}
      {tooltipText && (
        <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
          {tooltipText}
        </div>
      )}

      {/* Avatar Circle */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-700 font-medium",
          sizeClasses,
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{fallback}</span>
        )}

        {/* Status dot */}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
              status === "online" && "bg-green-500",
              status === "offline" && "bg-gray-400",
              status === "away" && "bg-yellow-400",
              status === "busy" && "bg-red-500"
            )}
          />
        )}
      </div>
    </div>
  )
}
