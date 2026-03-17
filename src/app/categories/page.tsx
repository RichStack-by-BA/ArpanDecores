
import CategoriesWithPagination from "@/components/categories/CategoryList";
import Breadcrumbs from "@/components/ui/Breadcrumbs"; 
import { getAllCategories } from "@/lib/api/category";

export default async function CategoriesPage() {

     const categoriesResult = await getAllCategories(); 
     const categoriesData: any = categoriesResult.ok ? categoriesResult.data : [];

    return (
        <div className="container-custom py-8 md:py-12">
            <Breadcrumbs  />

            <div className="text-center mb-12">
                <h1 className="heading-lg mb-4">Shop by Category</h1>
                <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                    Explore our curated collections designed for every special occasion and space
                </p>
            </div>

           <CategoriesWithPagination categories={categoriesData?.data?.categories || []} />
        </div>
    );
}
