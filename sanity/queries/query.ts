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

const SHOP_PRICE_BOUNDS_QUERY = defineQuery(`{
  "minPrice": math::min(*[
    _type == "product"
    && (count($selectedCategories) == 0 || references(*[_type == "category" && slug.current in $selectedCategories]._id))
    && (count($selectedBrands) == 0 || references(*[_type == "brand" && slug.current in $selectedBrands]._id))
    && defined(price)
  ].price),
  "maxPrice": math::max(*[
    _type == "product"
    && (count($selectedCategories) == 0 || references(*[_type == "category" && slug.current in $selectedCategories]._id))
    && (count($selectedBrands) == 0 || references(*[_type == "brand" && slug.current in $selectedBrands]._id))
    && defined(price)
  ].price)
}`);

const SHOP_QUERY = defineQuery(`
  *[_type == 'product'
    && (count($selectedCategories) == 0 || references(*[_type == "category" && slug.current in $selectedCategories]._id))
    && (count($selectedBrands) == 0 || references(*[_type == "brand" && slug.current in $selectedBrands]._id))
    && price >= $minPrice && price <= $maxPrice
  ]
  | order(name asc) {
    ...,"categories": categories[]->title
  }
  `);

const ADDRESSES_QUERY = defineQuery(
  `*[_type =='address' && email == $userEmail] | order(publishedAt desc)`,
);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderDate desc) {
  ...,
  products[] {
    ...,
    product->
  }
}`);

const ALL_BLOGS_QUERY =
  defineQuery(`*[_type == 'blog'] | order(publishedAt desc) [0...$quantity]{
  ...,
  blogcategories[]->{title}
}`);

const SINGLE_BLOG_QUERY =
  defineQuery(`*[_type == 'blog' && slug.current == $slug][0]{
  ...,
  author -> {
    name,
    image,
  },
  blogcategories[] -> {
    title,
    "slug": slug.current,
  },
} `);
const SEARCH_PRODUCTS_QUERY = defineQuery(`*[_type == 'product' && name match $q] | order(name asc) [0...8] {
  _id, name, slug, price, images, 'categories': categories[]->title
}`)

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  SHOP_PRICE_BOUNDS_QUERY,
  SHOP_QUERY,
  ADDRESSES_QUERY,
  MY_ORDERS_QUERY,
  ALL_BLOGS_QUERY,
  SINGLE_BLOG_QUERY,
  SEARCH_PRODUCTS_QUERY
};
