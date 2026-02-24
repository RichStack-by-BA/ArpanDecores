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

export interface CreateOrderPayload {
  couponCode: string;
  cartItems: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}


export async function createOrder(
  payload: CreateOrderPayload
): Promise<ApiResult<CreateOrderResponse>> {
  try {
    const data = await apiPost<CreateOrderResponse>(
      API_ROUTES.PAYMENT.CREATE_ORDER,
      payload
    );
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  status: "paid" | "failed";
  message: string;
}

export async function verifyPayment(
  payload: VerifyPaymentPayload
): Promise<ApiResult<VerifyPaymentResponse>> {
  try {
    const data = await apiPost<VerifyPaymentResponse>(
      API_ROUTES.PAYMENT.VERIFY_PAYMENT,
      payload
    );

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}