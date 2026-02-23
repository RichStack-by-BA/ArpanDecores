// components/providers/CartProvider.tsx
"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { getAllCart } from "@/lib/api/cart"
import { setCart, setLoading } from "@/store/slices/cartSlice"
import { useSyncLocalCart } from "@/hooks/useSyncLocalCart"
import type { RootState } from "@/store"
import { localCart } from "@/lib/local-cart"

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  // Use your existing sync hook
  useSyncLocalCart()

  // Fetch cart from API when user is authenticated
  const { data: apiCart, isLoading, error } = useQuery({
    queryKey: ["cart", user?._id],
    queryFn: getAllCart,
    enabled: !!user,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
   select: (data: any) => data?.data?.carts ?? { items: [] },

  })

  // Set loading state
  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading, dispatch])

  

  useEffect(() => {
    if (apiCart?.items && user) {
      const apiCartItems = apiCart.items.map((item: any) => ({
        productId: item._id,
        product: item.product || { _id: item.productId, name: "Product" },
        quantity: item.quantity,
        priceAtAddTime: item.priceAtAddTime,
      }))

      dispatch(setCart(apiCartItems))
    }else{
      dispatch(setCart(localCart.getCart()))
    }
  }, [apiCart, user, dispatch])

  return <>{children}</>
}