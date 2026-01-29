import { NextRequest, NextResponse } from 'next/server';
import { setServerCookie, deleteServerCookie, getServerCookie, AUTH_COOKIE_NAME } from '@/lib/cookies';
import { jwtDecode } from 'jwt-decode';

type Decoded = { sub?: string; id?: string; email?: string; firstName?: string; lastName?: string; name?: string } & Record<string, any>;

export async function POST(req: NextRequest) {
  const { token, maxAge } = await req.json();
  if (!token) return NextResponse.json({ message: 'Token required' }, { status: 400 });
  setServerCookie(AUTH_COOKIE_NAME, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: maxAge ?? 60 * 60 * 24 * 7 });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  deleteServerCookie(AUTH_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const token:any = getServerCookie(AUTH_COOKIE_NAME);
  if (!token) return NextResponse.json({ authenticated: false }, { status: 200 });
  try {
    const decoded = jwtDecode<Decoded>(token);
    const username = decoded.name || [decoded.firstName, decoded.lastName].filter(Boolean).join(' ') || decoded.email || decoded.sub || decoded.id;
    return NextResponse.json({ authenticated: true, user: { username, ...decoded } });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
} 