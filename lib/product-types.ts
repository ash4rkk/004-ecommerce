import type { Product, SHOP_QUERY_RESULT } from "@/sanity.types";

/** Product from list queries with categories dereferenced to title strings. */
export type ProductListItem = SHOP_QUERY_RESULT[number];

/** Product shape accepted by ProductCard, cart, and wishlist actions. */
export type ProductCardProduct = Omit<Product, "categories"> & {
  categories?: Product["categories"] | Array<string | null> | null;
};
