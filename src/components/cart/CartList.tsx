import { CartItem } from "./CartItem"

export function CartList({ items, updateQuantity, removeFromCart,cartId }: any) {
  return (
    <div className="space-y-6">
      {items.map((item: any) => (
        <CartItem
          key={item._id}
          cartId={cartId}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  )
}
