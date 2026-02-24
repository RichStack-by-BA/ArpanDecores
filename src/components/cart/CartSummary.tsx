"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "../ui/Button";
import { applyOffer, createOrder, verifyPayment } from "@/lib/api/order";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pushToast } from "@/store/slices/toastSlice";
import { makeId } from "@/lib/utils";
import { openLoginModal } from "@/store/slices/UISlice";

interface CartSummaryProps {
  subtotal: number;
  productIds: string[];
  items: any[]; // You can replace 'any' with your actual item type
}

export function CartSummary({ subtotal, productIds, items }: CartSummaryProps) {
  const dispatch = useAppDispatch();

  const [coupon, setCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedOfferId, setAppliedOfferId] = useState<string | null>(null);

  const {token} = useAppSelector((state) => state.auth);

  const shipping = subtotal >= 1999 ? 0 : 149;

  const total = useMemo(() => {
    return Math.max(subtotal + shipping - discount, 0);
  }, [subtotal, shipping, discount]);

  const showToast = useCallback(
    (variant: "success" | "error", title: string, message: string) => {
      dispatch(
        pushToast({
          id: makeId(),
          variant,
          title,
          message,
        })
      );
    },
    [dispatch]
  );

  const applyCoupon = useCallback(async () => {
    if (!coupon.trim() || couponLoading) return;

    try {
      setCouponLoading(true);

      const res = await applyOffer({
        offerCode: coupon.trim(),
        cartTotal: subtotal,
        productIds,
      });

      if (!res.ok) {
        throw new Error(res.error.message);
      }

      const { discountAmount, offerId } = res.data;

      setDiscount(discountAmount);
      setAppliedOfferId(offerId);

      showToast("success", "Coupon Applied", `You saved ₹${discountAmount}`);
    } catch (err: any) {
      setDiscount(0);
      setAppliedOfferId(null);
      showToast("error", "Coupon Failed", err.message || "Invalid coupon");
    } finally {
      setCouponLoading(false);
    }
  }, [coupon, subtotal, productIds, couponLoading, showToast]);

  const convertedItems = items.map(item => ({
    productId: item.product._id,
    quantity: item.quantity,
    price: item.priceAtAddTime
  }));


  const handleCreateOrder = useCallback(async () => {

    if(!token) {
      dispatch(openLoginModal())
      return;
    }
    if (!productIds.length || checkoutLoading) return;

    try {
      setCheckoutLoading(true);

      const orderRes = await createOrder({
        couponCode: coupon,
        cartItems: convertedItems
      });

      if (!orderRes.ok) {
        throw new Error(orderRes.error.message);
      }

      const { orderId } = orderRes.data;

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ,
        amount: total * 100, 
        currency: "INR",
        name: "Arpan Decores",
        order_id: orderId,

        handler: async function (response: any) {
          const verifyRes = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          console.log("Payment verification response:", verifyRes);

          if (!verifyRes.ok) {
            showToast("error", "Payment Failed", verifyRes.error.message);
            return;
          }
          showToast("success", "Payment Successful", "Order confirmed 🎉");
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch (err: any) {
      showToast("error", "Checkout Failed", err.message);
    } finally {
      setCheckoutLoading(false);
    }
  }, [productIds, total, appliedOfferId, checkoutLoading, showToast]);


  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <Row label="Subtotal" value={`₹${subtotal.toLocaleString()}`} />
        <Row
          label="Shipping"
          value={shipping === 0 ? "Free" : `₹${shipping}`}
        />

        {discount > 0 && (
          <Row
            label="Discount"
            value={`-₹${discount.toLocaleString()}`}
            className="text-green-600"
          />
        )}

        <hr className="my-3" />

        <Row
          label="Total"
          value={`₹${total.toLocaleString()}`}
          className="font-semibold text-base"
        />
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
            disabled={!coupon || couponLoading}
          >
            {couponLoading ? "Applying..." : "Apply"}
          </Button>
        </div>
      </div>

      <Button
        onClick={handleCreateOrder}
        disabled={!productIds.length || checkoutLoading}
        className="w-full"
      >
        {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
      </Button>
    </div>
  );
}

function Row({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-between text-sm ${className}`}>
      <span className="text-gray-600">{label}</span>
      <span>{value}</span>
    </div>
  );
}