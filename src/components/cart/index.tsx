"use client";

import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  removeFromCartById,
  getAllCart,
  updateCartItemById,
} from "@/lib/api/cart";
import { pushToast } from "@/store/slices/toastSlice";
import { makeId } from "@/lib/utils";
import { localCart } from "@/lib/local-cart";
import { CartEmpty } from "./CartEmpty";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import CartSkeleton from "../skeleton/cartSkeleton";

export default function CartPage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((state: any) => state.auth.token);

  // Local cart state (hydrated once)
  const [localItems, setLocalItems] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      setLocalItems(localCart.getCart());
    }
  }, [token]);

  // ------------------ Server Cart ------------------
  const {
    data: serverCartData,
    isLoading: serverLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
    enabled: !!token,
    select: (data: any) => data?.data?.carts ?? { items: [] },
  });

  // ------------------ Remove Item ------------------
  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      if (token) {
        const res = await removeFromCartById(id);
        if (!res.ok) throw new Error(res.error?.message || "Failed to remove");
        return res.data;
      } else {
        localCart.removeItem(id);
        setLocalItems(localCart.getCart());
        return null;
      }
    },
    onSuccess: () => token && queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: (err: any) =>
      dispatch(
        pushToast({
          id: makeId(),
          variant: "error",
          title: "Error",
          message: err.message,
        })
      ),
  });

  // ------------------ Update Quantity ------------------
  const updateMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (token) {
        const res = await updateCartItemById(id, { quantity });
        if (!res.ok) throw new Error(res.error?.message || "Failed to update quantity");
        return res.data;
      } else {
        console.log("Updating local cart item:", { id, quantity });
        localCart.updateQuantity(id, quantity);
        setLocalItems(localCart.getCart()); // sync state with storage
        return null;
      }
    },
    onSuccess: () => token && queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: (err: any) =>
      dispatch(
        pushToast({
          id: makeId(),
          variant: "error",
          title: "Error",
          message: err.message,
        })
      ),
  });

  // ------------------ Unified Items ------------------
  const items = useMemo(() => {
    return token ? serverCartData?.items || [] : localItems || [];
  }, [token, serverCartData, localItems]);

  const isLoading = token ? serverLoading : false;

  // ------------------ Subtotal ------------------
  const subtotal = items.reduce(
    (total: number, item: any) => total + item.priceAtAddTime * item.quantity,
    0
  );

  return (
    <div className="mx-auto container-custom py-10">
      <h1 className="text-3xl font-playfair font-bold mb-8">Your Shopping Cart</h1>

      {isLoading ? (
        <CartSkeleton />
      ) : items.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CartList
              items={items}
              removeFromCart={(id: string) => removeMutation.mutate(id)}
              updateQuantity={(id: string, qty: number) =>
                updateMutation.mutate({ id, quantity: qty })
              }
            />
          </div>

          <CartSummary subtotal={subtotal} />
        </div>
      )}
    </div>
  );
}
