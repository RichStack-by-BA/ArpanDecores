import type { MetadataRoute } from "next"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://arpandecores.in").replace(/\/$/, "")
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "https://api.arpandecores.in").replace(/\/$/, "")

type SitemapItem = {
  slug?: string
  updatedAt?: string
  createdAt?: string
}

function toUrl(path: string) {
  return new URL(path, siteUrl).toString()
}

function getLastModified(item: SitemapItem) {
  const date = item.updatedAt || item.createdAt
  return date ? new Date(date) : undefined
}

async function getSitemapItems(endpoint: string, key: "products" | "categories") {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) return [] as SitemapItem[]

    const payload = await response.json()
    const items = payload?.data?.[key] || payload?.[key] || []
    return Array.isArray(items) ? (items as SitemapItem[]) : []
  } catch {
    return [] as SitemapItem[]
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: toUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: toUrl("/shop"), changeFrequency: "daily", priority: 0.9 },
    { url: toUrl("/categories"), changeFrequency: "weekly", priority: 0.8 },
    { url: toUrl("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: toUrl("/contact"), changeFrequency: "monthly", priority: 0.5 },
    { url: toUrl("/craft"), changeFrequency: "monthly", priority: 0.6 },
    { url: toUrl("/gallery"), changeFrequency: "weekly", priority: 0.6 },
    { url: toUrl("/track-order"), changeFrequency: "monthly", priority: 0.3 },
  ]

  const [products, categories] = await Promise.all([
    getSitemapItems("/api/v1/product/all", "products"),
    getSitemapItems("/api/v1/category/all", "categories"),
  ])

  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => product.slug)
    .map((product) => ({
      url: toUrl(`/product/${encodeURIComponent(product.slug!)}`),
      lastModified: getLastModified(product),
      changeFrequency: "weekly",
      priority: 0.8,
    }))

  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((category) => category.slug)
    .map((category) => ({
      url: toUrl(`/categories/${encodeURIComponent(category.slug!)}`),
      lastModified: getLastModified(category),
      changeFrequency: "weekly",
      priority: 0.7,
    }))

  return [...staticPages, ...productPages, ...categoryPages]
}
