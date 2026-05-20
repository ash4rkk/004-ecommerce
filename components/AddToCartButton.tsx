'use client';
import { Product } from '@/sanity.types';
import React from 'react';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
interface Props {
  product?: Product | null;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    
  }
  return (
    <div className={cn('w-full', className)}> 
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          'w-full bg-shop_dark_green/80 text-shop_light_bg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide hover:text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect'
        )}
      >
        <ShoppingBag />
        {isOutOfStock ? 'Out of stock' : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default AddToCartButton;
