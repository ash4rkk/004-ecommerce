import { SanityLive } from "@/sanity/lib/live"

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