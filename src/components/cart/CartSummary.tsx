"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { applyOffer } from "@/lib/api/order";
import { useAppDispatch } from "@/store/hooks";
import { pushToast } from "@/store/slices/toastSlice";
import { makeId } from "@/lib/utils";

export function CartSummary({
  subtotal,
  productIds,
}: {
  subtotal: number;
  productIds: string[];
}) {
  const dispatch = useAppDispatch();

  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedOfferId, setAppliedOfferId] = useState<string | null>(null);

  const shipping = subtotal >= 1999 ? 0 : 149;

  const total = useMemo(() => {
    return subtotal + shipping - discount;
  }, [subtotal, shipping, discount]);

  const applyCoupon = async () => {
    if (!coupon.trim()) return;

    try {
      setLoading(true);

      const res:any = await applyOffer({
        offerCode: coupon.trim(),
        cartTotal: subtotal,
        productIds,
      });

      if ( !res.ok) {
        throw new Error(res.error.message);
      }

      setDiscount(res.data.offer.discountAmount);
      setAppliedOfferId(res.data.offer.offerId);

      dispatch(
        pushToast({
          id: makeId(),
          variant: "success",
          title: "Coupon Applied",
          message: `You saved ₹${res.data.offer.discountAmount}`,
        })
      );
    } catch (err: any) {
      dispatch(
        pushToast({
          id: makeId(),
          variant: "error",
          title: "Error",
          message: err.message || "Failed to apply coupon",
        })
      );
    } finally {
      setLoading(false);
    }
  };

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

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toLocaleString()}</span>
          </div>
        )}

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
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            onClick={applyCoupon}
            disabled={!coupon || loading}
          >
            {loading ? "Applying..." : "Apply"}
          </Button>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="w-full">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}