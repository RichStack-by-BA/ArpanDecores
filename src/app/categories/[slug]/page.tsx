import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductList from "@/components/categories/ProductList";
import shopContent from "@/constants/shopContent.json";
 import { getCategoryById } from "@/lib/api/category";
import { getProductsByCategory } from "@/lib/api/product";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {

  const result:any = await getProductsByCategory(params.slug); 

  const categoryProducts :any = result.ok ? result.data?.data: null;

  return (
    <div className="container-custom py-8 md:py-12">
      <Breadcrumbs />

      <div className="text-center mb-12">
        <h1 className="heading-lg mb-4">{categoryProducts.category?.name}</h1>
        <p className="body-md text-muted-foreground max-w-2xl mx-auto">{categoryProducts.category?.description}</p>
      </div>

          <ProductList products={categoryProducts.products} />
    </div>
  );
}
