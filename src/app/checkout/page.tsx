'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { pushToast } from '@/store/slices/toastSlice'
import { makeId } from '@/lib/utils'
import { createOrder } from '@/lib/api/order'
import { usePayment } from '@/hooks/usePayment'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllCart } from '@/lib/api/cart'
import { getAllAddresses, updateAddress } from '@/lib/api/address'
import { AddressModal } from '@/components/address/AddressModal'
import Link from 'next/link'


export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const token = useSelector((state: any) => state.auth.token)

  // ─── Cart ─────────────────────────────────────────────
  const { data: serverCartData }: any = useQuery({
    queryKey: ['cart'],
    queryFn: getAllCart,
    enabled: !!token,
    select: (res: any) => (res.ok ? res.data?.carts : { items: [] }),
  })

  // ─── Addresses ────────────────────────────────────────
  const {
    data: addresses = [],
    isLoading: addressLoading,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAllAddresses,
    enabled: !!token,
    select: (res: any) => (res.ok ? res.data?.data?.addresses : []),
  })

  const [selectedAddress, setSelectedAddress] = useState<any>({})

  // ─── Auto select default address ─────────────────────
  useEffect(() => {
    if (!addresses.length) return

    const defaultAddress =
      addresses.find((a: any) => a.isDefault) || addresses[0]

    setSelectedAddress(defaultAddress)
  }, [addresses])

  // ─── Payment Hook ────────────────────────────────────
  const { startPayment, loading: paymentLoading } = usePayment()

  // ─── Toast ───────────────────────────────────────────
  const showToast = useCallback(
    (variant: 'success' | 'error', title: string, message: string) => {
      dispatch(pushToast({ id: makeId(), variant, title, message }))
    },
    [dispatch]
  )

  // ─── Calculations ─────────────────────────────────────
  const subTotal = serverCartData?.subTotal ?? 0
  const shipping = serverCartData?.shipping ?? 0
  const discount = serverCartData?.discountAmount ?? 0

  const total =
    serverCartData?.total ??
    subTotal + shipping - discount

  // ─── Payment Handler ─────────────────────────────────
  const handlePayment = async () => {
    if (!selectedAddress) {
      showToast('error', 'No Address', 'Please select address')
      return
    }

    if (!serverCartData?.items?.length) {
      showToast('error', 'Empty Cart', 'Cart is empty')
      return
    }

    try {
      const cartItems = serverCartData.items.map((item: any) => ({
        productId: item.productId,
        variantId: item.variantId || '',
        quantity: item.quantity,
        price: item.priceAtAddTime,
      }))

      const orderRes: any = await createOrder({
        couponCode: serverCartData.couponCode || '',
        cartItems,
        shippingAddress: selectedAddress, // ✅ IMPORTANT
      })

      if (!orderRes.ok) {
        throw new Error(orderRes.error?.message)
      }

      const { orderId, amount } =
        orderRes.data?.data || orderRes.data || {}

      await startPayment({
        orderId,
        amount,

        onSuccess: () => {
          showToast('success', 'Payment Success', 'Order placed 🎉')
          router.push(`/payment-success?orderId=${orderId}`)
        },

        onError: (msg) => {
          showToast('error', 'Payment Failed', msg)
          router.push('/payment-failure')
        },

        onCancel: () => {
          // ✅ NO redirect
          showToast('error', 'Payment Cancelled', 'You closed the payment window')
        },
      })
    } catch (err: any) {
      showToast('error', 'Checkout Failed', err.message)
    }
  }

  const queryClient = useQueryClient();
  const handleSetDefault = async (id: string) => {
    try {
      const res = await updateAddress(id, { isDefault: true })

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["addresses"] })
      } else {
        console.error(res.error.message)
      }
    } catch (err) {
      console.error("Set default failed:", err)
    }
  }

  // ─── UI ──────────────────────────────────────────────
  return (
    <div className="container-custom py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">

          {/* ─── Address Section ───────────────────── */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Delivery Address</h2>

            {addressLoading ? (
              <p className="text-sm text-gray-500">Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <div className="text-center space-y-3">
                <p className="text-gray-500">No address found</p>
                <Button onClick={() => setIsOpen(true)}>
                  Add Address
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.slice(0, 3)?.map((addr: any) => (
                  <div
                    onClick={() => handleSetDefault(addr._id)}
                    key={addr._id}
                    className={`border rounded-lg p-4  hover:border-gray-200 hover:bg-primary/5 hover:border-primary cursor-pointer transition ${selectedAddress._id === addr._id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{addr.name}</p>

                      {addr.isDefault && (
                        <span className="text-xs text-primary">Default</span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500">{addr.phone}</p>

                    <p className="text-sm text-gray-600">
                      {addr.addressLine1}, {addr.city}, {addr.state} {addr.postalCode}
                    </p>
                  </div>
                ))}
                <div className='flex justify-end'>
                  <Link href={'/addresses'} className='text-sm font-medium text-primary '>Show more</Link>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(true)}
                >
                  + Add New Address
                </Button>
              </div>
            )}
          </Card>

          {/* ─── Payment Section ───────────────────── */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Payment</h2>

            <Button
              onClick={handlePayment}
              disabled={paymentLoading || !selectedAddress}
              className="w-full"
            >
              {paymentLoading
                ? 'Processing...'
                : `Pay ₹${total.toLocaleString()}`}
            </Button>
          </Card>
        </div>

        {/* RIGHT */}
        <div>
          <Card className="p-6 sticky top-6">
            <h3 className="font-semibold text-base mb-4">Order Summary</h3>

            {/* Items */}
            <div className="space-y-2 mb-4">
              {serverCartData?.items?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[70%] capitalize">
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            {/* Pricing */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₹{subTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <hr className="my-4" />

            {/* Total */}
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {discount > 0 && (
              <p className="text-xs text-green-600 mt-2">
                You saved ₹{discount.toLocaleString()} 🎉
              </p>
            )}
          </Card>
        </div>
      </div>
      <AddressModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}