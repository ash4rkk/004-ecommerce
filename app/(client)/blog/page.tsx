import Container from '@/components/Container'
import { Title } from '@/components/ui/text'
import { urlFor } from '@/sanity/lib/image'
import { getAllBlogs } from '@/sanity/queries'
import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogPage = async () => {
  const blogs = await getAllBlogs(6)
  return (
    <div>
    <Container className='py-12'>
      <Title className='font-semibold'>Blog page</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10">
        {blogs?.map((blog) => (
          <div key={blog?._id} className="rounded-md overflow-hidden group">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
              <Image
                src={urlFor(blog?.mainImage).url()}
                alt="blogImage"
                width={500}
                height={500}
                className="w-500 h-500 max-h-80 object-cover"
                
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
              <Link className='text-base font-semibold text-ink tracking-wide mt-3 line-clamp-2 hover:text-accent-p hoverEffect' href={`/blog/${blog?.slug?.current}`}>{blog?.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </div>
  )
}

export default BlogPage