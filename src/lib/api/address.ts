import { apiGet, apiPost, apiPatch, apiDelete } from './fetchWrapper'
import { API_ROUTES, toApiError, type ApiError } from './endpoints'

// ─── Types ─────────────────────────────────────────────

export interface Address {
  _id?: string
  name: string
  phone: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
  addressType: 'HOME' | 'WORK' | 'OTHER'
  isDefault?: boolean
  createdAt?: string
  updatedAt?: string
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError }

// ─── 1. GET all addresses ─────────────────────────────

export async function getAllAddresses(): Promise<ApiResult<Address[]>> {
  try {
    const data: any = await apiGet<Address[]>(
      API_ROUTES.ADDRESS_ROUTES.GET_ALL,
      { cache: 'no-store' }
    )

    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

// ─── 2. ADD address ───────────────────────────────────

export async function addAddress(
  payload: Address
): Promise<ApiResult<Address>> {
  try {
    const data = await apiPost<Address>(
      API_ROUTES.ADDRESS_ROUTES.ADD,
      payload
    )

    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

// ─── 3. UPDATE address ────────────────────────────────

export async function updateAddress(
  id: string,
  payload: Partial<Address>
): Promise<ApiResult<Address>> {
  try {
    const data = await apiPatch<Address>(
      `${API_ROUTES.ADDRESS_ROUTES.UPDATE}/${id}`,
      payload
    )

    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

// ─── 4. DELETE address ────────────────────────────────

export async function deleteAddress(
  id: string
): Promise<ApiResult<{ message: string }>> {
  try {
    const data = await apiDelete<{ message: string }>(
      `${API_ROUTES.ADDRESS_ROUTES.DELETE}/${id}`
    )

    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

export async function getAddressById(
  id: string
): Promise<ApiResult<Address>> {
  try {
    const data = await apiGet<Address>(
      `${API_ROUTES.ADDRESS_ROUTES.GET_ALL}/${id}`
    )

    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}