import ProductCard from "@/components/shop/ProductCard"

interface RelatedProductsProps {
  currentProductId: string
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Get 4 random products excluding the current one
  const relatedProducts = [].filter((product:any) => product.id !== currentProductId).slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="heading-md mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product:any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
