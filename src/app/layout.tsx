import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Bot, ShoppingCart, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Codernest E-commerce',
  description: 'A modern, SEO-friendly e-commerce site.',
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
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
            <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Bot className="h-6 w-6" />
                <span className="sr-only">Codernest</span>
              </a>
              <a
                href="#"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Products
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </a>
            </nav>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <div className="ml-auto flex-1 sm:flex-initial">
                 {/* Can add search bar here later */}
              </div>
               <button className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button>
                <User className="h-6 w-6" />
              </button>
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
        <Toaster />
      </body>
    </html>
  );
}
