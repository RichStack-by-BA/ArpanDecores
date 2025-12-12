// hooks/useCart.ts
"use client"

import { useState, useEffect, useCallback } from "react"

const LOCAL_CART_KEY = "local_cart_v2"

export function useLocalCart() {
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CART_KEY)
      setItems(saved ? JSON.parse(saved) : [])
    } catch {
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items))
    }
  }, [items, isLoading])

  // Memoized addItem
  const addItem = useCallback((item: Omit<any, "id" | "addedAt">) => {
    setItems(prev => {
      const index = prev.findIndex(i => i.productId === item.productId)
      if (index !== -1) {
        const updated = [...prev]
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + item.quantity,
          addedAt: new Date().toISOString()
        }
        return updated
      }
      return [
        ...prev,
        {
          ...item,
          id: `${item.productId}_${Date.now()}`,
          addedAt: new Date().toISOString(),
        }
      ]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, quantity), addedAt: new Date().toISOString() }
          : item
      )
    )
  }, [])

  const clear = useCallback(() => {
    setItems([])
    localStorage.removeItem(LOCAL_CART_KEY)
  }, [])

  const getItem = useCallback(
    (productId: string) => items.find(i => i.productId === productId),
    [items]
  )

  const getCart = useCallback(() => items, [items])

  return {
    items,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    getItem,
    getCart,
    count: items.reduce((t, i) => t + i.quantity, 0),
    total: items.reduce((t, i) => t + i.priceAtAddTime * i.quantity, 0),
  }
}
