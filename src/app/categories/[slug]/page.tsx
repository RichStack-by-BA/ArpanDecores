import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductList from "@/components/categories/ProductList";
import shopContent from "@/constants/shopContent.json";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = shopContent.categories.find((cat) => cat.id === params.slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = shopContent.allProducts.filter((product) => {
    const productCategory = product.category.toLowerCase().replace(" ", "-");
    return (
      productCategory === params.slug ||
      (params.slug === "festive" && productCategory === "festive-decor") ||
      (params.slug === "wedding" && (productCategory === "wedding-gifts" || productCategory === "wedding-decor"))
    );
  });

  return (
    <div className="container-custom py-8 md:py-12">
      {/* <Breadcrumbs categoryName={category.name} /> */}

      <div className="text-center mb-12">
        <h1 className="heading-lg mb-4">{category.name}</h1>
        <p className="body-md text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
      </div>

          <ProductList products={categoryProducts} />
    </div>
  );
}
