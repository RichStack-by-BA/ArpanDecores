import { apiGet, apiPost } from './fetchWrapper';
import { API_ROUTES, toApiError, type ApiError } from './endpoints';

export interface ApplyOfferPayload {
  offerCode: string |null;
  cartTotal: number;
  productIds: string[];
}

export interface ApplyOfferResponse {
  discountAmount: number;
  finalAmount: number;
  offerId: string | null;
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };


export async function applyOffer(
  payload: ApplyOfferPayload
): Promise<ApiResult<ApplyOfferResponse>> {
  try {
    const data = await apiPost<{ offer: ApplyOfferResponse }>(
      API_ROUTES.OFFER.APPLY,
      payload
    );

    return { ok: true, data: data.offer }; // ✅ clean & consistent
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
  shippingAddress: string;
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


export async function getAllOrders(): Promise<ApiResult<any[]>> {
  try {
    const data:any = await apiGet<any[]>(API_ROUTES.ORDER.GET_ALL, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}



export async function getOrderByOrderID(orderId: string): Promise<ApiResult<any>> {
  try {
    const res:any = await apiGet<any>(`${API_ROUTES.ORDER.GET_BY_ID}/${orderId}`, { next: { revalidate: 60 } });
    const order = res?.data?.order;
    console.log("Fetched order details:", order);
    if (!order) {
      return { ok: false, error: { message: "Order not found" } };
    }
    return { ok: true,  data: order };
  } catch (err) {
    console.error("Error fetching order by ID:", err);
    return { ok: false, error: toApiError(err) };
  }
}

