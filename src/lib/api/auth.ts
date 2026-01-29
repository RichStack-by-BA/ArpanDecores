import { API_ROUTES, toApiError, type ApiError } from './endpoints';
import { apiGet, apiPost } from './fetchWrapper';

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { firstName: string; lastName: string; email: string; password: string; phone: string; }

export interface AuthResponse {
  message?: string;
  token: string;
  user: { id: string; firstName: string; lastName: string; email: string; phone?: string };
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false, error: ApiError };

export async function login(payload: LoginPayload): Promise<ApiResult<AuthResponse>> {
  try {
    const data = await apiPost<AuthResponse>(API_ROUTES.AUTH.LOGIN, payload, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

export async function register(payload: RegisterPayload): Promise<ApiResult<AuthResponse>> {
  try {
    const data = await apiPost<AuthResponse>(API_ROUTES.AUTH.REGISTER, payload, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

export interface ForgotPasswordPayload { email: string; }
export interface ForgotPasswordResponse { message: string; requestId?: string; }
export async function forgotPassword(payload: ForgotPasswordPayload): Promise<ApiResult<ForgotPasswordResponse>> {
  try {
    const data = await apiPost<ForgotPasswordResponse>(API_ROUTES.AUTH.FORGOT_PASSWORD, payload, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

export interface VerifyOtpPayload { email?: string; phone?: string; otp: string; requestId?: string; }
export interface VerifyOtpResponse { message: string; verified: boolean; }
export async function verifyOtp(payload: VerifyOtpPayload): Promise<ApiResult<VerifyOtpResponse>> {
  try {
    const data = await apiPost<VerifyOtpResponse>(API_ROUTES.AUTH.VERIFY_OTP, payload, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

export interface ResetPasswordPayload { token?: string; email?: string; newPassword: string; }
export interface ResetPasswordResponse { message: string; }
export async function resetPassword(payload: ResetPasswordPayload): Promise<ApiResult<ResetPasswordResponse>> {
  try {
    const data = await apiPost<ResetPasswordResponse>(API_ROUTES.AUTH.RESET_PASSWORD, payload, { cache: 'no-store' });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
} 
export interface getUserDetailsParams { token?: string; }

export async function getUserDetails(): Promise<ApiResult<any>> {
  try {
    const data = await apiGet<ResetPasswordResponse>(API_ROUTES.AUTH.GET_USER_DETAILS, );
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
} 