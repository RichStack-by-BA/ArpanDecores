export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    thumbnail?: string;
    slug: string;
    description: string;
  };
  quantity: number;
  priceAtAddTime: number;
}

export interface CartData {
  id: string;
  items: CartItem[];
}

class CartStorage {
  private readonly CART_KEY = 'shopping_cart';
  private readonly CART_TIMESTAMP_KEY = 'cart_last_sync';

  // Get cart from localStorage
  getCart(): CartData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cartData = localStorage.getItem(this.CART_KEY);
      return cartData ? JSON.parse(cartData) : null;
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      this.clearCart();
      return null;
    }
  }

  // Save cart to localStorage
  setCart(cartData: CartData): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cartData));
      this.setLastSync();
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Get cart items
  getCartItems(): CartItem[] {
    const cart = this.getCart();
    return cart?.items || [];
  }

  // Add item to cart
  addItem(newItem: Omit<CartItem, '_id'>): CartData {
    const cart = this.getCart();
    const items = cart?.items || [];
    
    // Check if item already exists
    const existingItemIndex = items.findIndex(
      item => item.product._id === newItem.product._id
    );

    let updatedItems: CartItem[];
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      updatedItems = items.map((item, index) => 
        index === existingItemIndex 
          ? { 
              ...item, 
              quantity: item.quantity + newItem.quantity,
              priceAtAddTime: newItem.priceAtAddTime // Update price if changed
            }
          : item
      );
    } else {
      // Add new item with unique _id
      updatedItems = [
        ...items, 
        { 
          ...newItem, 
          _id: this.generateItemId() 
        }
      ];
    }

    const updatedCart: CartData = {
      id: cart?.id || this.generateCartId(),
      items: updatedItems
    };

    this.setCart(updatedCart);
    return updatedCart;
  }

  // Update item quantity
  updateItemQuantity(itemId: string, quantity: number): CartData | null {
    const cart = this.getCart();
    if (!cart) return null;

    const updatedItems = cart.items.map(item =>
      item._id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0); // Remove items with zero quantity

    const updatedCart: CartData = {
      ...cart,
      items: updatedItems
    };

    this.setCart(updatedCart);
    return updatedCart;
  }

  // Remove item from cart
  removeItem(itemId: string): CartData | null {
    const cart = this.getCart();
    if (!cart) return null;

    const updatedItems = cart.items.filter(item => item._id !== itemId);
    const updatedCart: CartData = {
      ...cart,
      items: updatedItems
    };

    this.setCart(updatedCart);
    return updatedCart;
  }

  // Clear entire cart
  clearCart(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.CART_KEY);
    localStorage.removeItem(this.CART_TIMESTAMP_KEY);
  }

  // Get cart count
  getCartCount(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get cart subtotal
  getSubtotal(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + (item.priceAtAddTime * item.quantity), 0);
  }

  // Sync with server data
  syncWithServer(serverCart: CartData): void {
    this.setCart(serverCart);
  }

  // Check if cart needs sync (based on timestamp)
  needsSync(maxAge: number = 5 * 60 * 1000): boolean { // 5 minutes default
    if (typeof window === 'undefined') return false;
    
    const lastSync = localStorage.getItem(this.CART_TIMESTAMP_KEY);
    if (!lastSync) return true;
    
    return Date.now() - parseInt(lastSync) > maxAge;
  }

  // Private methods
  private setLastSync(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.CART_TIMESTAMP_KEY, Date.now().toString());
  }

  private generateCartId(): string {
    return `local_cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateItemId(): string {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
export const cartStorage = new CartStorage();