"use server";

import { cookies } from "next/headers";

export type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
};

export const AUTH_COOKIE_NAME = "atkn_" + Buffer.from("auth").toString("hex"); 

// ✅ Must be called inside a Server Action or Route Handler
export async function setServerCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? process.env.NODE_ENV === "production",
    path: options.path ?? "/",
    sameSite: options.sameSite ?? "lax",
    maxAge: options.maxAge,
  });
}

export async function getServerCookie(name: string): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  } catch {
    return undefined;
  }
}

export async function deleteServerCookie(name: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch {}
}
