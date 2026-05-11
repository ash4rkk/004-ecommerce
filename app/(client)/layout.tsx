import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
export const metadata: Metadata = {
  title: {
    template: '%s - Shopek store',
    default: 'Shopek online store',
  },
  description: 'Shopek online store, Your one stop shop for all your needs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1 bg-amber-400'>{children}</main>
            <Footer />
          </div>
    </ClerkProvider>
  );
}
