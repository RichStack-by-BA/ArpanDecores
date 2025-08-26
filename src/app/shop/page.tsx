"use client";

import { useMemo, useState } from "react";
import shopContent from "@/constants/shopContent.json";
import type { SortOption, ViewMode, ShopFilters } from "@/types/products";
import { filterProducts, sortProducts } from "@/lib/shop-utils";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductFilters from "@/components/shop/ProductFilters";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ProductsGrid from "@/components/shop/ProductsGrid";
import { Button } from "@/components/ui/Button";

export default function ShopPage() {
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const [filters, setFilters] = useState<ShopFilters>({
        ...shopContent.defaultFilters, // expects: { categories: string[], priceRange: [number, number], occasions: string[], customizable: boolean }
        priceRange: [
            shopContent.defaultFilters.priceRange?.[0] ?? 0,
            shopContent.defaultFilters.priceRange?.[1] ?? 10000,
        ] as [number, number],
    });

    const filteredAndSortedProducts = useMemo(() => {
        const filtered = filterProducts(shopContent.allProducts, filters);
        return sortProducts(filtered, sortBy);
    }, [filters, sortBy]);

    return (
        <div className="container-custom py-8 md:py-12">
            <Breadcrumbs items={shopContent.breadcrumbs} />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters - Desktop */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <ProductFilters
                        options={{
                            categories: shopContent.categories,          
                            occasions: shopContent.occasions ?? [],      
                        }}
                        filters={filters}                              
                        onFiltersChange={setFilters}
                    />
                </div>

                {/* Products */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                        <div>
                            <h1 className="heading-lg mb-2">{shopContent.title}</h1>
                            <p className="text-muted-foreground">
                                Showing{" "}
                                <span className="font-medium text-foreground">
                                    {filteredAndSortedProducts.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium text-foreground">
                                    {shopContent.allProducts.length}
                                </span>{" "}
                                products
                            </p>
                            {shopContent.subtitle && (
                                <p className="text-muted-foreground mt-1">{shopContent.subtitle}</p>
                            )}
                        </div>

                        <ShopToolbar
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            filters={filters}
                            setFilters={setFilters}
                            sortOptions={shopContent.sortOptions as any}
                        />
                    </div>

                    {/* Products Grid / Empty State */}
                    {filteredAndSortedProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="heading-sm mb-4">No products found</h3>
                            <p className="text-muted-foreground mb-6">
                                Try adjusting your filters to see more products.
                            </p>
                            <Button onClick={() => setFilters(shopContent.defaultFilters as unknown as ShopFilters)}>
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <ProductsGrid products={filteredAndSortedProducts as any} viewMode={viewMode} />
                    )}
                </div>
            </div>
        </div>
    );
}
