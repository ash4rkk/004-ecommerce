import React from 'react';
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';
interface Props {
  price?: number | undefined;
  discount?: number | undefined;
  className?: string;
  classNamePrev?: string;
}
const PriceView = ({ price, discount, className, classNamePrev }: Props) => {
  return (
<div className="flex flex-col items-center">
  {price != null && (
    <PriceFormatter
      amount={price + ((discount ?? 0) * price) / 100}
      className={cn(
        "text-ink-muted/50 font-normal line-through",
        !discount && "invisible",
        classNamePrev,
      )}
    />
  )}
  <PriceFormatter amount={price} className={cn("text-ink text-lg", className)} />
</div>
  );
};

export default PriceView;
