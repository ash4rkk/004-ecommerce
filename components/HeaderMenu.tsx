'use client';
import { DATA_headerData } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function HeaderMenu({ className }: { className?: string }) {
  const pathname = usePathname(); // ex. '/blog

  return (
    <div className='hidden md:inline-flex w-1/3 justify-center items-center gap-7 text-sm capitalize font-semibold text-lightColor'>
      {DATA_headerData?.map((item) => (
        <Link
          href={item?.href}
          key={item?.title}
          className={`hover:text-shop_dark_green hoverEffect text-nowrap relative group ${pathname === item?.href && 'text-gray-900'}`}
        >
          {item?.title}

          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gray-800 group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item?.href && 'w-1/2'}`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-gray-800 group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item?.href && 'w-1/2'}`}
          />
        </Link>
      ))}
    </div>
  );
}

export default HeaderMenu;
