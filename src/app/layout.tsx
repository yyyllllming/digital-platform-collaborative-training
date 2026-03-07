import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import './globals.css';

export const metadata: Metadata = {
  title: '校园智联',
  description: '新老生协同培养平台 (Peer-to-Peer Collaborative Growth Platform)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2">
                <Logo className="w-8 h-8 text-primary" />
                <span className="font-bold text-lg text-primary group-data-[collapsible=icon]:hidden">
                  校园智联
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
            </SidebarContent>
          </Sidebar>
          <SidebarRail />
          <SidebarInset>
            <header className="flex h-16 items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm border-b px-4 md:px-6 z-30">
              <SidebarTrigger className="md:hidden" />
              <div className="w-0 md:w-auto" />
              <UserNav />
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
