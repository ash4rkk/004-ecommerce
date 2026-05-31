import { SanityLive } from "@/sanity/lib/live"
import './globals.css';
import { Toaster } from 'react-hot-toast'
import { Poppins } from 'next/font/google'
import { ConfirmProvider } from "@/hooks/use-confirm";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
})
const RootLayout=({children}: Readonly<{children: React.ReactNode}>)=>{


  return (
    <html lang="en">
      <body className='font-poppins antialiased'>
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