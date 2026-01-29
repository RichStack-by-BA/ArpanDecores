// hooks/useSyncLocalCart.ts
"use client"

import { useEffect } from "react"
import { addToCartAPI } from "@/lib/api/cart"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { pushToast } from "@/store/slices/toastSlice"
import { makeId } from "@/lib/utils"
import { setCart } from "@/store/slices/cartSlice"
import { localCart } from "@/lib/local-cart"

export function useSyncLocalCart() {
 const localItems = localCart.getCart()
 const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const reduxCartItems = useSelector((state: RootState) => state.cart.items)

  // Check if we need to sync (user just logged in with local cart items)
  const hasLocalCart = localItems.length > 0
  const hasReduxCart = reduxCartItems.length > 0
  const shouldSync = user && hasLocalCart && !hasReduxCart

  const syncMutation = useMutation({
    mutationFn: async (itemsToSync: any[]) => {
      if (!itemsToSync.length) return null

      const payload = {
        items: itemsToSync.map((item) => ({
          productId: item.productId || item.product?._id,
          quantity: item.quantity,
          priceAtAddTime: item.priceAtAddTime,
          ...(item.customization && { customization: item.customization })
        })),
      }

      const response = await addToCartAPI(payload)

      if (!response.ok) throw new Error(response.error?.message || "Failed to sync cart")
      return response.data
    },
    onSuccess: (data:any, itemsSynced) => {
      // Clear local storage
      localCart.clear()
      
      // Update Redux store with merged cart from API
      if (data?.carts?.items) {
        const apiCartItems = data.cart.items.map((item: any) => ({
          id: `${item.productId}_${Date.now()}`,
          productId: item.productId,
          product: item.product || { _id: item.productId, name: "Product" },
          quantity: item.quantity,
          priceAtAddTime: item.priceAtAddTime,
          addedAt: item.addedAt || new Date().toISOString(),
        }))
        
        dispatch(setCart(apiCartItems))
      }
      
      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      
      // Show success notification
      dispatch(
        pushToast({
          id: makeId(),
          variant: "success",
          title: "Cart Synced",
          message: `${itemsSynced.length} item${itemsSynced.length === 1 ? '' : 's'} synced to your account.`,
        })
      )
    },
    onError: (error: any) => {
      dispatch(
        pushToast({
          id: makeId(),
          variant: "error",
          title: "Sync Failed",
          message: error.message || "Unable to sync cart items. They remain in your local cart.",
        })
      )
    },
  })

  useEffect(() => {
    if (shouldSync) {
      // Merge local storage items with current structure
      const itemsToSync = localItems.map((item:any) => ({
        productId: item.productId || item.product?._id,
        product: item.product || { _id: item.productId, name: "Product" },
        quantity: item.quantity || 1,
        priceAtAddTime: item.priceAtAddTime || item.product?.price,
        ...(item.customization && { customization: item.customization })
      }))
      
      syncMutation.mutate(itemsToSync)
    }
  }, [user]) // Only run when user changes (logs in)

  return {
    isSyncing: syncMutation.isPending,
    hasLocalItems: hasLocalCart,
    syncCart: () => {
      if (hasLocalCart ) {
        const itemsToSync = localItems.map((item:any) => ({
          productId: item.product?._id,
          product: item.product || { _id: '11111', name: "Product" },
          quantity: item.quantity || 1,
          priceAtAddTime: item.priceAtAddTime || item.product?.price ,
        }))
        syncMutation.mutate(itemsToSync)
      }
    }
  }
}