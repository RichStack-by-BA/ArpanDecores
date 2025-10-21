import { useState, useEffect } from 'react';
import { cartStorage, CartData, CartItem } from '@/lib/cart-storage';

export function useCart() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart on mount
  useEffect(() => {
    const loadCart = () => {
      const cartData = cartStorage.getCart();
      setCart(cartData);
      setIsLoading(false);
    };

    loadCart();

    // Listen for storage changes (across tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === cartStorage['CART_KEY']) {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addItem = (item: Omit<CartItem, '_id'>) => {
    const updatedCart = cartStorage.addItem(item);
    setCart(updatedCart);
    return updatedCart;
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedCart = cartStorage.updateItemQuantity(itemId, quantity);
    if (updatedCart) {
      setCart(updatedCart);
    }
    return updatedCart;
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartStorage.removeItem(itemId);
    if (updatedCart) {
      setCart(updatedCart);
    }
    return updatedCart;
  };

  const clearCart = () => {
    cartStorage.clearCart();
    setCart(null);
  };

  const syncWithServer = (serverCart: CartData) => {
    cartStorage.syncWithServer(serverCart);
    setCart(serverCart);
  };

  const cartCount = cartStorage.getCartCount();
  const subtotal = cartStorage.getSubtotal();
  const needsSync = cartStorage.needsSync();

  return {
    cart,
    cartItems: cart?.items || [],
    cartCount,
    subtotal,
    isLoading,
    needsSync,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    syncWithServer
  };
}