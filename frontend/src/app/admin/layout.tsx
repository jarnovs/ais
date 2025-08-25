import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "@/widgets/admin/app-sidebar"
import type { Metadata } from 'next';
import { AuthProvider } from '@/components/auth/auth-provider';


export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Administration and management interface'
};


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main>
            <SidebarTrigger />
            {children}
            <Toaster />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}