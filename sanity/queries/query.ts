import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc)`);

const LATEST_BLOG_QUERY =
  defineQuery(`*[_type == 'blog' && isLatest == true] | order(name asc) {
  ...,
  blogcategories[]->{
    title
  }
}`);

const DEAL_PRODUCTS =
  defineQuery(`*[_type == 'product' && status == 'hot'] | order(name asc) {
  ...,
  'categories': categories[] -> title
}`);

const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == 'product' && slug.current == $slug] | order(name asc) [0]
  `);

const BRAND_QUERY = defineQuery(
  `*[_type == 'product' && slug.current == $slug]{'brandName': brand -> title}`,
);

const SHOP_QUERY = defineQuery(`
  *[_type == 'product'
    && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
    && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
    && price >= $minPrice && price <= $maxPrice
  ]
  | order(name asc) {
    ...,"categories": categories[]->title
  }
  `);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  SHOP_QUERY
};
