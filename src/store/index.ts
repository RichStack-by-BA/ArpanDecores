import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';
import cartReducer from './slices/cartSlice';
import UISlice from './slices/UISlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    cart: cartReducer,
    UIState:UISlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 