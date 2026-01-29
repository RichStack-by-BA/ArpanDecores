
import RelatedProducts from "@/components/product/RelatedProduct"
import { getProductById } from "@/lib/api/product"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import ReviewsList from "@/components/review/ReviewList"
import ProductDetails from "@/components/product/ProductPage"

interface ProductPageProps {
  params: {
    slug: string
  }
}


export default async function ProductPage({ params }: any) {

  const result: any = await getProductById(await params.slug);
  const { product }: any = result.ok ? result.data?.data : null;



  return (
    <div className="container-custom py-8 md:py-12">
      <Breadcrumbs />
      <ProductDetails product={product} />


      <div className="mt-12">
        <ReviewsList productId={product._id} />
      </div>

      <RelatedProducts currentProductId={product._id} />
    </div>

  )
}
