export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    FORGOT_PASSWORD: '/api/v1/auth/forget-password',
    VERIFY_OTP: '/api/v1/auth/verify-otp',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
    GET_USER_DETAILS: '/api/v1/auth/me',
  }
} as const;

export type ApiError = {
  status?: number;
  message: string;
  data?: unknown;
};

export function toApiError(err: unknown): ApiError {
  if (typeof err === 'object' && err && 'message' in err) {
    const anyErr = err as any;
    return {
      status: anyErr.status ?? anyErr.response?.status,
      message: anyErr.message ?? 'Unexpected error',
      data: anyErr.data ?? anyErr.response?.data,
    };
  }
  return { message: 'Unexpected error' };
} 