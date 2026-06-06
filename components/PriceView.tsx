import React from 'react';
import PriceFormatter from './PriceFormatter';
interface Props {
  price?: number | undefined;
  discount?: number | undefined;
  className?: string;
}
const PriceView = ({ price, discount, className }: Props) => {
  return (
      <div className='flex items-center gap-2'>
        <PriceFormatter
          amount={price}
          className='text-ink'
        />
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className='text-shop_light_text font-normal line-through '
          />
        )}
      </div>
  );
};

export default PriceView;
