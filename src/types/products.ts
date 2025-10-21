export type ViewMode = "grid" | "list"
export type SortOption = "featured" | "price-low" | "price-high" | "newest" | "name"

export type Product = {
  _id: string
  name: string
  price: number
  slug: string 
  categories: any
  images: string
  isCustomizable?: boolean
  isBestseller?: boolean
  isNew?: boolean
}

export type ShopFilters = {
  categories: string[]
  priceRange: [number, number]
  occasions: string[]
  customizable: boolean
}
