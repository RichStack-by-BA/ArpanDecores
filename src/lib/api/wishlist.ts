import { apiGet, apiPost, apiPatch, apiDelete } from './fetchWrapper';
import { API_ROUTES, toApiError, type ApiError } from './endpoints';


export interface WishlistItem {
  _id?: string;
  name: string;
  price: number;
  image?: string;
}

export interface Wishlist {
   userId: string;
   items: WishlistItem[];
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };


export async function getAllWishlist(): Promise<ApiResult<Wishlist>> {
  try {
    const data: any = await apiGet<Wishlist>(API_ROUTES.WISHLIST.GET_ALL, {
      cache: 'no-store',
    });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}


export async function addToWishlistAPI(
  item: Omit<WishlistItem, '_id'>
): Promise<ApiResult<WishlistItem>> {
  try {
    const data = await apiPost<WishlistItem>(API_ROUTES.WISHLIST.ADD, item);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}


export async function updateWishlistItemById(
  id: string,
  body: any
): Promise<ApiResult<WishlistItem>> {
  try {
    const data = await apiPatch<WishlistItem>(`${API_ROUTES.WISHLIST.UPDATE}/${id}`, body);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}


export async function removeFromWishlistById(
  id: string
): Promise<ApiResult<{ message: string }>> {
  try {
    const data = await apiDelete<{ message: string }>(
      `${API_ROUTES.WISHLIST.DELETE}/${id}`
    );
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}
