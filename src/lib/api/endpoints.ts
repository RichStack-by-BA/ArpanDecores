export const API_BASE_PATH = '/api/v1';

// ---------- AUTH ROUTES ----------
export const AUTH_ROUTES = {
  BASE: `${API_BASE_PATH}/auth`,
  LOGIN: '/login',
  REGISTER: '/register',
  ME: '/me',
  RESET_PASSWORD: '/reset-password',
  FORGET_PASSWORD: '/forget-password',
  VERIFY_OTP: '/verify-otp',
};

// ---------- IMAGE ROUTES ----------
export const IMAGE_ROUTES = {
  BASE: `${API_BASE_PATH}/image`,
  UPLOAD: '/upload',
  PRESIGNED_URL: '/presigned-url',
  DELETE: '/:key',
};

// ---------- CATEGORY ROUTES ----------
export const CATEGORY_ROUTES = {
  BASE: `${API_BASE_PATH}/category`,
  ADD: '/add',
  UPDATE: '/edit/:id',
  GET_ALL: '/all',
  DELETE: '/delete/:id',
};

// ---------- PRODUCT ROUTES ----------
export const PRODUCT_ROUTES = {
  BASE: `${API_BASE_PATH}/product`,
  ADD: '/add',
  UPDATE: '/edit/:id',
  GET_ALL: '/all',
  DELETE: '/delete/:id',
  GET_BY_ID: '/:id',
};

// ---------- ORDER ROUTES ----------
export const ORDER_ROUTES = {
  BASE: `${API_BASE_PATH}/order`,
  ADD: '/add',
  UPDATE: '/edit/:id',
  GET_ALL: '/all',
  DELETE: '/delete/:id',
  GET_BY_ID: '/:id',
};

// ---------- WISHLIST ROUTES ----------
export const WISHLIST_ROUTES = {
  BASE: `${API_BASE_PATH}/wishlist`,
  ADD: '/add',
  UPDATE: '/edit/:id',
  GET_ALL: '/all',
  DELETE: '/delete/:id',
  GET_BY_ID: '/:id',
};

// ---------- REVIEW ROUTES ----------
export const REVIEW_ROUTES = {
  BASE: `${API_BASE_PATH}/review`,
  ADD: '/add',
  UPDATE: '/edit/:id',
  GET_ALL: '/all',
  DELETE: '/delete/:id',
  GET_BY_ID: '/:id',
};

// ---------- POLICY ROUTES ----------
export const POLICY_ROUTES = {
  BASE: `${API_BASE_PATH}/policy`,
  ADD: '/add',
  UPDATE: '/edit/:id',
  GET_ALL: '/all',
  DELETE: '/delete/:id',
  GET_BY_ID: '/:id',
};

// ---------- TAX ROUTES ----------
export const TAX_ROUTES = {
  BASE: `${API_BASE_PATH}/tax`,
  ADD: '/add',
  UPDATE: '/edit/:id',
  GET_ALL: '/all',
  DELETE: '/delete/:id',
  GET_BY_ID: '/:id',
};


export const CART_ROUTES = {
    BASE: `${API_BASE_PATH}/cart`,
    ADD: '/add',
    UPDATE: '/edit',
    GET_ALL: '/all',
    DELETE: '/delete',
};
// ---------- COMBINED ROUTES ----------
export const API_ROUTES = {
  AUTH: {
    LOGIN: `${AUTH_ROUTES.BASE}${AUTH_ROUTES.LOGIN}`,
    REGISTER: `${AUTH_ROUTES.BASE}${AUTH_ROUTES.REGISTER}`,
    FORGOT_PASSWORD: `${AUTH_ROUTES.BASE}${AUTH_ROUTES.FORGET_PASSWORD}`,
    VERIFY_OTP: `${AUTH_ROUTES.BASE}${AUTH_ROUTES.VERIFY_OTP}`,
    RESET_PASSWORD: `${AUTH_ROUTES.BASE}${AUTH_ROUTES.RESET_PASSWORD}`,
    GET_USER_DETAILS: `${AUTH_ROUTES.BASE}${AUTH_ROUTES.ME}`,
  },
  CATEGORY: {
    BASE: `${CATEGORY_ROUTES.BASE}`,
    ADD: `${CATEGORY_ROUTES.BASE}${CATEGORY_ROUTES.ADD}`,
    UPDATE: `${CATEGORY_ROUTES.BASE}${CATEGORY_ROUTES.UPDATE}`,
    GET_ALL: `${CATEGORY_ROUTES.BASE}${CATEGORY_ROUTES.GET_ALL}`,
    DELETE: `${CATEGORY_ROUTES.BASE}${CATEGORY_ROUTES.DELETE}`,
    GET_BY_ID: `${CATEGORY_ROUTES.BASE}`,
  },
  PRODUCT: {
    BASE: `${PRODUCT_ROUTES.BASE}`,
    ADD: `${PRODUCT_ROUTES.BASE}${PRODUCT_ROUTES.ADD}`,
    UPDATE: `${PRODUCT_ROUTES.BASE}${PRODUCT_ROUTES.UPDATE}`,
    GET_ALL: `${PRODUCT_ROUTES.BASE}${PRODUCT_ROUTES.GET_ALL}`,
    DELETE: `${PRODUCT_ROUTES.BASE}${PRODUCT_ROUTES.DELETE}`,
    GET_BY_ID: `${PRODUCT_ROUTES.BASE}`,
    GET_BY_CATEGORY: `${PRODUCT_ROUTES.BASE}/category`
  },
  CART: {
    BASE: `${CART_ROUTES.BASE}`,
    ADD: `${CART_ROUTES.BASE}${CART_ROUTES.ADD}`,
    UPDATE: `${CART_ROUTES.BASE}${CART_ROUTES.UPDATE}`,
    GET_ALL: `${CART_ROUTES.BASE}${CART_ROUTES.GET_ALL}`,
    DELETE: `${CART_ROUTES.BASE}${CART_ROUTES.DELETE}`,
    GET_BY_ID: `${CART_ROUTES.BASE}`,
  },
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