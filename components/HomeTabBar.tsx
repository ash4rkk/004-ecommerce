import { DATA_productType } from '@/constants/data';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}
const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-5'>
      <div className='flex items-center gap-3 text-sm font-semibold'>
        {DATA_productType?.map((item) => (
          <Button
            key={item?.title}
            onClick={() => onTabSelect(item?.title)}
            className={`border border-shop_light_green/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_dark_green/80 hover:border-shop_light_green hover:text-white hoverEffect bg-white text-black ${selectedTab === item?.title ? 'bg-shop_dark_green/80 text-white border-shop_light_green' : 'bg-shop_light_green/20'}`}
          >
            {item?.title}
          </Button>
        ))}
      </div>
      <Link
        href={'/shop'}
        className='border border-shop_light_green/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_dark_green/80 hover:border-shop_light_green hover:text-white hoverEffect bg-white text-black'
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabBar;
