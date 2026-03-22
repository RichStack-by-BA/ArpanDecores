"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "../ui/Button";
import { applyOffer, createOrder, verifyPayment } from "@/lib/api/order";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pushToast } from "@/store/slices/toastSlice";
import { makeId } from "@/lib/utils";
import { openLoginModal } from "@/store/slices/UISlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  productIds: string[];
  items: any[];
  discount: number;
  couponCode: string | null;
}

export function CartSummary({ subtotal, productIds, items ,discount, couponCode}: CartSummaryProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [coupon, setCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(discount || 0);
  const [appliedOfferId, setAppliedOfferId] = useState<string | null>(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(discount > 0 ? couponCode : null);

  const { token } = useAppSelector((state) => state.auth);

  const shipping = subtotal >=999 ? 0 : 149;

  const total = useMemo(() => {
    return Math.max(subtotal + shipping - discountAmount, 0);
  }, [subtotal, shipping, discountAmount]);



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

      const { discountAmount, offerId } = res.data || {};
      console.log("Apply offer response:", res.data);

      setDiscountAmount(discountAmount);
      setAppliedOfferId(offerId);
      setAppliedCouponCode(coupon.trim());

      showToast("success", "Coupon Applied", `You saved ₹${discountAmount}`);
    } catch (err: any) {
      setDiscountAmount(0);
      setAppliedOfferId(null);
      setAppliedCouponCode(null);
      showToast("error", "Coupon Failed", err.message || "Invalid coupon");
    } finally {
      setCouponLoading(false);
    }
  }, [coupon, subtotal, productIds, couponLoading, showToast]);

  // Remove coupon — only calls backend if a coupon was actually applied
  const removeCoupon = useCallback(async () => {
    if (!appliedCouponCode) return;

    try {
      // Send couponCode: null to backend to signal removal
      await applyOffer({
        offerCode: null,
        cartTotal: subtotal,
        productIds,
      });
    } catch {
      // Silently ignore backend errors on removal — reset UI regardless
    } finally {
      setDiscountAmount(0);
      setAppliedOfferId(null);
      setAppliedCouponCode(null);
      setCoupon("");
      showToast("success", "Coupon Removed", "Coupon has been removed from your order");
    }
  }, [appliedCouponCode, subtotal, productIds, showToast]);

  // // Moved inside callback to avoid stale closure
  // const handleCreateOrder = useCallback(async () => {
  //   if (!token) {
  //     dispatch(openLoginModal());
  //     return;
  //   }

  //   if (!productIds.length || checkoutLoading) return;

  //   // Build convertedItems fresh inside callback to avoid stale reference
  //   const freshConvertedItems = items.map((item) => ({
  //     productId: item.productId,
  //     variantId: item.variantId,
  //     quantity: item.quantity,
  //     price: item.priceAtAddTime,
  //   }));

  //   try {
  //     setCheckoutLoading(true);

  //     const orderRes: any = await createOrder({
  //       couponCode: appliedCouponCode || "",
  //       cartItems: freshConvertedItems,
  //     });

  //     if (!orderRes.ok) {
  //       throw new Error(orderRes.error.message);
  //     }

  //     const { orderId, amount } = orderRes.data?.data;

  //     if (!orderId || !amount) {
  //       throw new Error("Invalid order response from server");
  //     }

  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SJaCO0Peb1B2rG",
  //       amount,
  //       currency: "INR",
  //       name: "Arpan Decores",
  //       order_id: orderId,
  //       prefill: {
  //         name: "Customer",
  //         email: "customer@email.com",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },

  //       handler: async function (response: any) {
  //         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //           response;

  //         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
  //           showToast(
  //             "error",
  //             "Payment Error",
  //             "Incomplete payment response from Razorpay"
  //           );
  //           return;
  //         }

  //         const verifyRes = await verifyPayment({
  //           razorpay_order_id,
  //           razorpay_payment_id,
  //           razorpay_signature,
  //         });

  //         if (!verifyRes.ok) {
  //           showToast("error", "Payment Failed", verifyRes.error.message);
  //           router.push(`/payment-failure`);
  //           return;
  //         }

  //         router.push(`/payment-success?orderId=${orderId}`);
  //         showToast("success", "Payment Successful", "Order confirmed 🎉");
  //       },

  //       modal: {
  //         ondismiss: () => {
  //           showToast("error", "Payment Cancelled", "You closed the payment window");
  //           setCheckoutLoading(false);
  //         },
  //       },
  //     };

  //     const razorpay = new (window as any).Razorpay(options);

  //     razorpay.on("payment.failed", (response: any) => {
  //       console.error("Payment failed:", response.error);
  //       showToast(
  //         "error",
  //         "Payment Failed",
  //         response.error?.description || "Something went wrong"
  //       );
  //     });

  //     razorpay.open();
  //   } catch (err: any) {
  //     showToast("error", "Checkout Failed", err.message);
  //   } finally {
  //     setCheckoutLoading(false);
  //   }
  // }, [
  //   token,
  //   productIds,
  //   items,
  //   appliedCouponCode,
  //   checkoutLoading,
  //   showToast,
  //   dispatch,
  //   router,
  // ]);

  const isCouponApplied = !!appliedCouponCode;

  console.log({ subtotal, shipping, discount, total });

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <Row label="Subtotal" value={`₹${subtotal.toLocaleString()}`} />
        <Row
          label="Shipping"
          value={shipping === 0 ? "Free" : `₹${shipping}`}
        />

        {discountAmount > 0 && (
          <Row
            label="Discount"
            value={`-₹${discountAmount?.toLocaleString()}`}
            className="text-green-600"
          />
        )}

        <hr className="my-3" />

        <Row
          label="Total"
          value={`₹${total?.toLocaleString()}`}
          className="font-semibold text-base"
        />
      </div>

      {/* Coupon Section */}
      <div className="space-y-2 mb-6">
        <label htmlFor="coupon" className="text-sm font-medium">
          Coupon Code
        </label>

        {isCouponApplied ? (
          // ── Applied state ──────────────────────────────────────────
          <div className="flex items-center justify-between rounded-md border border-green-300 bg-green-50 px-3 py-2">
            <div className="flex items-center gap-2">
              {/* Green check icon */}
              <svg
                className="h-4 w-4 shrink-0 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-green-700">
                  {appliedCouponCode}
                </p>
                <p className="text-xs text-green-600">
                  Coupon applied — you saved ₹{discount?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={removeCoupon}
              className="ml-2 text-xs font-medium text-red-500 hover:text-red-700 transition-colors shrink-0"
              aria-label="Remove coupon"
            >
              Remove
            </button>
          </div>
        ) : (
          // ── Input state ────────────────────────────────────────────
          <div className="flex gap-2">
            <input
              id="coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Button onClick={applyCoupon} disabled={!coupon.trim() || couponLoading}>
              {couponLoading ? "Applying..." : "Apply"}
            </Button>
          </div>
        )}
      </div>

      <Link href="/checkout">
      <Button
        // onClick={handleCreateOrder}
        disabled={!productIds.length || checkoutLoading}
        className="w-full"
      >
        {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
      </Button>
      </Link>
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