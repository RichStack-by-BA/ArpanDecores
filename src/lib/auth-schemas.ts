import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  mobile: z
    .string()
    .min(10, 'Mobile must be 10 digits')
    .max(15, 'Mobile number too long')
    .regex(/^[0-9+\-()\s]+$/, 'Invalid mobile number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'Include upper, lower, and number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((v) => v.password === v.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
});

export const otpSchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits').regex(/^\d{4}$/, 'Only digits allowed'),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'Include upper, lower, and number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((v) => v.newPassword === v.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>; 