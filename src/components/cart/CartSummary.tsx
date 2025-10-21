"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../ui/Button"

export function CartSummary({ subtotal }: { subtotal: number }) {
  const [coupon, setCoupon] = useState("")
  const [loading, setLoading] = useState(false)

  const shipping = subtotal >= 1999 ? 0 : 149
  const total = subtotal + shipping

  const applyCoupon = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setCoupon("")
      alert("Invalid coupon code!")
    }, 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <label htmlFor="coupon" className="text-sm font-medium">
          Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={applyCoupon}
            disabled={!coupon || loading}
            className=""
          >
            {loading ? "Applying..." : "Apply"}
          </Button>
        </div>
      </div>

      <Link href="/checkout">
        <Button  className="w-full">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  )
}
