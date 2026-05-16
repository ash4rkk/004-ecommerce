import React, { FC } from 'react';
import Logo from './Logo';
import { X } from 'lucide-react';
import { DATA_headerData } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname()
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose) 
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl text-white hoverEffect ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}
    >
      <div ref={sidebarRef} className='min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop_dark_green flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-5'>
          <Logo
            className='text-white'
            spanDesign='group-hover:text-white'
          />
          <button
            className='hover:text-shop_light_green hoverEffect'
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className='flex flex-col items-start space-y-3.5 font-semibold tracking-wide'>
          {DATA_headerData?.map((item) => (
            <Link
              className={`hover:text-shop_light_green hoverEffect ${pathname === item?.href && 'text-shop_light_green' }`}
              href={item?.href}
              key={item?.title}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
