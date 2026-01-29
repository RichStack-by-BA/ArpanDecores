"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeToast } from '@/store/slices/toastSlice';
import { cn } from '@/lib/utils';

export default function Toast() {
  const items = useAppSelector((s) => s.toast.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (items.length === 0) return;
    const id = items[0].id;
    const t = setTimeout(() => dispatch(removeToast(id)), 4000);
    return () => clearTimeout(t);
  }, [items, dispatch]);

  if (items.length === 0) return null;

  return (
    <div className={cn("fixed top-0 right-0 z-50 flex flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col")}> 
      {items.map((toast) => (
        <div key={toast.id} className={cn(
          "relative flex items-center w-[350px]  p-4 mb-4 rounded-md shadow-lg transition-all duration-300",
          toast.variant === 'error' ? 'bg-red-500 text-white' : toast.variant === 'success' ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'
        )}>
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            <div className="text-sm">{toast.message}</div>
          </div>
          <button onClick={() => dispatch(removeToast(toast.id))} className="absolute top-2 right-2 text-white hover:text-black">
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
} 