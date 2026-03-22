interface RazorpayOptions {
  amount: number
  orderId: string
  name?: string
  onSuccess: (data: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }) => void
  onFailure?: (error: any) => void
  onDismiss?: () => void
}

export function openRazorpay({
  amount,
  orderId,
  name = 'Your Brand',
  onSuccess,
  onFailure,
  onDismiss,
}: RazorpayOptions) {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_SJaCO0Peb1B2rG', 
    amount,
    currency: 'INR',
    name,
    order_id: orderId,

    handler: function (response: any) {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = response

      onSuccess({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      })
    },

    modal: {
      ondismiss: onDismiss,
    },
  }

  const razorpay = new (window as any).Razorpay(options)

  razorpay.on('payment.failed', function (response: any) {
    onFailure?.(response.error)
  })

  razorpay.open()
}