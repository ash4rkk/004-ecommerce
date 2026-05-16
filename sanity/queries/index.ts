import { Brand, Category } from '@/sanity.types';
import { sanityFetch } from '../lib/live';
import { BRANDS_QUERY, LATEST_BLOG_QUERY } from './query';
export type CategoryWithCount = Category & { productCount: number };
const getCategories = async (quantity?: number) => {
  try {
    const query =
      quantity ?
        /* groq */ `*[_type == 'category'] {
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
      } | order(productCount desc) [0...$quantity] `
      : /* groq */ `*[_type == 'category'] {
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
      } | order(productCount desc)`;

    const { data } = await sanityFetch({ query, params: quantity ? { quantity } : {} });
    return data as CategoryWithCount[];
  } catch (error) {
    console.log('Error fetching categories', error);
    return [] as CategoryWithCount[];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return (data as Brand[]) ?? [];
  } catch (error) {
    console.log('Error fetching all brands', error);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? []
  } catch (error) {
    console.log('Error fetching latest blog', error);
    return []
  }
};

export { getCategories, getAllBrands, getLatestBlogs };
