import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
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
    <ClerkProvider appearance={{ cssLayerName: "clerk" }}>

          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
    </ClerkProvider>
  );
}
