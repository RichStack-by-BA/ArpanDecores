"use client"

import { useEffect, useRef, useCallback } from "react"
import { addToCartAPI } from "@/lib/api/cart"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { pushToast } from "@/store/slices/toastSlice"
import { makeId } from "@/lib/utils"
import { setCart } from "@/store/slices/cartSlice"
import { localCart } from "@/lib/local-cart"

// ✅ Module-level flag — survives Strict Mode double-mount
let isSyncingGlobal = false

export function useSyncLocalCart() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const reduxCartItems = useSelector((state: RootState) => state.cart.items)
  const hasSynced = useRef(false)

  const syncMutation = useMutation({
    mutationFn: async (itemsToSync: any[]) => {
      if (!itemsToSync.length) return null

      const payload = {
        items: itemsToSync.map((item) => ({
          productId: item.productId,
          image: item.image,
          name: item.name,
          variantId: item.variantId,
          quantity: item.quantity || 1,
          priceAtAddTime: item.priceAtAddTime,
          slug: item.slug,
          ...(item.customization && { customization: item.customization }),
        })),
      }

      const response = await addToCartAPI(payload)
      if (!response.ok) throw new Error(response.error?.message || "Failed to sync cart")
      return response.data
    },
    onSuccess: (data: any, itemsSynced) => {
      localCart.clear()
      isSyncingGlobal = false  // ✅ reset global lock

      if (data?.cart?.items) {
        const apiCartItems = data.cart.items.map((item: any) => ({
          id: `${item.productId}_${Date.now()}`,
          productId: item.productId,
          image: item.image,
          name: item.name,
          variantId: item.variantId,
          quantity: item.quantity || 1,
          priceAtAddTime: item.priceAtAddTime,
          slug: item?.slug,
          addedAt: item.addedAt || new Date().toISOString(),
        }))
        dispatch(setCart(apiCartItems))
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] })

      dispatch(
        pushToast({
          id: makeId(),
          variant: "success",
          title: "Cart Synced",
          message: `${itemsSynced.length} item${itemsSynced.length === 1 ? "" : "s"} synced to your account.`,
        })
      )
    },
    onError: (error: any) => {
      // ✅ Reset both guards on error so user can retry
      hasSynced.current = false
      isSyncingGlobal = false

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
    const localItems = localCart.getCart()

    const shouldSync =
      user?._id &&
      localItems.length > 0 &&
      reduxCartItems.length === 0 &&
      !hasSynced.current &&   // ✅ component-level guard
      !isSyncingGlobal        // ✅ module-level guard (blocks Strict Mode second call)

    if (!shouldSync) return

    // ✅ Lock both guards immediately before async work
    hasSynced.current = true
    isSyncingGlobal = true

    const itemsToSync = localItems.map((item: any) => ({
      productId: item.productId,
      image: item.image,
      name: item.name,
      variantId: item.variantId,
      quantity: item.quantity || 1,
      priceAtAddTime: item.priceAtAddTime,
      slug: item.slug,
      ...(item.customization && { customization: item.customization }),
    }))

    syncMutation.mutate(itemsToSync)
  }, [user?._id])

  const syncCart = useCallback(() => {
    const localItems = localCart.getCart()
    if (!localItems.length || isSyncingGlobal) return  // ✅ guard here too

    hasSynced.current = true
    isSyncingGlobal = true

    const itemsToSync = localItems.map((item: any) => ({
      productId: item.productId,
      image: item.image,
      name: item.name,
      variantId: item.variantId,
      quantity: item.quantity || 1,
      priceAtAddTime: item.priceAtAddTime,
      slug: item.slug,
      ...(item.customization && { customization: item.customization }),
    }))

    syncMutation.mutate(itemsToSync)
  }, [])

  return {
    isSyncing: syncMutation.isPending,
    hasLocalItems: localCart.getCart().length > 0,
    syncCart,
  }
}