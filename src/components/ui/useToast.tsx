import React, { createContext, useState, useContext, ReactNode } from "react"
import { X } from "lucide-react"

type ToastType = {
    id: string
    title: string
    description: string
    variant: "default" | "destructive"
}

type ToastContextType = {
    toasts: ToastType[]
    addToast: (toast: ToastType) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastType[]>([])

    const addToast = (toast: ToastType) => {
        setToasts((prev) => [...prev, toast])
    }

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    // if (!context) {
    //     throw new Error("useToast must be used within a ToastProvider")
    // }
    return context
}
