// store/slices/cartSlice.ts
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  product: any;
  quantity: number;
  priceAtAddTime: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Add new item
        state.items.push(action.payload);
      }
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Selectors
export const selectCartItems = (state: any) => state.cart.items;
export const selectCartLoading = (state: any) => state.cart.isLoading;
export const selectCartCount = (state: any) => 
  state.cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
export const selectCartTotal = (state: any) =>
  state.cart.items.reduce((total: number, item: CartItem) => 
    total + (item.priceAtAddTime * item.quantity), 0);

export const { 
  setCart, 
  addItem, 
  removeItem, 
  updateQuantity, 
  setLoading, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;