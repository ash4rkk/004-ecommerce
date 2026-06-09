import BlogContent from '@/components/BlogContent';
import Container from '@/components/Container';
import { urlFor } from '@/sanity/lib/image';
import { getSingleBlog } from '@/sanity/queries';
import dayjs from 'dayjs';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    return { title: 'Blog nie znaleziony' };
  }

  return {
    title: blog.title,
    description: blog.title,
  };
}

const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) return notFound();

  const publishedDate = blog.publishedAt
    ? dayjs(blog.publishedAt).format('MMMM D, YYYY')
    : null;

  return (
    <article className="bg-background pb-16 md:pb-24">
      <Container className="py-8 md:py-12">
        <Link
          href="/blog"
          className="hoverEffect group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent-p"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Wróć do bloga
        </Link>

        <header className="mx-auto max-w-3xl text-center">
          {blog.blogcategories && blog.blogcategories.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
              {blog.blogcategories.map((category, index) => (
                <span
                  key={category.slug ?? category.title ?? index}
                  className="rounded-full bg-accent-p px-3 py-1 text-xs font-semibold tracking-wide text-white"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:gap-6">
            {blog.author?.name && (
              <div className="flex items-center gap-2.5">
                {blog.author.image && (
                  <Image
                    src={urlFor(blog.author.image).width(80).height(80).url()}
                    alt={blog.author.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-surface"
                  />
                )}
                <span className="font-medium text-ink">{blog.author.name}</span>
              </div>
            )}

            {publishedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar size={15} className="text-accent-p" />
                <time dateTime={blog.publishedAt}>{publishedDate}</time>
              </div>
            )}

            {blog._updatedAt && (
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-accent-p" />
                <span>
                  Aktualizacja: {dayjs(blog._updatedAt).format('MMMM D, YYYY')}
                </span>
              </div>
            )}
          </div>
        </header>
      </Container>

      {blog.mainImage && (
        <Container className="mb-10 md:mb-14">
          <div className="overflow-hidden rounded-2xl shadow-(--shadow)">
            <Image
              src={urlFor(blog.mainImage).width(1400).height(700).url()}
              alt={blog.title || 'Blog image'}
              width={1400}
              height={700}
              priority
              className="aspect-16/7 w-full object-cover"
            />
          </div>
        </Container>
      )}

      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-line bg-white p-6 md:p-10 lg:p-12">
            <BlogContent body={blog.body} />
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="hoverEffect inline-flex items-center gap-2 rounded-full bg-accent-p px-6 py-2.5 text-sm font-semibold tracking-wide text-white hover:bg-accent-p/90"
            >
              <ArrowLeft size={16} />
              Zobacz więcej artykułów
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
};

export default SingleBlogPage;
