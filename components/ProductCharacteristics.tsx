import { Product } from '@/sanity.types';
import { getBrand } from '@/sanity/queries';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface Props {
  product?: Product | null;
}
const ProductCharacteristics = async ({ product }: Props) => {
  const brand = await getBrand(product?.slug?.current as string);
  return (
    <Accordion
      type='single'
      collapsible
      defaultValue='item-1'
    >
      <AccordionItem value='item-1'>
        <AccordionTrigger>{product?.name}</AccordionTrigger>
        <AccordionContent>
          <p className='flex items-center justify-between'>
            Brand:{' '}
            {brand && <span className='font-semibold tracking-wide'>{brand[0]?.brandName}</span>}
          </p>
          <p className='flex items-center justify-between'>
            Collection:{' '}
            <span className='font-semibold tracking-wide'>2025</span>
          </p>
          <p className='flex items-center justify-between'>
            Type:{' '}
            <span className='font-semibold tracking-wide'>{product?.variant}</span>
          </p>
          <p className='flex items-center justify-between'>
            Stock:{' '}
            <span className='font-semibold tracking-wide'>{product?.stock ? 'Available' : 'Out of Stock'}</span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
