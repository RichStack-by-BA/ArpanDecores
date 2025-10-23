"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCartAPI } from "@/lib/api/cart"
import { useDispatch } from "react-redux"
import { pushToast } from "@/store/slices/toastSlice"
import { makeId } from "@/lib/utils"
import { useCart } from "@/hooks/useCart"

interface AddToCartButtonProps {
  product: any
  quantity?: number
  customization?: string
}

export default function AddToCartButton({ product, quantity = 1, customization }: AddToCartButtonProps) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { addItem } = useCart()

  const addToCartMutation = useMutation({
    mutationFn: async (cartItem: any) => {
      // Try server-side first
      console.log(cartItem, "cartItemcartItem")
      const response = await addToCartAPI({items: [{
        productId: cartItem.product._id,
        quantity: cartItem.quantity,
        priceAtAddTime: cartItem.priceAtAddTime || 0,}]})
      if (!response.ok) {
        throw new Error(response.error?.message || "Failed to add to cart")
      }
      return response.data
    },
    onMutate: async (cartItem) => {
      // 🟡 Optimistic Update (update local storage before server response)
      addItem(cartItem)
      dispatch(
        pushToast({
          id: makeId(),
          variant: "info",
          title: "Adding to cart...",
          message: `${cartItem.product.name} is being added.`,
        })
      )
    },
    onSuccess: (data:any) => {
      // ✅ Sync local cart with server version
      if (data?.cart) {
        queryClient.invalidateQueries({ queryKey: ["cart"] })
      }
      dispatch(
        pushToast({
          id: makeId(),
          variant: "success",
          title: "Added to cart",
          message: `${product.name} has been added to your cart.`,
        })
      )
    },
    onError: (error: any) => {
      dispatch(
        pushToast({
          id: makeId(),
          variant: "error",
          title: "Error",
          message: error.message || "Failed to add item to cart.",
        })
      )
    },
  })

  const handleAddToCart = () => {
    const cartItem = {
      product,
      quantity,
      priceAtAddTime: product.price,
    }
    addToCartMutation.mutate(cartItem)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={addToCartMutation.isPending}
      className="btn-primary flex-1 sm:flex-none"
    >
      <ShoppingBag className="h-4 w-4 mr-2" />
      {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
