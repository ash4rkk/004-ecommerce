'use client';
import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';
interface Props {
  images?: Product['images'];
  isStock?: boolean;
}
const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);
  return (
    <div className='w-full md:w-1/2 space-y-2 md:space-y-4'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-h-137.5 min-h-117.5 border border-darkColor/10 rounded-md group overflow-hidden'
        >
          <Image
            src={urlFor(active).url()}
            alt='productImage'
            width={700}
            height={700}
            priority
            className={`w-full h-96 max-h-137.5 min-h-125 object-contain group-hover:scale-110 hoverEffect rounded-md ${!isStock && 'opacity-50'}`}
          />
        </motion.div>
      </AnimatePresence>
      <div className='grid grid-cols-6 gap-2 h-20 md:h-24'>
        {images?.map((image) => (
          <button 
          key={image?._key}
          onClick={() => setActive(image)}
          className={`border border-muted overflow-hidden ${active?._key === image?._key ? 'border-darkColor' : ''}`}
          >
            <Image 
              src={urlFor(image).url()}
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className='w-full h-auto object-contain'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
