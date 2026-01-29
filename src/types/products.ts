export type ViewMode = "grid" | "list"
export type SortOption = "featured" | "price-low" | "price-high" | "newest" | "name"

export type Product = {
  _id: string
  name: string
  price: number
  slug: string 
  categories: any
  image?: string
  rating?: number
  totalReviews?: number
  description?: string
  discountPrice?: number
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


// types/cart.ts
export interface CartItem {
  id: string;
  product: Product; // Your existing Product type
  quantity: number;
  priceAtAddTime: number;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
}