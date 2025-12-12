// hooks/useAddToCart.ts
"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCartAPI } from "@/lib/api/cart"
import { useDispatch, useSelector } from "react-redux"
import { pushToast } from "@/store/slices/toastSlice"
import { addItem, setLoading } from "@/store/slices/cartSlice"
import { useLocalCart } from "@/hooks/useCart"
import type { RootState } from "@/store"
import { localCart } from "@/lib/local-cart"

interface AddToCartParams {
  productId: string
  product: any
  quantity?: number
  priceAtAddTime: number
  customization?: string
}

export function useAddToCart() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const apiMutation = useMutation({
    mutationFn: async (cartData: AddToCartParams) => {
      dispatch(setLoading(true))
      
      const response = await addToCartAPI({
        items: [{
          productId: cartData.productId,
          quantity: cartData.quantity || 1,
          priceAtAddTime: cartData.priceAtAddTime,
        }],
      })
      if (!response.ok) {
        throw new Error(response.error?.message || "Failed to add to cart")
      }
      
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?._id] })

      const cartItem: any = {
        _id: `${variables.productId}_${Date.now()}`,
        productId: variables.productId,
        product: variables.product,
        quantity: variables.quantity || 1,
        priceAtAddTime: variables.priceAtAddTime,
        addedAt: new Date().toISOString(),
        ...(variables.customization && { customization: variables.customization })
      }
      
      dispatch(addItem(cartItem))
      
      dispatch(
        pushToast({
          id: `toast-${Date.now()}`,
          variant: "success",
          title: "Added to cart",
          message: `${variables.product.name} has been added to your cart.`,
        })
      )
    },
    onError: (error: Error) => {
      dispatch(
        pushToast({
          id: `toast-${Date.now()}`,
          variant: "error",
          title: "Error",
          message: error.message,
        })
      )
    },
    onSettled: () => {
      dispatch(setLoading(false))
    },
  })

  // Add to cart for guest users
  const addToGuestCart = (cartData: AddToCartParams) => {
    dispatch(setLoading(true))
    
    // Add to Redux store
    const cartItem: any = {
      id: `${cartData.productId}_${Date.now()}`,
      productId: cartData.productId,
      product: cartData.product,
      quantity: cartData.quantity || 1,
      priceAtAddTime: cartData.priceAtAddTime,
      addedAt: new Date().toISOString(),
      ...(cartData.customization && { customization: cartData.customization })
    }
    
    dispatch(addItem(cartItem))
    
    // Also add to localStorage as backup
   localCart.addItem({
    productId: cartData.productId,
    product: cartData.product,
    quantity: cartData.quantity || 1,
    priceAtAddTime: cartData.priceAtAddTime
  })
    
    dispatch(
      pushToast({
        id: `toast-${Date.now()}`,
        variant: "success",
        title: "Added to cart",
        message: `${cartData.product.name} has been added to your cart.`,
      })
    )
    
    dispatch(setLoading(false))
  }

  // Main addToCart function
  const addToCart = (cartData: AddToCartParams) => {
    if (user) {
      apiMutation.mutate(cartData)
    } else {
      addToGuestCart(cartData)
    }
  }

  return {
    addToCart,
    isPending: apiMutation.isPending ,
    isError: apiMutation.isError,
    error: apiMutation.error,
  }
}