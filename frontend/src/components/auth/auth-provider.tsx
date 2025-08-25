'use client';

import { useEffect } from 'react';
import { checkAuth, useIsAuthenticated } from '@/hooks/use-auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
