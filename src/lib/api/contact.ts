import { apiGet, apiPost } from './fetchWrapper';
import { API_ROUTES, toApiError, type ApiError } from './endpoints';

// Define category types
export interface Contact {
   name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}


export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

// ✅ GET all categories
export async function addContact(item: Contact): Promise<ApiResult<Contact>> {
  try {
    const data = await apiPost<Contact>(API_ROUTES.CONTACT.ADD, item);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}
