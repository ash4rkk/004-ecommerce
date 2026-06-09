'use client';
import { DATA_headerData } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function HeaderMenu({ className }: { className?: string }) {
  const pathname = usePathname(); // ex. '/blog

  return (
    <div className='hidden md:inline-flex w-1/3 justify-center items-center gap-7 text-sm capitalize text-gray-500'>
      {DATA_headerData?.map((item) => (
        <Link
          href={item?.href}
          key={item?.title}
          className={`hover:text-accent-p py-2 hoverEffect text-nowrap relative group ${pathname === item?.href && 'text-ink'}`}
        >
          {item?.title}
        </Link>
      ))}
    </div>
  );
}

export default HeaderMenu;
