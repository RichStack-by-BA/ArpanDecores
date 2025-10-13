"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { OTPForm } from './OTPForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import type { AuthModalProps, AuthModalView } from './types';
import type { LoginFormData, SignupFormData, ForgotPasswordFormData, OTPFormData, ResetPasswordFormData } from '@/lib/schemas/auth-schemas';
import { useAuthMutations } from '@/hooks/useAuthMutations';

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<AuthModalView>(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const { loginMutation, registerMutation, forgotPasswordMutation, verifyOtpMutation, resetPasswordMutation } = useAuthMutations();
  const [emailCtx, setEmailCtx] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen) setView(initialView);
  }, [isOpen, initialView]);

  const onViewChange = (v: AuthModalView) => setView(v);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({ email: data.email, password: data.password });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.mobile,
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgot = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await forgotPasswordMutation.mutateAsync({ email: data.email });
      setEmailCtx(data.email);
      setView('otp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtp = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      await verifyOtpMutation.mutateAsync({ email: emailCtx, otp: data.otp });
      setView('reset-password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await resetPasswordMutation.mutateAsync({ email: emailCtx, newPassword: data.newPassword });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const modalVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } };
  const formVariants = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2, ease: 'easeOut' }} className="relative bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div key={view} variants={formVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2, ease: 'easeInOut' }}>
              {view === 'login' && <LoginForm onViewChange={onViewChange} onSubmit={handleLogin} isLoading={isLoading} />}
              {view === 'signup' && <SignupForm onViewChange={onViewChange} onSubmit={handleSignup} isLoading={isLoading} />}
              {view === 'forgot-password' && <ForgotPasswordForm onViewChange={onViewChange} onSubmit={handleForgot} isLoading={isLoading} />}            
              {view === 'otp' && <OTPForm onViewChange={onViewChange} onSubmit={handleOtp} isLoading={isLoading} />}
              {view === 'reset-password' && <ResetPasswordForm onViewChange={onViewChange} onSubmit={handleReset} isLoading={isLoading} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
} 