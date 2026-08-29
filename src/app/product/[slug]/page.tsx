
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import RelatedProducts from "@/components/product/RelatedProduct"
import { getProductById } from "@/lib/api/product"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import ReviewsList from "@/components/review/ReviewList"
import ProductDetails from "@/components/product/ProductPage"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arpandecores.in"

function getProductImage(product: any): string | undefined {
  const image = product.images?.[0] || product.image

  if (typeof image !== "string" || !image) return undefined

  return image.startsWith("http") ? image : new URL(image, siteUrl).toString()
}

function getProductDescription(product: any): string {
  const description = String(product.description || `Discover ${product.name} at Arpan Decores.`)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  return description.slice(0, 160)
}

async function getProduct(slug: string) {
  const result: any = await getProductById(slug)
  return result.ok ? result.data?.data?.product || null : null
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: "Product Not Found | Arpan Decores",
      robots: { index: false, follow: false },
    }
  }

  const title = `${product.name} | Arpan Decores`
  const description = getProductDescription(product)
  const image = getProductImage(product)
  const productUrl = new URL(`/product/${encodeURIComponent(slug)}`, siteUrl).toString()

  return {
    title,
    description,
    alternates: { canonical: productUrl },
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: "Arpan Decores",
      type: "website",
      images: image ? [{ url: image, alt: product.name }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const productUrl = new URL(`/product/${encodeURIComponent(slug)}`, siteUrl).toString()
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: getProductDescription(product),
    image: getProductImage(product),
    offers: typeof product.price === "number"
      ? {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "INR",
          price: product.discountPrice || product.price,
          availability: product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        }
      : undefined,
  }

  return (
    <div className=" container-custom py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Breadcrumbs />
      <ProductDetails product={product} />

      {/* <div className="mt-12">
        <ReviewsList productId={product._id} />
      </div> */}

      <RelatedProducts currentProductId={product._id} />
    </div>
  );
}
