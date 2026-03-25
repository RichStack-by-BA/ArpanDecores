"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useAddToCart } from "@/hooks/useAddToCart"

interface AddToCartButtonProps {
  product: any
  selectedVariant?: any // 👈 add this
  quantity?: number
  customization?: string
  isDisabled?: boolean
}

export default function AddToCartButton({ 
  isDisabled = false,
  product, 
  selectedVariant,
  quantity = 1, 
  customization, 
}: AddToCartButtonProps) {
  const { addToCart, isPending } = useAddToCart()

  console.log(selectedVariant, "selected variant in AddToCartButton")
 const handleAddToCart = () => {
  const isVariantProduct = product.isVariant && selectedVariant;

  const cartItem = {
    productId: product._id,

    ...(isVariantProduct && { variantId: selectedVariant.variantId }),

    product: {
      _id: product._id,
      name: product.name,
      slug: product.slug,

      image: isVariantProduct
        ? selectedVariant.images?.[0]
        : product.images?.[0],

      ...(isVariantProduct && {
        variantName: selectedVariant.name,
      }),
    },

    quantity,

    priceAtAddTime: product.discountPrice || product.price,

    ...(customization && { customization }),
  };

  addToCart(cartItem);
};



  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending || isDisabled || selectedVariant.stock===0}
    >
      <ShoppingBag className="h-4 w-4 mr-2" />
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  )
}