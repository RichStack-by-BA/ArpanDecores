import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartItem({ item, updateQuantity, removeFromCart }: any) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
        <Image src={item.product.image || "/placeholder.svg"} alt={item.product.name} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <Link href={`/product/${item.slug}`}>
            <h3 className="font-medium text-lg truncate hover:text-blue-600 transition-colors">
              {item.product.name}
            </h3>
          </Link>
          <span className="font-semibold">₹{item.priceAtAddTime.toLocaleString()}</span>
        </div>

        {item?.customization && (
          <p className="text-sm text-gray-500 mt-1">Customization: {item?.customization}</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-full">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="h-8 w-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-gray-500 hover:text-red-500 flex items-center gap-1 text-sm"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
