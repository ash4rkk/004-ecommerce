import React from 'react';
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';
interface Props {
  price?: number | undefined;
  discount?: number | undefined;
  className?: string;
  clasNamePrev?: string;
}
const PriceView = ({ price, discount, className, classNamePrev }: Props) => {
  return (
      <div className='flex flex-col items-center'>
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={cn('text-shop_light_text font-normal line-through', classNamePrev)}
          />
        )}
        <PriceFormatter
          amount={price}
          className={cn('text-ink text-lg', className)}
        />
      </div>
  );
};

export default PriceView;
