import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { Title } from '@/components/ui/text';
import { getDealProducts } from '@/sanity/queries';
import React from 'react';

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className='py-10 bg-white'>
      <Container>
        <Title className='mb-5 underline underline-offset-4 decoration-1 text-md font-bold uppercase tracking-wide'>
          Hot Deals of the Week
        </Title>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5'>
          {products?.map((product) => (
            //! Fix type 
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
