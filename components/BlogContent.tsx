import { urlFor } from '@/sanity/lib/image';
import type { BlockContent } from '@/sanity.types';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-ink/80">{children}</p>
    ),
    h1: ({ children }) => (
      <h2 className="mb-4 mt-10 text-3xl font-bold tracking-tight text-ink">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="mb-4 mt-8 text-2xl font-semibold tracking-tight text-ink">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="mb-3 mt-6 text-xl font-semibold text-ink">{children}</h4>
    ),
    h4: ({ children }) => (
      <h5 className="mb-3 mt-5 text-lg font-semibold text-ink">{children}</h5>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-accent-p bg-surface px-6 py-4 text-lg italic leading-relaxed text-ink/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-ink/80">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent-p underline decoration-accent-p/40 underline-offset-2 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10 overflow-hidden rounded-xl">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog image'}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const BlogContent = ({ body }: { body?: BlockContent }) => {
  if (!body?.length) return null;

  return (
    <div className="blog-content">
      <PortableText value={body} components={components} />
    </div>
  );
};

export default BlogContent;
