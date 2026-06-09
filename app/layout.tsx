import { SanityLive } from "@/sanity/lib/live"
import './globals.css';
import { Toaster } from 'react-hot-toast'
import { Poppins, Nunito } from 'next/font/google'
import { ConfirmProvider } from "@/hooks/use-confirm";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
})
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap'
})
const RootLayout=({children}: Readonly<{children: React.ReactNode}>)=>{


  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable}`}>
      <body className='font-sans bg-white antialiased'>
        <ConfirmProvider>
        {children}
        </ConfirmProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff'
            }
          }}
        />
        <SanityLive />
      </body>
    </html>
  )
}
export default RootLayout