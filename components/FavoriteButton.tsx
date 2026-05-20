import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/sanity.types';
interface Props {
  showProduct?: boolean;
  product?: Product | null;
}

function FavoriteButton({ showProduct = false, product }: Props) {
  return (
    <>
      {!showProduct ?
        <Link
          href={'/wishlist'}
          className='group relative'
        >
          <Heart className='w-5 h-5 hover:text-shop_light_green hoverEffect' />
          <span className='absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full font-semibold flex items-center justify-center'>
            0
          </span>
        </Link>
      : <button className='group relative hover:border-shop_light_green hoverEffect border border-shop_light_green/80 hover:text-shop_light_green p-1 px-1.5 rounded-sm'>
          <Heart className='text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-0.5 w-5 h-5' />
        </button>
      }
    </>
  );
}

export default FavoriteButton;
