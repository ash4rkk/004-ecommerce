import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import { Heart } from 'lucide-react';
import React from 'react';

interface Props {
  product?: Product;
  className?: string;
}

const AddToWishlistButton = ({ product, className }: Props) => {
  return (
    <div className={cn('absolute top-2 right-2 z-10', className)}>
      <div className={`p-1 rounded-full hover:bg-shop_dark_green hover:text-white hoverEffect bg-shop_lighter_bg`}>
        <Heart size={18} />
      </div>
    </div>
  );
};

export default AddToWishlistButton;
