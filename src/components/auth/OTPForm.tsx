"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, type OTPFormData } from '@/lib/schemas/auth-schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Key, ArrowLeft } from 'lucide-react';
import type { AuthFormBaseProps } from './types';

interface Props extends AuthFormBaseProps {
  onSubmit: (data: OTPFormData) => void;
}

export function OTPForm({ onViewChange, onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
        <p className="text-gray-600">We&apos;ve sent a 4-digit code to your email</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="otp">One-time password</Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input id="otp" type="text" placeholder="000000" className="pl-10 text-center text-lg tracking-widest" maxLength={6} {...register('otp')} />
          </div>
          {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Verifying…' : 'Verify OTP'}</Button>
      </form>

      <div className="mt-6 text-center">
        <button type="button" onClick={() => onViewChange('forgot-password')} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to forgot password
        </button>
      </div>
    </div>
  );
} 