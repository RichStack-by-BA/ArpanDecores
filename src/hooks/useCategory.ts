import { useQuery} from '@tanstack/react-query';
import {
  getAllCategories,
  getCategoryById,
} from '@/lib/api/category';

const categoryKeys = {
  all: ['categories'] as const,
  detail: (id: string) => ['categories', id] as const,
};

export function useGetCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getAllCategories,
    staleTime: 0, // cache for 2 mins
  });
}
export function useGetCategoryById(id?: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id!),
    enabled: !!id, // only fetch when id is available
    staleTime: 1000 * 60 * 2, // cache for 2 minutes
  });
}
