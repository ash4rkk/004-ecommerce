import { SanityLive } from "@/sanity/lib/live"
import './globals.css';

const RootLayout=({children}: Readonly<{children: React.ReactNode}>)=>{
  return (
    <html lang="en">
      <body className='font-poppins antialiased'>
        {children}
        <SanityLive />
      </body>
    </html>
  )
}
export default RootLayout