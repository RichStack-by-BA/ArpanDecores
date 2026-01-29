export type AuthModalView = 'login' | 'signup' | 'forgot-password' | 'otp' | 'reset-password';

export interface AuthFormBaseProps {
  onViewChange: (view: AuthModalView) => void;
  isLoading?: boolean;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthModalView;
} 