"use client";

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { pushToast } from '@/store/slices/toastSlice';

function QueryProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        throwOnError: false,
      },
      mutations: {
        retry: 0,
        throwOnError: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error: any) => {
        const message = error?.message || 'Something went wrong';
        dispatch(pushToast({ id: Math.random().toString(36).slice(2), variant: 'error', title: 'Request failed', message }));
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: any) => {
        const message = error?.message || 'Something went wrong';
        dispatch(pushToast({ id: Math.random().toString(36).slice(2), variant: 'error', title: 'Request failed', message }));
      },
    }),
  }), [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ReduxProvider>
  );
} 