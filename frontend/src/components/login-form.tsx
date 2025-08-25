'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { login, clearError, useIsLoading, useAuthError } from '@/hooks/use-auth';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Имя пользователя обязательно')
    .min(6, 'Имя пользователя должно содержать минимум 6 символов')
    .max(63, 'Имя пользователя не должно превышать 63 символа')
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Имя пользователя может содержать только латинские буквы и цифры',
    ),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(63, 'Пароль не должен превышать 63 символа'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const isLoading = useIsLoading();
  const error = useAuthError();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      clearError();
      await login(values.username, values.password);

      router.push('/admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#9690A1]">Имя пользователя</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...field}
                    type="text"
                    placeholder="Введите имя пользователя"
                    autoComplete="username"
                    disabled={isLoading}
                    className={cn(
                      'pl-10 bg-[#eff0f3] border-[#cecfd0] text-[#1C1C1C] placeholder:text-muted-foreground',
                      'focus:border-[#2C3B7F] focus:ring-[#2C3B7F]',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#9690A1]">Пароль</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className={cn(
                      'pl-10 bg-[#eff0f3] border-[#cecfd0] text-[#1C1C1C] placeholder:text-muted-foreground',
                      'focus:border-[#2C3B7F] focus:ring-[#2C3B7F]',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[#2C3B7F] transition-colors disabled:opacity-50"
                    aria-label={
                      showPassword ? 'Скрыть пароль' : 'Показать пароль'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="p-3 text-sm text-blue-900 bg-blue-100/20 border border-blue-800/40 rounded-md">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-medium py-3',
            'transition-all duration-300 transform hover:scale-105 shadow-lg',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          )}
        >
          {isLoading ? 'Вход в систему...' : 'Войти'}
        </Button>
      </form>
    </Form>
  );
}