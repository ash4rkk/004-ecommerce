import { SanityLive } from "@/sanity/lib/live"
import './globals.css';
import { Toaster } from 'react-hot-toast'
const RootLayout=({children}: Readonly<{children: React.ReactNode}>)=>{
  return (
    <html lang="en">
      <body className='font-poppins antialiased'>
        {children}
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
        {/* <SanityLive /> */}
      </body>
    </html>
  )
}
export default RootLayout