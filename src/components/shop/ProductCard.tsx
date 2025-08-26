"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import type { Product, ViewMode } from "@/types/products"

export default function ProductCard({
  product,
  viewMode = "grid"
}: {
  product: Product
  viewMode?: ViewMode
}) {
  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition ${viewMode === "list" ? "flex" : ""
        }`}
    >
      <div className={`${viewMode === "list" ? "w-48 h-48" : "w-full h-64"} relative`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-primary font-bold mb-4">₹{product.price}</p>
        <Link href={`/product/${product.id}`}>
          <Button size="sm" variant="default">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}
