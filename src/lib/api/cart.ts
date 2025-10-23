import { apiGet, apiPost, apiPatch, apiDelete } from './fetchWrapper';
import { API_ROUTES, toApiError, type ApiError } from './endpoints';

// Define Cart Item type
export interface CartItem {
  _id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customization?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

// ✅ 1. GET all cart items
export async function getAllCart(): Promise<ApiResult<Cart>> {
  try {
    const data = await apiGet<Cart>(API_ROUTES.CART.GET_ALL, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

// ✅ 2. ADD item to cart
export async function addToCartAPI(item: Omit<any, '_id'>): Promise<ApiResult<CartItem>> {
  try {
    const data = await apiPost<CartItem>(API_ROUTES.CART.ADD, item);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

// ✅ 3. UPDATE cart item (e.g., change quantity)
export async function updateCartItemById(id: string, quantity: any): Promise<ApiResult<CartItem>> {
  try {
    const data = await apiPatch<CartItem>(`${API_ROUTES.CART.UPDATE}/${id}`, quantity);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

// ✅ 4. REMOVE item from cart
export async function removeFromCartById(id: string): Promise<ApiResult<{ message: string }>> {
  try {
    const data = await apiDelete<{ message: string }>(`${API_ROUTES.CART.DELETE}/${id}`);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

