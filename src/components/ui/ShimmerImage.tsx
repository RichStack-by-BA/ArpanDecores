"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

function ShimmerImageContent({ className, onError, onLoad, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {!isLoaded && <div className="image-shimmer" aria-hidden="true" />}
      <Image
        {...props}
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={(event) => {
          setIsLoaded(true)
          onLoad?.(event)
        }}
        onError={(event) => {
          setIsLoaded(true)
          onError?.(event)
        }}
      />
    </>
  )
}

export default function ShimmerImage(props: ImageProps) {
  const sourceKey = typeof props.src === "string"
    ? props.src
    : "default" in props.src
      ? props.src.default.src
      : props.src.src

  return <ShimmerImageContent key={sourceKey} {...props} />
}
