"use client";

import { useState } from "react";
import CategoryCard from "./CategoryCard";
import Pagination from "@/components/misc/Pagination";

interface Props {
  categories: any[];
}

export default function CategoriesWithPagination({ categories }: Props) {

  const itemsPerPage = 9;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedCategories = categories.slice(start, end);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {paginatedCategories.map((category: any) => (
          category.isActive && (
            <CategoryCard
              key={category._id}
              slug={category.slug}
              name={category.name}
              description={category.description}
              image={category.image}
            />
          )
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}