import CategoryCard from "@/components/categories/CategoryCard"; // Import the CategoryCard
import Breadcrumbs from "@/components/ui/Breadcrumbs"; // Import the Breadcrumbs
import shopContent from "@/constants/shopContent.json";

export default function CategoriesPage() {

    // useEffect(() => {
    //     // Replace this with dynamic data fetching if needed
    //     setCategories(categoriesData);
    // }, []);

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
                {shopContent.categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        description={category.description}
                        image={category.image}
                    />
                ))}
            </div>
        </div>
    );
}
