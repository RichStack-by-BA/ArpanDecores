"use client"

import { useState } from "react"
import ProductCard from "@/components/shop/ProductCard"
import Pagination from "@/components/misc/Pagination"
import type { Product, ViewMode } from "@/types/products"

export default function ProductsGrid({
  products,
  viewMode
}: {
  products: Product[]
  viewMode: ViewMode
}) {

  const itemsPerPage = 8
  const [page, setPage] = useState(1)

  if (!products?.length) {
    return null
  }

  const totalPages = Math.ceil(products.length / itemsPerPage)

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const paginatedProducts = products.slice(start, end)

  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-6"
        }
      >
        {paginatedProducts.map((p: any) => (
          <ProductCard key={p._id} product={p} viewMode={viewMode} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  )
}