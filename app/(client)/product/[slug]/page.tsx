import AddToCartButton from '@/components/AddToCartButton';
import Container from '@/components/Container';
import FavoriteButton from '@/components/FavoriteButton';
import ImageView from '@/components/ImageView';
import PriceView from '@/components/PriceView';
import ProductCharacteristics from '@/components/ProductCharacteristics';
import { getProductBySlug } from '@/sanity/queries';
import { CornerDownLeft, StarIcon, Truck } from 'lucide-react';
import React from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { RxBorderSplit } from 'react-icons/rx';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiShare2 } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import ProductDetailsReviews from '@/components/ProductDetailsReviews';
import { notFound } from 'next/navigation';

const SingleProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const isStock = (product?.stock as number) > 0;
  if (!product) {
    return notFound()
  }
  return (
    <>
    <Container className='flex flex-col md:flex-row gap-10 py-10'>
      {product?.images && (
        <ImageView
          images={product?.images}
          isStock={isStock}
        />
      )}
      <div className='w-full md:w-1/2 flex flex-col gap-5'>
        <div className='space-y-1 '>
          <h2 className='text-2xl font-bold'>{product?.name}</h2>
          <p className='text-sm text-gray-900 tracking-wide'>{product?.description}</p>
          <div className='flex items-center gap-0.5 text-xs'>
            {/* //TODO Create complex component for star ratings, and half's */}
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className='text-shop_light_green'
                fill={index < (product?.averageRating as number) - 1 ? '#93D991' : '#ababab'}
              />
            ))}
            <p className='font-semibold'>{product?.totalReviews}</p>
          </div>
        </div>
        <div className='space-y-2 border-t border-b border-gray-200 py-2'>
          <PriceView
            className='text-lg font-bold'
            price={product?.price}
            discount={product?.discount}
          />
          <p
            className={`px-4 inline-block text-sm text-center py-1.5 font-semibold rounded-lg ${product?.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
          >
            {(product?.stock as number) > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
        <div className='flex items-center gap-2.5 lg:gap-5'>
          <AddToCartButton
            className={'flex-1'}
            product={product}
          />
          <FavoriteButton
            showProduct={true}
            product={product}
          />
        </div>
        <ProductCharacteristics product={product} />
        <div className='flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2'>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <RxBorderSplit className='text-lg' />
            <p>Compare color</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <FaRegQuestionCircle className='text-lg' />
            <p>Ask a question</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <TbTruckDelivery className='text-lg' />
            <p>Delivery & Return</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
            <FiShare2 className='text-lg' />
            <p>Share</p>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5'>
            <Truck
              size={30}
              className='text-shop_orange'
            />
            <div>
              <p className='text-base font-semibold text-black'>Free Delivery</p>
              <p className='text-sm text-gray-500 underline underline-offset-2'>
                {' '}
                Enter your Postal Code for Delivery Availability
              </p>
            </div>
          </div>
          <div className='border border-lightColor/25 border-b-1 p-3 flex items-center gap-2.5'>
            <CornerDownLeft
              size={30}
              className='text-shop_orange'
            />
            <div>
              <p className='text-base font-semibold text-black'>Return Delivery</p>
              <p className='text-sm text-gray-500 underline underline-offset-2'>
                {' '}
                Free 30 days Delivery Return
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
            <ProductDetailsReviews />
    </>
  );
};

export default SingleProductPage;
