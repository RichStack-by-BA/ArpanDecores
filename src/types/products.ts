export type ViewMode = "grid" | "list"
export type SortOption = "featured" | "price-low" | "price-high" | "newest" | "name"

export type Product = {
  id: string
  name: string
  price: number
  category: string
  image: string
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
