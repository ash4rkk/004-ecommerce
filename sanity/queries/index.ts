import { Brand, Category } from '@/sanity.types';
import { sanityFetch } from '../lib/live';
import { BRANDS_QUERY, DEAL_PRODUCTS, LATEST_BLOG_QUERY, PRODUCT_BY_SLUG_QUERY } from './query';
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
    return data ?? [];
  } catch (error) {
    console.log('Error fetching latest blog', error);
    return [];
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log('Error fetching deal products', error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      }
    })
    return product?.data || null
  } catch (error) {
    console.log('Error fetching product by slug', error)  
    return null  
  }
}

export { 
  getCategories, 
  getAllBrands, 
  getLatestBlogs, 
  getDealProducts,
  getProductBySlug 
};
