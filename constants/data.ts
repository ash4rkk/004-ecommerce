import { formatPrice } from '@/lib/formatPrice';
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react';

export const DATA_headerData = [
  { title: 'Home', href: '/' },
  { title: 'Shop', href: '/shop' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
  { title: 'Hot Deal', href: '/deal' },
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

export const DATA_review = [
  {
    name: "Sarah M.",
    rating: 5,
    date: "March 12, 2025",
    comment:
      "Absolutely love this product! The sound quality is outstanding and the battery lasts way longer than expected. Best purchase I've made this year.",
  },
  {
    name: "James K.",
    rating: 4,
    date: "February 28, 2025",
    comment:
      "Great build quality and the Bluetooth connection is rock solid. Only minor complaint is the carry case could be better. Overall very happy.",
  },
  {
    name: "Anna W.",
    rating: 5,
    date: "January 15, 2025",
    comment:
      "Incredible audio experience. I use it daily for work calls and music — crystal clear every time. The aluminum finish looks premium too.",
  },
  {
    name: "Tom R.",
    rating: 3,
    date: "December 4, 2024",
    comment:
      "Decent product for the price. Sound is good but the bass could be punchier. Setup was straightforward and it works with all my devices.",
  },
  {
    name: "Emily C.",
    rating: 5,
    date: "November 20, 2024",
    comment:
      "Exceeded all my expectations. Paired instantly with my phone and laptop. The 18-hour battery claim is accurate — I barely need to charge it.",
  },
]

export const DATA_PRICE_RANGE_ARRAY = [
  { title: 'Under 100', value: '0-100'},
  { title: '100 - 200', value: '100-300'},
  { title: '200 - 300', value: '200-300'},
  { title: '300 - 500', value: '300-500'},
  { title: 'Over 500', value: '500-10000'},  
]