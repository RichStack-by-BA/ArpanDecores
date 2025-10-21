import CartPage from '@/components/cart'
import { getAllCart } from '@/lib/api/cart'
import React from 'react'

const page = async() => {
    const cartData:any = await getAllCart()
    const cartItems = cartData?.ok ? cartData?.data?.carts : null
    console.log(cartData,"cartData")
  return (
    <CartPage cartItems={cartItems}/>
  )
}

export default page