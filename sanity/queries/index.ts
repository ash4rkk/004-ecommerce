import { Brand, Category } from '@/sanity.types';
import { sanityFetch } from '../lib/live';
import { BRANDS_QUERY } from './query';

const getCategories = async (quantity?: number) => {
  try {
    const query =
      quantity ?
        /* groq */ `*[_type == 'category'] | order(name asc) [0...$quantity] {
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
      }`
      : /* groq */ `*[_type == 'category'] | order(name asc) {
        ...,
        "productCount": count(*[_type == "product" && references(^._id)])
      }`;

    const { data } = await sanityFetch({ query, params: quantity ? { quantity } : {} });
    return data as Category[];
  } catch (error) {
    console.log('Error fetching categories', error);
    return [] as Category[];
  } 
};

const getAllBrands = async () => {
  try {
    const {data} = await sanityFetch({query: BRANDS_QUERY})
    return data as Brand[] ?? []
  } catch (error) {
    console.log('Error fetching all brands', error)
    return []
  }
}
export {getCategories, getAllBrands}