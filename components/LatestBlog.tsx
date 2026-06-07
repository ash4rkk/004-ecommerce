import React from 'react';
import { Title } from './ui/text';
import { getLatestBlogs } from '@/sanity/queries';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import dayjs from 'dayjs';

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className='mb-10 lg:mb-20'>
      <Title className='font-bold'>Latest Blog</Title>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
        {blogs.map((blog) => (
          <div key={blog?._id} className=' overflow-hidden rounded-lg'>
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt='blogImage'
                  width={500}
                  height={500}
                  className='w-full h-55 max-h-80 object-cover hover:scale-105 transition-all hoverEffect'
                />
              </Link>
            )}
            <div className='bg-surface p-5 '>
              <div className='text-xs flex items-center justify-between gap-5'>
                <div className='flex items-center relative group cursor-pointer'>
                  {blog?.blogcategories?.map((item, index) => (
                    <p
                      key={index}
                      className='font-semibold bg-accent-p py-1 px-2 rounded-full text-white tracking-wider line-clamp-1'
                    >
                      {item?.title}
                    </p>
                  ))}

                </div>
                <p className='flex items-center gap-1 text-gray-500 relative group hover:cursor-pointer hover:text-accent-p hoverEffect'>
                  <Calendar size={15} /> <span className='line-clamp-1'>
                    {dayjs(blog.publishedAt).format('MMMM D, YYYY')}
                    </span>
                </p>
              </div>
              <Link className='text-base font-semibold text-ink tracking-wide mt-3 line-clamp-2 hover:text-shop_dark_green hoverEffect' href={`/blog/${blog?.slug?.current}`}>{blog?.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
