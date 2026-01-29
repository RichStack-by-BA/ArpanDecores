import { getServerCookie, setServerCookie } from "../cookies";

const baseURL =  'http://localhost:4000';

export type ApiError = {
  status?: number;
  message: string
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
  returnErrorBody?: boolean;
};





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
  const token = await getServerCookie("token");
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
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
    await setServerCookie("token", "", { maxAge: -1 });
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

export const apiPatch = <T>(path: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) =>
  fetchWrapper<T>(path, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) });

export const apiDelete = <T>(path: string, options?: Omit<FetchOptions, 'method' | 'body'>) =>
  fetchWrapper<T>(path, { ...options, method: 'DELETE' }); 