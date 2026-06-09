import { SanityLive } from "@/sanity/lib/live"
import './globals.css';
import { Toaster } from 'react-hot-toast'
import { Poppins, Source_Serif_4 } from 'next/font/google'
import { ConfirmProvider } from "@/hooks/use-confirm";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
})
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  weight:['500']

})
const RootLayout=({children}: Readonly<{children: React.ReactNode}>)=>{


  return (
    <html lang="en" className={`${poppins.variable} ${sourceSerif.variable}`}>
      <body className='font-source-serif bg-white antialiased'>
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