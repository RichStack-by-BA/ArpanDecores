"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/Badge"

interface Variant {
  name: string
  images: string[]
  stock: number
}

interface ProductVariantSelectorProps {
  variants: Variant[]
  onVariantChange: (variant: Variant) => void
}

export default function ProductVariantSelector({ variants, onVariantChange }: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0])

  const handleSelectVariant = (variant: Variant) => {
    setSelectedVariant(variant)
    onVariantChange(variant)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold">Choose Color/Variant:</label>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant, index) => (
          <button
            key={index}
            onClick={() => handleSelectVariant(variant)}
            className={`relative group transition-all ${
              selectedVariant.name === variant.name ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-muted hover:border-primary transition-colors">
              <Image
                src={variant.images[0] || "/placeholder.svg"}
                alt={`${variant.name} variant`}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 mt-1 bg-background text-xs font-medium px-2 py-1 rounded border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {variant.name}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Variant Info */}
      <div className="mt-4 pt-4 border-t space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Selected: {selectedVariant.name}</span>
          {selectedVariant.stock > 0 ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {selectedVariant.stock} in stock
            </Badge>
          ) : (
            <Badge variant="destructive">Out of stock</Badge>
          )}
        </div>
      </div>
    </div>
  )
}
