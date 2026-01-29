import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function CartEmpty() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
      <p className="text-gray-500 mb-8">Looks like you haven’t added any items to your cart yet.</p>
      <Link href="/shop" className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
        Continue Shopping
      </Link>
    </div>
  )
}
