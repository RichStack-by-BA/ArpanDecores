"use client"

import { Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Select } from "@/components/ui/Select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet"
import ProductFilters from "@/components/shop/ProductFilters"
import type { SortOption, ViewMode, ShopFilters } from "@/types/products"

type Props = {
    sortBy: SortOption
    setSortBy: (v: SortOption) => void
    viewMode: ViewMode
    setViewMode: (v: ViewMode) => void
    filters: ShopFilters
    setFilters: (v: ShopFilters) => void
    sortOptions: { value: SortOption; label: string }[]
}

export default function ShopToolbar({
    sortBy, setSortBy,
    viewMode, setViewMode,
    filters, setFilters,
    sortOptions
}: Props) {
    return (
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {/* Mobile Filters */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <ProductFilters options={{ categories: [], occasions: [] }} filters={filters} onFiltersChange={setFilters} />
                    </div>
                </SheetContent>
            </Sheet>

            <Select
            className="w-48"
                options={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value as SortOption)}
                placeholder="Sort by"
            />
            {/* View Mode */}
            <div className="hidden sm:flex border rounded-md">
                <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                >
                    <Grid className="h-4 w-4" />
                </Button>
                <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                >
                    <List className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
