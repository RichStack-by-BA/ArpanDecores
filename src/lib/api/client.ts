const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type ApiError = {
  status?: number;
  message: string;
  data?: unknown;
};

export class ApiErrorException extends Error {
  status?: number;
  data?: unknown;
  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiErrorException';
    this.status = error.status;
    this.data = error.data;
  }
}

export type FetchOptions = RequestInit & {
  // Next.js fetch options
  next?: { revalidate?: number };
  cache?: RequestCache;
  // When true, response body will be returned even for non-2xx if possible
  returnErrorBody?: boolean;
};

function getAuthTokenFromBrowser(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

async function handleUnauthorized(): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  } catch {}
}

function buildUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${baseURL}${path}`;
}

async function parseJsonSafe<T>(res: Response): Promise<T | undefined> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}

export async function fetchWrapper<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = buildUrl(path);
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Attach Authorization from localStorage when on client
  const token = getAuthTokenFromBrowser();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: options.credentials ?? 'include',
  });

  if (res.ok) {
    // Try to parse JSON; if empty body, return undefined as any
    const data = await parseJsonSafe<T>(res);
    return (data as T) ?? (undefined as unknown as T);
  }

  const status = res.status;
  const data = await parseJsonSafe<unknown>(res);
  const message = (data as any)?.message || res.statusText || 'Unexpected error';

  if (status === 401) {
    // trigger logout/redirect
    await handleUnauthorized();
  }

  const apiError: ApiError = { status, message, data };
  if (options.returnErrorBody) {
    throw new ApiErrorException(apiError);
  }
  throw new ApiErrorException(apiError);
}

export const apiGet = <T>(path: string, options?: Omit<FetchOptions, 'method' | 'body'>) =>
  fetchWrapper<T>(path, { ...options, method: 'GET' });

export const apiPost = <T>(path: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) =>
  fetchWrapper<T>(path, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) });

export const apiPut = <T>(path: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) =>
  fetchWrapper<T>(path, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) });

export const apiDelete = <T>(path: string, options?: Omit<FetchOptions, 'method' | 'body'>) =>
  fetchWrapper<T>(path, { ...options, method: 'DELETE' }); 