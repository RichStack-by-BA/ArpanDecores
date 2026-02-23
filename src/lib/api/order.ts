import { apiPost } from './fetchWrapper';
import { API_ROUTES, toApiError, type ApiError } from './endpoints';

export interface ApplyOfferPayload {
  offerCode: string;
  cartTotal: number;
  productIds: string[];
}

export interface ApplyOfferResponse {
  discountAmount: number;
  finalAmount: number;
  offerId: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

  export async function applyOffer(
  payload: ApplyOfferPayload
): Promise<ApiResult<ApplyOfferResponse>> {
  try {
    const data = await apiPost<ApplyOfferResponse>(
      API_ROUTES.OFFER.APPLY,
      payload
    );
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}