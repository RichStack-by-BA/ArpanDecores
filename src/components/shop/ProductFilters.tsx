import { useState } from "react";
import { Slider } from "@/components/ui/Slider"; // if you're on shadcn default, path is "@/components/ui/slider"
import { Checkbox } from "@/components/ui/Checkbox"; // if default: "@/components/ui/checkbox"
import type { ShopFilters } from "@/types/products";

type CategoryOption = { id: string; name: string };
type OccasionOption = { id: string; name: string };

type Props = {
    options: {
        categories: CategoryOption[];
        occasions: OccasionOption[];
    };
    filters: ShopFilters; // selected filters (IDs + priceRange + customizable)
    onFiltersChange: (filters: ShopFilters) => void;
};

export default function ProductFilters({ options, filters, onFiltersChange }: Props) {
    const [price, setPrice] = useState<[number, number]>(filters.priceRange);

    const toggleId = (arr: string[], id: string, nextChecked: boolean) =>
        nextChecked ? (arr.includes(id) ? arr : [...arr, id]) : arr.filter((x) => x !== id);

    return (
        <div className="space-y-6">
            {/* Categories */}
            <div>
                <h4 className="mb-2 font-semibold">Categories</h4>
                <div className="space-y-1">
                    {options.categories.map((cat) => {
                        const checked = filters.categories.includes(cat.id);
                        return (
                            <label key={cat.id} className="flex cursor-pointer items-center space-x-2">
                                <Checkbox
                                    checked={checked}
                                    onChange={(event) => {
                                        const next = event.target.checked;
                                        const nextCategories = toggleId(filters.categories, cat.id, next);
                                        onFiltersChange({ ...filters, categories: nextCategories });
                                    }}
                                />
                                <span className="capitalize">{cat.name}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="mb-2 font-semibold">Price Range</h4>
                <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={price}
                    onChange={(val) => setPrice(val as [number, number])}
                    onValueCommit={(val) =>
                        onFiltersChange({ ...filters, priceRange: val as [number, number] })
                    }
                />
                <div className="mt-1 flex justify-between text-sm">
                    <span>₹{price[0]}</span>
                    <span>₹{price[1]}</span>
                </div>
            </div>

            {/* Occasions */}
            <div>
                <h4 className="mb-2 font-semibold">Occasions</h4>
                <div className="space-y-1">
                    {options.occasions.map((occ) => {
                        const checked = filters.occasions.includes(occ.id);
                        return (
                            <label key={occ.id} className="flex cursor-pointer items-center space-x-2">
                                <Checkbox
                                    checked={checked}
                                    onChange={(event) => {
                                        const next = event.target.checked;
                                        const nextOccasions = toggleId(filters.occasions, occ.id, next);
                                        onFiltersChange({ ...filters, occasions: nextOccasions });
                                    }}
                                />
                                <span className="capitalize">{occ.name}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Customizable */}
            <div>
                <label className="flex cursor-pointer items-center space-x-2">
                    <Checkbox
                        checked={!!filters.customizable}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            onFiltersChange({ ...filters, customizable: event.target.checked })
                        }
                    />
                    <span>Customizable Only</span>
                </label>
            </div>
        </div>
    );
}
