import { useState } from 'react'
import { openRazorpay } from '@/lib/payment/razorpay'
import { verifyPayment } from '@/lib/api/order'

export function usePayment() {
  const [loading, setLoading] = useState(false)

  const startPayment = async ({
    orderId,
    amount,
    onSuccess,
    onError,
    onCancel, // ✅ NEW
    onFinally,
  }: {
    orderId: string
    amount: number
    onSuccess?: () => void
    onError?: (msg: string) => void
    onCancel?: () => void // ✅ NEW
    onFinally?: () => void
  }) => {
    try {
      setLoading(true)

      openRazorpay({
        orderId,
        amount,      
        onSuccess: async (res) => {
          const verifyRes = await verifyPayment(res)

          if (!verifyRes.ok) {
            onError?.(verifyRes.error?.message || 'Verification failed')
            return
          }

          onSuccess?.()
        },

        onFailure: (err) => {
          // ✅ Real payment failure
          onError?.(err?.description || 'Payment failed')
        },

        onDismiss: () => {
          // ✅ User closed popup
          onCancel?.()
        },
      })
    } catch (err: any) {
      onError?.(err.message)
    } finally {
      setLoading(false)
      onFinally?.()
    }
  }

  return { startPayment, loading }
}