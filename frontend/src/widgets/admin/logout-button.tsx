'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logout } from '@/hooks/use-auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReactNode } from 'react';

export function LogoutButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/admin/login');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`${className}`}
        >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Подтвердите выход</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите выйти из системы? Вам потребуется снова войти
            для доступа к админ-панели.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Выйти</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
