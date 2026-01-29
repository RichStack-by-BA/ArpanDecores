"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useAddToCart } from "@/hooks/useAddToCart"

interface AddToCartButtonProps {
  product: any
  quantity?: number
  customization?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  customization, 
  className = "",
  variant = "default",
  size = "default"
}: AddToCartButtonProps) {
  const { addToCart, isPending } = useAddToCart()

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,  // Changed from _id to productId to match your hook
      product: product,        // Added product object which is used in the hook
      quantity,
      priceAtAddTime: product.price,
      // Add customization if provided
      ...(customization && { customization })
    }
    
    addToCart(cartItem)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending}
      variant={variant}
      size={size}
      className={`flex-1 sm:flex-none ${className}`}
    >
      <ShoppingBag className="h-4 w-4 mr-2" />
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  )
}