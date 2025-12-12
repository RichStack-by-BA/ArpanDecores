// components/providers/StoreProvider.tsx
"use client"

import { Provider } from "react-redux"
// import { persistor, store } from "@/store"
// import { PersistGate } from "redux-persist/integration/react"
import CartProvider from "./CartProvider"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    // <Provider store={store}>
    //   <PersistGate 
    //     loading={
    //       <div className="min-h-screen flex items-center justify-center">
    //         <div className="text-center">
    //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    //           <p className="mt-4 text-muted-foreground">Loading...</p>
    //         </div>
    //       </div>
    //     } 
    //     persistor={persistor}
    //   >
        <CartProvider>
        {children}
        </CartProvider>
    //   </PersistGate>
    // </Provider>
  )
}