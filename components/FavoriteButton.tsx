import React from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
function FavoriteButton() {
  return (
    <Link href={'/card'} className='group relative '>
      <Heart className='w-5 h-5 hover:text-shop_light_green hoverEffect'/>
      <span className='absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full font-semibold flex items-center justify-center'>0</span>
    </Link>
  )
}

export default FavoriteButton