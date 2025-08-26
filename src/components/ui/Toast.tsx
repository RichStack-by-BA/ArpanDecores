import React, { useEffect } from "react"
import { useToast } from "./ToastContext"
import { X } from "lucide-react"
import { cn } from "@/lib/utils" // A utility function to concatenate class names

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast()

  useEffect(() => {
    // Automatically remove the toast after 5 seconds
    const timeout = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id)
      }
    }, 5000)

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout)
  }, [toasts, removeToast])

  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-50 flex flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col"
      )}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "relative flex items-center w-full max-w-sm p-4 mb-4 rounded-md shadow-lg transition-all duration-300",
            toast.variant === "destructive"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          )}
        >
          <div className="flex-1">
            <div className="font-semibold">{toast.title}</div>
            <div className="text-sm">{toast.description}</div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 text-white hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
