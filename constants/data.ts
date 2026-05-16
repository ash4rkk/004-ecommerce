import { formatPrice } from '@/lib/formatPrice';
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react';

export const DATA_headerData = [
  { title: 'Home', href: '/' },
  { title: 'Shop', href: '/shop' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
  { title: 'Hot Deal', href: 'deal' },
];

export const DATA_quickLinks = [
  { title: 'About us', href: '/about' },
  { title: 'Contact us', href: '/contact' },
  { title: 'Terms & Conditions', href: '/terms' },
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'FAQs', href: '/faqs' },
  { title: 'Help', href: '/help' },
];

export const DATA_categories = [
  { title: 'Mobiles', href: 'mobiles' },
  { title: 'Appliances', href: 'appliances' },
  { title: 'Smartphones', href: 'smartphones' },
  { title: 'Air Conditioners', href: 'air-conditioners' },
  { title: 'Washing Machine', href: 'washing-machine' },
  { title: 'Kitchen Appliances', href: 'kitchen-appliances' },
  { title: 'Gadget accessories', href: 'gadget-accessories' },
];
export const DATA_productType = [
  { title: 'Gadget', value: 'gadget' },
  { title: 'Appliances', value: 'appliances' },
  { title: 'Refrigerators', value: 'refrigerators' },
  { title: 'Others', value: 'others' },
];

export const DATA_shopByBrands = [
  {
    title: 'Free Delivery',
    description: `Free shipping over ${formatPrice(100)}`,
    icon: Truck, 
  },
  {
    title: 'Free Return',
    description: `Free shipping over ${formatPrice(100)}`,
    icon: GitCompareArrows, 
  },
  {
    title: 'Customer Support',
    description: `Friendly 24/7 customer support`,
    icon: Headset, 
  },
  {
    title: 'Money Back Guarantee',
    description: `Quality checked by our team`,
    icon: ShieldCheck, 
  },
];
