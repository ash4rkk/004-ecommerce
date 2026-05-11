import React from 'react';
import { FaYoutube, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from './ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';
interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: 'Youtube',
    href: 'https://www.youtube.com',
    icon: <FaYoutube className='h-5 w-5' />,
  },
  {
    title: 'Github',
    href: 'https://www.github.com',
    icon: <FaGithub className='h-5 w-5' />,
  },
  {
    title: 'Facebook',
    href: 'https://www.youtube.com',
    icon: <FaFacebook className='h-5 w-5' />,
  },
  {
    title: 'Instagram',
    href: 'https://www.youtube.com',
    icon: <FaInstagram className='h-5 w-5' />,
  },
];

function SocialMedia({ className, iconClassName, tooltipClassName }: Props) {
  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-3.5', className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                key={item?.title}
                target='_blank'
                rel='noopener noreferrer'
                href={item?.href}
                className={cn(
                  'p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffects',
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className={cn('text-darkColor bg-white font-semibold', tooltipClassName)}>
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export default SocialMedia;
