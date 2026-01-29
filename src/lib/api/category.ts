import { apiGet } from './fetchWrapper';
import { API_ROUTES, toApiError, type ApiError } from './endpoints';

// Define category types
export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}


export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

// ✅ GET all categories
export async function getAllCategories(): Promise<ApiResult<Category[]>> {
  try {
    const data = await apiGet<Category[]>(API_ROUTES.CATEGORY.GET_ALL, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

// ✅ GET category by ID
export async function getCategoryById(id: string): Promise<ApiResult<Category>> {
  try {
    const data = await apiGet<Category>(`${API_ROUTES.CATEGORY.GET_BY_ID}/${id}`, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}
