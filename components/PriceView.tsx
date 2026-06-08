import React from 'react';
import PriceFormatter from './PriceFormatter';
interface Props {
  price?: number | undefined;
  discount?: number | undefined;
  className?: string;
}
const PriceView = ({ price, discount, className }: Props) => {
  return (
      <div className='flex flex-col items-center'>
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className='text-shop_light_text font-normal line-through '
          />
        )}
        <PriceFormatter
          amount={price}
          className='text-ink text-lg'
        />
      </div>
  );
};

export default PriceView;
