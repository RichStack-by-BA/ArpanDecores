"use client"

import ProductCard from "@/components/shop/ProductCard"
import type { Product, ViewMode } from "@/types/products"

export default function ProductsGrid({
  products,
  viewMode
}: {
  products: Product[]
  viewMode: ViewMode
}) {
  if (!products?.length) {
    return null
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-6"
      }
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} viewMode={viewMode} />
      ))}
    </div>
  )
}
