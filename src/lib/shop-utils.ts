import type { Product, ShopFilters, SortOption } from "@/types/products"

export function filterProducts(products: Product[], filters: ShopFilters) {
  return products.filter((product) => {
    // Category filter (normalize to kebab)
    if (filters.categories.length > 0 && !filters.categories.includes("all")) {
      const productCategory = product.categories.length > 0 ? product.categories[0]._id : null;
      if (!filters.categories.includes(productCategory)) return false
    }

    // Price
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false

    // Customizable
    if (filters.customizable && !product.isCustomizable) return false

    // Occasions (only if you tag products with occasions[] later)
    // if (filters.occasions.length && !filters.occasions.some(o => product.occasions?.includes(o))) return false

    return true
  })
}

export function sortProducts(products: Product[], sortBy: SortOption) {
  const arr = [...products]
  switch (sortBy) {
    case "price-low":
      arr.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      arr.sort((a, b) => b.price - a.price)
      break
    case "newest":
      arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
    case "name":
      arr.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      // featured
      arr.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
  }
  return arr
}
