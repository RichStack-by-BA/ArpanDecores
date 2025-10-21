"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/misc/Badge"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Personalized Wooden Nameplate",
      price: 2499,
      originalPrice: 3499,
      image: "/wooden-nameplate.jpg",
      category: "Home Decor",
      inStock: true,
    },
    {
      id: "2",
      name: "Brass Candle Holders Set",
      price: 3999,
      image: "/brass-candle-holders.jpg",
      category: "Decor",
      inStock: true,
    },
    {
      id: "3",
      name: "Leather Bound Journal",
      price: 1899,
      originalPrice: 2499,
      image: "/leather-journal.png",
      category: "Stationery",
      inStock: false,
    },
    {
      id: "4",
      name: "Ceramic Decorative Bowls",
      price: 2199,
      image: "/ceramic-bowls.jpg",
      category: "Decor",
      inStock: true,
    },
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const inStockItems = wishlistItems.filter((item) => item.inStock)
  const outOfStockItems = wishlistItems.filter((item) => !item.inStock)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary/5 border-b">
        <div className="container-custom py-8">
          <h1 className="heading-lg mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="heading-md mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start adding items to your wishlist to save them for later.</p>
            <Link href="/shop">
              <Button className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* In Stock Items */}
            {inStockItems.length > 0 && (
              <div>
                <h2 className="heading-md mb-6">Available Items ({inStockItems.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inStockItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-64 overflow-hidden bg-secondary/5">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {item.originalPrice && (
                          <Badge className="absolute top-4 right-4 bg-accent text-white">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-md"
                        >
                          <Heart className="h-5 w-5 fill-primary text-primary" />
                        </button>
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2">
                          {item.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-primary font-bold text-lg">₹{item.price.toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="text-muted-foreground line-through text-sm">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Link href={`/product/${item.id}`} className="flex-1">
                            <Button variant="outline" className="w-full bg-transparent">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Out of Stock Items */}
            {outOfStockItems.length > 0 && (
              <div>
                <h2 className="heading-md mb-6">Out of Stock ({outOfStockItems.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outOfStockItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden opacity-75">
                      <div className="relative h-64 overflow-hidden bg-secondary/5">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Badge className="bg-destructive text-white">Out of Stock</Badge>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-md"
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </button>
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2">
                          {item.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-primary font-bold text-lg">₹{item.price.toLocaleString()}</span>
                        </div>
                        <Button variant="outline" className="w-full bg-transparent" disabled>
                          Out of Stock
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Continue Shopping */}
            <div className="text-center pt-8 border-t">
              <Link href="/shop">
                <Button variant="outline" className="gap-2 bg-transparent">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
