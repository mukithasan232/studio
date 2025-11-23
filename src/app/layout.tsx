
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Bot, Menu, ShoppingCart } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { AuthProvider } from '@/context/auth-provider';
import AuthButton from './components/auth-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Codernest E-commerce',
  description: 'A modern, SEO-friendly e-commerce site for affiliate marketing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PH1L622DGV"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PH1L622DGV');
          `}
        </Script>
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
              <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                  <Bot className="h-6 w-6" />
                  <span className="">Codernest</span>
                </Link>
                <Link
                  href="/"
                  className="text-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/#products"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Products
                </Link>
                <Link
                  href="/admin"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Admin
                </Link>
              </nav>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Bot className="h-6 w-6" />
                      <span className="">Codernest</span>
                    </Link>
                    <Link href="/" className="hover:text-foreground">
                      Home
                    </Link>
                    <Link
                      href="/#products"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Products
                    </Link>
                    <Link
                      href="/admin"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Admin
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                   {/* Can add search bar here later */}
                </div>
                 <button className="relative transition-transform hover:scale-110">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </button>
                <AuthButton />
              </div>
            </header>
            {children}
             <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
              <p className="text-xs text-muted-foreground">&copy; 2024 Codernest Inc. All rights reserved.</p>
              <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <a href="#" className="text-xs hover:underline underline-offset-4">
                  Terms of Service
                </a>
                <a href="#" className="text-xs hover:underline underline-offset-4">
                  Privacy
                </a>
              </nav>
            </footer>
          </div>
        </AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
