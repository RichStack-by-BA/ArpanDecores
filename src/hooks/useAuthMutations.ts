"use client";

import { useMutation } from '@tanstack/react-query';
import {
  login as loginApi,
  register as registerApi,
  forgotPassword as forgotApi,
  verifyOtp as verifyOtpApi,
  resetPassword as resetPasswordApi,
  type LoginPayload,
  type RegisterPayload,
  type ForgotPasswordPayload,
  type VerifyOtpPayload,
  type ResetPasswordPayload,
} from '@/lib/api/auth';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, clearCredentials } from '@/store/slices/authSlice';
import { pushToast } from '@/store/slices/toastSlice';

const makeId = () => Math.random().toString(36).slice(2);

async function setSessionCookie(token: string) {
  await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ token }),
  });
}

export async function clearSessionCookie() {
  await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
}

export function useAuthMutations() {
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await loginApi(payload);
      if (!res.ok) throw res.error;
      return res.data;
    },
    onSuccess: async (data: any) => {
      try {
        await setSessionCookie(data.token);
        if (typeof window !== 'undefined') localStorage.setItem('auth_token', data.token);
      } catch { }
      dispatch(
        setCredentials({
          token: data.token,
          user: data.user
        })
      );
      dispatch(pushToast({ id: makeId(), variant: 'success', title: 'Signed in', message: 'You are now logged in.' }));
    },
    onError: (err: any) => {
      dispatch(pushToast({ id: makeId(), variant: 'error', title: 'Login failed', message: err?.message || 'Unable to sign in' }));
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await registerApi(payload);
      if (!res.ok) throw res.error;
      return res.data;
    },
    onSuccess: (data: any) => {
      // Do NOT set cookie on signup per requirement
      try {
        if (typeof window !== 'undefined') localStorage.setItem('auth_token', data.token);
      } catch {}
      dispatch(
        setCredentials({
          token: data.token,
          user: data.user
        })
      );
      dispatch(pushToast({ id: makeId(), variant: 'success', title: 'Account created', message: 'Welcome aboard!' }));
    },
    onError: (err: any) => {
      dispatch(pushToast({ id: makeId(), variant: 'error', title: 'Signup failed', message: err?.message || 'Unable to sign up' }));
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const res = await forgotApi(payload);
      if (!res.ok) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      dispatch(pushToast({ id: makeId(), variant: 'success', title: 'Code sent', message: 'OTP has been sent to your email.' }));
    },
    onError: (err: any) => {
      dispatch(pushToast({ id: makeId(), variant: 'error', title: 'Request failed', message: err?.message || 'Unable to send code' }));
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const res = await verifyOtpApi(payload);
      if (!res.ok) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      dispatch(pushToast({ id: makeId(), variant: 'success', title: 'OTP verified', message: 'You can now reset your password.' }));
    },
    onError: (err: any) => {
      dispatch(pushToast({ id: makeId(), variant: 'error', title: 'Invalid OTP', message: err?.message || 'Please try again' }));
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const res = await resetPasswordApi(payload);
      if (!res.ok) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      dispatch(pushToast({ id: makeId(), variant: 'success', title: 'Password updated', message: 'Your password has been reset.' }));
    },
    onError: (err: any) => {
      dispatch(pushToast({ id: makeId(), variant: 'error', title: 'Reset failed', message: err?.message || 'Unable to reset password' }));
    },
  });

  const signOut = async () => {
    try {
      await clearSessionCookie();
      if (typeof window !== 'undefined') localStorage.removeItem('auth_token');
      dispatch(clearCredentials());
      dispatch(pushToast({ id: makeId(), variant: 'success', title: 'Signed out', message: 'You have been signed out.' }));
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch { }
  };

  return { loginMutation, registerMutation, forgotPasswordMutation, verifyOtpMutation, resetPasswordMutation, signOut };
} 