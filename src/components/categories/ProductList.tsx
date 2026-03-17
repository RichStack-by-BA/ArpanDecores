import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import ProductsGrid from "../shop/ProductsGrid";

type ProductListProps = {
    products: any[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="heading-sm mb-4">No products found</h3>
                <p className="text-muted-foreground mb-6">We're working on adding products to this category.</p>
                <Link href="/shop">
                    <button className="btn-primary">Browse All Products</button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <p className="text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{products.length}</span> products
                </p>
            </div>
            <ProductsGrid products={products} viewMode="grid" />
        </>
    );
};

export default ProductList;
