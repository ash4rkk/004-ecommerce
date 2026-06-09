import Image from 'next/image';
import { Title } from './ui/text';
import { Category, Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { CategoryWithCount } from '@/sanity/queries';
interface Props {
  categories: CategoryWithCount[];
}
const HomeCategories = ({ categories }: Props) => {
  return (
    <div className='bg-ink border border-dark_blue/20 my-10 md:my-20 p-5 lg:p-7 rounded-md'>
      <Title className='text-ink-muted pb-3'>Popular Categories</Title>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {categories?.map((category) => (
          <div
            key={category?._id}
            className='bg-surface rounded-md p-5 flex items-center gap-3 group'
          >
            <Link 
            href={`/category/${category?.slug?.current}`} 
            // href={{pathname: '/shop', query: { category: category?.slug?.current }}} 
            className='flex items-center gap-3'
            >
            {/* Image */}
            {category?.image && (
              <div className='overflow-hidden hoverEffect w-20 h-20 p-1'>
                  <Image
                    src={urlFor(category?.image).url()}
                    alt='categoryImage'
                    width={500}
                    height={500}
                    className='w-full h-full object-contain group-hover:scale-110 hoverEffect'
                  />
              </div>
            )}
            {/* Title */}
            <div className='space-y-2 '>
              <h3 className='text-base text-ink font-semibold'>{category?.title}</h3>
              <p className='text-sm text-gray-500'>
                <span className='font-bold text-lg text-accent-p'>{`${category?.productCount}`}</span>{' '}
                items Available
              </p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
