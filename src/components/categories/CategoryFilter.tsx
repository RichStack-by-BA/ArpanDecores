import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
type CategoryFiltersProps = {
    categories: any[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={cn("rounded-full", selectedCategory === category ? "bg-primary text-primary-foreground" : "")}
                    onClick={() => onCategoryChange(category)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    )
}

export default CategoryFilters
