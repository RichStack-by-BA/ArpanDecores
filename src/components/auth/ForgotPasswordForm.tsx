"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/auth-schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Mail, ArrowLeft } from 'lucide-react';
import type { AuthFormBaseProps } from './types';

interface Props extends AuthFormBaseProps {
  onSubmit: (data: ForgotPasswordFormData) => void;
}

export function ForgotPasswordForm({ onViewChange, onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h2>
        <p className="text-gray-600">Enter your email to receive reset instructions</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input id="email" type="email" placeholder="you@example.com" className="pl-10" {...register('email')} />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Sending…' : 'Send reset link'}</Button>
      </form>

      <div className="mt-6 text-center">
        <button type="button" onClick={() => onViewChange('login')} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
        </button>
      </div>
    </div>
  );
} 