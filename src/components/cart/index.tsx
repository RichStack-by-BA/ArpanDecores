"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  removeFromCartById,
  getAllCart,
  updateCartItemById,
} from "@/lib/api/cart";
import { pushToast } from "@/store/slices/toastSlice";
import { setCart } from "@/store/slices/cartSlice";
import { makeId } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { CartEmpty } from "./CartEmpty";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import CartSkeleton from "../skeleton/cartSkeleton";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

export default function CartPage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((state: any) => state.auth.token);

  const {
    cart,
    cartItems,
    addItem,
    updateQuantity: updateLocalQuantity,
    removeItem: removeLocalItem,
    isLoading: localLoading,
  } = useCart();

  // --- Server cart (only if logged in) ---
  const {
    data: serverCartData,
    isLoading: serverLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
    enabled: !!token, 
    select: (data: any) => data?.data?.carts ?? { items: [] },
  });

  // --- Mutations ---
  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      if (token) {
        const res = await removeFromCartById(id);
        if (!res.ok) throw new Error(res.error?.message || "Failed to remove item");
        return res.data;
      } else {
        removeLocalItem(id);
        return { cart: null };
      }
    },
    onSuccess: () => {
      if (token) queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) =>
      dispatch(
        pushToast({
          id: makeId(),
          variant: "error",
          title: "Error",
          message: err.message || "Failed to remove item",
        })
      ),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (token) {
        const res = await updateCartItemById(id, { quantity });
        if (!res.ok) throw new Error(res.error?.message || "Failed to update quantity");
        return res.data;
      } else {
        updateLocalQuantity(id, quantity);
        return { cart: null };
      }
    },
    onSuccess: () => {
      if (token) queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) =>
      dispatch(
        pushToast({
          id: makeId(),
          variant: "error",
          title: "Error",
          message: err.message || "Failed to update quantity",
        })
      ),
  });

  // --- Unified cart source (local or server) ---
  const items = useMemo(() => {
    if (token) {
      return serverCartData?.items || [];
    }
    return cartItems || [];
  }, [token, serverCartData, cartItems]);

  const isLoading = token ? serverLoading : localLoading;

  // --- Subtotal ---
  const subtotal = items.reduce(
    (total: number, item: any) => total + item.priceAtAddTime * item.quantity,
    0
  );

  // --- Sync Redux state for UI (optional, global) ---
  useEffect(() => {
    dispatch(setCart(items));
  }, [items, dispatch]);

  const data = useAppSelector((state:RootState) => state.cart);

console.log(data, "cartdataCartdata");
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
