"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/Button"
// import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/useToast"
import { addToCartAPI } from "@/lib/api/cart"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"
import { pushToast } from "@/store/slices/toastSlice"
import { makeId } from "@/lib/utils"
import { cartStorage } from "@/lib/cart-storage"
import { useCart } from "@/hooks/useCart"

interface Product {
  _id: string
  name: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  product: any
  quantity?: number
  customization?: string
}

export default function AddToCartButton({ product, quantity = 1, customization }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const userDetails = useSelector((state: any) => state.auth.user)
  const dispatch = useDispatch();


const { addItem } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)
    
    try {
      const cartItem = {
        product: product,
        quantity: quantity,
        priceAtAddTime: product.price
      };

      await addItem(cartItem);

      dispatch(pushToast({ 
        id: makeId(), 
        variant: 'success', 
        title: 'Added to cart', 
        message: `${product.name} has been added to your cart.` 
      }));

      // Reset quantity
      // setQuantity(1);
    } catch (error) {
      dispatch(pushToast({ 
        id: makeId(), 
        variant: 'error', 
        title: 'Error', 
        message: 'Failed to add item to cart.' 
      }));
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Button onClick={handleAddToCart} disabled={isLoading} className="btn-primary flex-1 sm:flex-none">
      <ShoppingBag className="h-4 w-4 mr-2" />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
