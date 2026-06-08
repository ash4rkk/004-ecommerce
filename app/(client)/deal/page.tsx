import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { Title } from '@/components/ui/text';
import { getDealProducts } from '@/sanity/queries';
import React from 'react';

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className='py-10'>
      <Container>
        <Title className='mb-5  underline-offset-4 decoration-1 text-lg font-semibold uppercase tracking-wide'>
          Hot Deals of the Week
        </Title>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5'>
          {products?.map((product, index) => (
            <ProductCard key={product?._id} product={product} index={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
