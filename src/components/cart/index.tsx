"use client"

import { removeFromCartById } from "@/lib/api/cart"
// import { useCart } from "@/components/cart-provider"
// import { CartBreadcrumb } from "./CartBreadcrumb"
import { CartEmpty } from "./CartEmpty"
import { CartList } from "./CartList"
import { CartSummary } from "./CartSummary"
import { useDispatch } from "react-redux"
import { pushToast } from "@/store/slices/toastSlice"
import { makeId } from "@/lib/utils"

export default function CartPage({ cartItems }: any) {

    const dispatch = useDispatch();
    const removeFromCart = async (id: string) => {
        await removeFromCartById(id)
        dispatch(pushToast({ id: makeId(), variant: 'success', title: 'Added to cart', message: `product has been added to your cart.` }));

    }
    const updateQuantity = () => {

    }
    console.log(cartItems, "data")
    const cartItem = cartItems?.items || [];
    const subtotal = cartItem?.reduce((total: number, item: any) => total + item.priceAtAddTime * item.quantity, 0) || 0;
    return (
        <div className=" mx-auto container-custom  py-10">
            {/* <CartBreadcrumb /> */}

            <h1 className="text-3xl font-playfair font-bold mb-8">Your Shopping Cart</h1>

            {cartItem.length === 0 ? (
                <CartEmpty />
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <CartList
                            items={cartItem ||[]}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                        />
                    </div>
                    <CartSummary subtotal={subtotal} />
                </div>
            )}
        </div>
    )
}
