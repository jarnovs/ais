import Image from 'next/image';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Ansp Logo"
            width={120}
            height={48}
            className="mx-auto mb-6"
            priority
          />
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#2C3B7F] mb-2">
            Административная панель 
          </h1>
          <p className="text-muted-foreground text-sm">
            Войдите в систему для управления сайтом
          </p>
        </div>

        <div className="bg-[#f5f7fa] p-6 md:p-8 rounded-lg border border-[#d1d5db] shadow-xl">
          <LoginForm />
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ANSP. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
}

