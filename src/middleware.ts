import { TOKEN } from "@/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN)?.value;
  const { pathname } = request.nextUrl;
console.log("MIDDLEWARE RUNNING:", request.nextUrl.pathname);
  // 🔒 Protect checkout
  if (pathname.startsWith("/checkout")) {
    if (!token) {
      return NextResponse.redirect(new URL("/cart", request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Apply only where needed
export const config = {
  matcher: ["/checkout/:path*"],
};