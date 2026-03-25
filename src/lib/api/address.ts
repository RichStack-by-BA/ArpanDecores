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

// Generic API Result
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError }

  type ApiWrapper<T> = {
  data: T
}
// Backend response shape
type AddressResponse = {
  address: Address
}

type MessageResponse = {
  message: string
}

// ─── 1. GET all addresses ─────────────────────────────

export async function getAllAddresses(): Promise<ApiResult<Address[]>> {
  try {
    const data = await apiGet<Address[]>(
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
): Promise<ApiResult<AddressResponse>> {
  try {
    const res:any = await apiPost<AddressResponse>(
      API_ROUTES.ADDRESS_ROUTES.ADD,
      payload
    )

    return { ok: true, data:res?.data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

// ─── 3. UPDATE address ────────────────────────────────

export async function updateAddress(
  id: string,
  payload: Partial<Address>
): Promise<ApiResult<AddressResponse>> {
  try {
    const res:any = await apiPatch<AddressResponse>(
      `${API_ROUTES.ADDRESS_ROUTES.UPDATE}/${id}`,
      payload
    )

    return { ok: true, data:res?.data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

// ─── 4. DELETE address ────────────────────────────────

export async function deleteAddress(
  id: string
): Promise<ApiResult<MessageResponse>> {
  try {
    const data = await apiDelete<MessageResponse>(
      `${API_ROUTES.ADDRESS_ROUTES.DELETE}/${id}`
    )

    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

// ─── 5. GET address by ID ─────────────────────────────

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