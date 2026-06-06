import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

function Logo({ className, spanDesign }: { className?: string; spanDesign?: string }) {
  return (
    <Link href={'/'} className='group inline-flex'>
      <h2
        className={cn(
          'text-2xl text-ink font-black tracking-wider uppercase group-hover:text-accent-p hoverEffect  font-sans',
          className
        )}
      >
        Shop
        <span className={cn('text-accent-p group-hover:text-ink hoverEffect', spanDesign)}>
          e
        </span>
        <span className='text-2xl text-ink font-black tracking-wider uppercase group-hover:text-accent-p hoverEffect font-sans'>k</span>
      </h2>
    </Link>
  );
}

export default Logo;
