'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { checkAuth, useIsAuthenticated } from '@/hooks/use-auth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = useIsAuthenticated();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') return;

    if (!isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
}
 