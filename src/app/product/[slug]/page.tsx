import { Star, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import AddToCartButton from "@/components/shop/AddToCard"
import ProductImageGallery from "@/components/product/ProductImageGallery"
import RelatedProducts from "@/components/product/RelatedProduct"
import { getProductById } from "@/lib/api/product"
import ProductTabs from "@/components/product/ProductTabs"
// import { allProducts } from "@/lib/data"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {

  const result: any = await getProductById(await params.slug);
  const { product }: any = result.ok ? result.data?.data : null;

  //   const product = [].find((p) => p.id === params.id)

  //   if (!product) {
  //     notFound()
  //   }

  //   // Mock product images for gallery
  //   const productImages = [
  //     product.image,
  //     product.image.replace(".png", "-2.png"),
  //     product.image.replace(".png", "-3.png"),
  //     product.image.replace(".png", "-4.png"),
  //   ].filter((img) => img) // Filter out any undefined images

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumbs */}

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images /*/}
        <ProductImageGallery images={product.images} />

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {/* <h1 className="heading-lg mb-2">{product.name}</h1> */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(product.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className={i < 4 ? "h-5 w-5 fill-primary text-primary" : "h-5 w-5 fill-muted text-muted"}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.totalReviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold">₹{product.price.toLocaleString()}</div>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              {product.name.toLowerCase()}
              {product.description}
            </p>

          </div>

          {/* {product.isCustomizable && (
            <div className="space-y-4 border-t border-b py-4">
              <h3 className="font-playfair font-semibold text-lg">Personalization</h3>
              <div className="space-y-2">
                <label htmlFor="customText" className="block text-sm font-medium">
                  Custom Text
                </label>
                <input
                  type="text"
                  id="customText"
                  placeholder="Enter name, date, or message"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          )} */}

          <div className="space-y-4">
            {product.stock > 0 ? <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-600">In Stock</span>
            </div> :
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-red-600">Out Of Stock</span>
              </div>
            }

            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton product={product} />
              <Button variant="outline" className="btn-outline">
                Add to Wishlist
              </Button>
            </div>
          </div>


          <div className="space-y-3 pt-4">
            {product.specifications.map((spec: any, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-sm">{spec.value}</span>
              </div>
            ))}

          </div>
        </div>
      </div>

      <ProductTabs
        product={{
          name: "Handcrafted Wooden Lamp",
          description:
            "Elegant handcrafted lamp made with premium materials. Perfect for your home or office.",
          specifications: [
            { key: "Material", value: "Wood & Metal" },
            { key: "Dimensions", value: '12" x 8" x 2"' },
            { key: "Weight", value: "500g" },
            { key: "Color", value: "Natural Wood Finish" },
            { key: "Origin", value: "Handmade in India" },
          ],
          reviews: [
            {
              rating: 5,
              name: "Satisfied Customer",
              time: "2 weeks ago",
              comment:
                "Absolutely beautiful craftsmanship! Highly recommend this product.",
            },
            {
              rating: 4,
              name: "Aarti Sharma",
              time: "1 month ago",
              comment: "Lovely piece, well made and looks great.",
            },
          ],
        }}
      />


      {/* Related Products */}
      <RelatedProducts currentProductId={product._id} />
    </div>
  )
}
