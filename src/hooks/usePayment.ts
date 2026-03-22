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
    onFinally,
  }: {
    orderId: string
    amount: number
    onSuccess?: () => void
    onError?: (msg: string) => void
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
          onError?.(err?.description || 'Payment failed')
        },

        onDismiss: () => {
          onError?.('Payment cancelled')
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