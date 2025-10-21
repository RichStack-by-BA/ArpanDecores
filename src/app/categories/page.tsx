
import CategoryCard from "@/components/categories/CategoryCard"; // Import the CategoryCard
import Breadcrumbs from "@/components/ui/Breadcrumbs"; // Import the Breadcrumbs
import shopContent from "@/constants/shopContent.json";
import { useGetCategories } from "@/hooks/useCategory";
import { getAllCategories } from "@/lib/api/category";

export default async function CategoriesPage() {

     const categoriesResult = await getAllCategories(); 
     const categoriesData: any = categoriesResult.ok ? categoriesResult.data : [];
    
    return (
        <div className="container-custom py-8 md:py-12">
            {/* Breadcrumbs */}
            <Breadcrumbs items={shopContent.breadcrumbs} />

            <div className="text-center mb-12">
                <h1 className="heading-lg mb-4">Shop by Category</h1>
                <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                    Explore our curated collections designed for every special occasion and space
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {categoriesData?.categories.map((category:any) => (
                    category.status &&
                    <CategoryCard
                        key={category._id}
                        slug={category.slug}
                        name={category.name}
                        description={category.description}
                        image={category.image}
                    />
                ))}
            </div>
        </div>
    );
}
