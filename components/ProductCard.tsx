import type { ProductCardProduct } from "@/lib/product-types";
import { urlFor } from "@/sanity/lib/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import { Title } from "./ui/text";
import ProductCardActions from "@/actions/ProductCardActions";

interface Props {
  product: ProductCardProduct;
  index?: number;
}

const formatCategories = (
  categories: ProductCardProduct["categories"],
): string => {
  if (!categories?.length) return "";
  return categories
    .map((cat) => (typeof cat === "string" ? cat : null))
    .filter(Boolean)
    .join(", ");
};

const ProductCard = ({ product, index = 0 }: Props) => {
  const toneNumber = (index % 8) + 1; // 1-8 cycle
  const categoryLabel = formatCategories(product?.categories);
  return (
    <div className="bg-surface duration-200 group rounded-lg text-sm">
      <div className="group bg-shop_light_bg relative overflow-hidden rounded-lg">
        {product?.images?.[0] && (
          <div
            style={{ backgroundColor: `var(--tone-${toneNumber})/20` }}
            className="rounded-lg  p-2 md:px-3 md:pt-3"
          >
            <Link className="" href={`/product/${product?.slug?.current}`}>
              <Image
                src={urlFor(product?.images[0]).url()}
                alt="ProductImage"
                loading="lazy"
                style={{ backgroundColor: `var(--tone-${toneNumber})` }}
                width={700}
                height={700}
                className={`h-50 md:h-64 w-full overflow-hidden rounded-lg object-contain transition-transform  duration-200 ease-out ${product?.stock !== 0 ? "hover:scale-104" : "opacity-50"}`}
              />
            </Link>
          </div>
        )}
        <AddToWishlistButton className="absolute top-4 right-4 z-10" product={product} />
        {product?.status === "sale" && (
          <p className="absolute top-4 left-4 z-10 rounded-full bg-white p-1 px-2 shadow">
            Sale!
          </p>
        )}
        {product?.status === "new" && (
          <p className="absolute top-4 left-4 z-10 rounded-full bg-white p-1 px-2 shadow">
            New Arrival
          </p>
        )}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-4 left-4 z-10 rounded-full bg-white p-1 px-2 shadow"
          >
            <p>Bestseller</p>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2 p-3">
        {categoryLabel && (
          <p className="text-shop_light_text line-clamp-1 text-xs uppercase">
            {categoryLabel}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <Title className="line-clamp-2 min-w-0 min-h-[2lh] flex-1 text-lg font-semibold">
            {product?.name}
          </Title>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <div className="flex items-center gap-1">
              <StarIcon size={13} className="fill-ink" />
              <p className="text-shop_light_text text-xs tracking-wide">
                {product?.averageRating}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <p className="font-medium">In Stock</p>
              <p
                className={`font-semibold ${
                  product?.stock === 0 ? "text-red-600" : "text-accent-soft"
                }`}
              >
                {(product?.stock as number) > 0
                  ? product?.stock
                  : "unavailable"}
              </p>
            </div>
          </div>
        </div>

        <ProductCardActions product={product} />
      
      </div>
    </div>
  );
};

export default ProductCard;
