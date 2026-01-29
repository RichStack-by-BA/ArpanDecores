import { apiGet } from './fetchWrapper';
import { API_ROUTES, toApiError, type ApiError } from './endpoints';

// Define Product type
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string; // or Category type if you have populated data
  specifications?: { key: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
}

// Define reusable API result type
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

// ✅ GET all products
export async function getAllProducts(): Promise<ApiResult<Product[]>> {
  try {
    const data = await apiGet<Product[]>(API_ROUTES.PRODUCT.GET_ALL, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

// ✅ GET product by ID
export async function getProductById(id: string): Promise<ApiResult<Product>> {
  try {
    const data = await apiGet<Product>(`${API_ROUTES.PRODUCT.GET_BY_ID}/${id}`, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

// ✅ GET products by Category
export async function getProductsByCategory(categoryId: string): Promise<ApiResult<Product[]>> {
  try {
    const data = await apiGet<Product[]>(`${API_ROUTES.PRODUCT.GET_BY_CATEGORY}/${categoryId}`, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}
