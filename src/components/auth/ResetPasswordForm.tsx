"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/auth-schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import type { AuthFormBaseProps } from './types';

interface Props extends AuthFormBaseProps {
  onSubmit: (data: ResetPasswordFormData) => void;
}

export function ResetPasswordForm({ onViewChange, onSubmit, isLoading }: Props) {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set new password</h2>
        <p className="text-gray-600">Create a strong password for your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="newPassword">New password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input id="newPassword" type={showNew ? 'text' : 'password'} placeholder="Enter new password" className="pl-10 pr-10" {...register('newPassword')} />
            <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input id="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="Confirm new password" className="pl-10 pr-10" {...register('confirmPassword')} />
            <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Updating password…' : 'Update password'}</Button>
      </form>

      <div className="mt-6 text-center">
        <button type="button" onClick={() => onViewChange('otp')} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to OTP
        </button>
      </div>
    </div>
  );
} 