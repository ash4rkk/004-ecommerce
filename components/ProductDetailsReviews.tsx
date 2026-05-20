'use client';
import React, { useState } from 'react';
import Container from './Container';
import { Button } from './ui/button';

const ProductDetailsReviews = () => {
  const [details, setDetails] = useState('');
  return (
    <Container className=''>
      <div className='flex items-center w-full md:flex-row mb-10'>
        <div className='flex-col md:flex-row w-3/4 bg-shop_light_bg p-1  rounded-xl  gap-2.5'>
          <Button
            onClick={() => setDetails('desc')}
            className={`border border-lightColor/35 w-full  md:w-1/4 py-5 transition-all duration-300 text-black ${details === 'desc' ? 'bg-white' : 'bg-bg-shop_light_bg'}`}
          >
            Description
          </Button>
          <Button
            onClick={() => setDetails('info')}
            className={`border border-lightColor/35  py-5 md:w-1/4 transition-all duration-300 w-full text-black ${details === 'info' ? 'bg-white' : 'bg-bg-shop_light_bg'}`}
          >
            Additional Information
          </Button>
          <Button
            onClick={() => setDetails('rev')}
            className={`border border-lightColor/35 transition-all md:w-1/4 duration-300 py-5  w-full text-black ${details === 'rev' ? 'bg-white' : 'bg-bg-shop_light_bg'}`}
          >
            Reviews
          </Button>
        </div>
        <div className='mt-5 '>
          {details === 'desc' && (
            <p className=' '>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis tortor quis
              purus hendrerit aliquet. Donec in felis a ligula tempus efficitur. Aliquam sit amet
              dignissim ante, quis mattis risus. Nulla imperdiet, libero vel malesuada finibus,
              nulla tellus fermentum ligula, sed rutrum nibh dolor sit amet metus.
            </p>
          )}
          {details === 'info' && (
            <p className=' '>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis tortor quis
              purus hendrerit aliquet. Donec in felis a ligula tempus efficitur. Aliquam sit amet
              dignissim ante, quis mattis risus. Nulla imperdiet, libero vel malesuada finibus,
              nulla tellus fermentum ligula, sed rutrum nibh dolor sit amet metus.
            </p>
          )}
          {details === 'rev' && (
            <p className=' '>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis tortor quis
              purus hendrerit aliquet. Donec in felis a ligula tempus efficitur. Aliquam sit amet
              dignissim ante, quis mattis risus. Nulla imperdiet, libero vel malesuada finibus,
              nulla tellus fermentum ligula, sed rutrum nibh dolor sit amet metus.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailsReviews;
