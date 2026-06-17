import type { ProductCardProduct } from "@/lib/product-types";
import { urlFor } from "@/sanity/lib/image";
import { CircleSmall, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import { Title } from "./ui/text";
import ProductCardActions from "@/actions/ProductCardActions";
import { cn } from "@/lib/utils";
import ProductStockIcon from "./ProductStockIcon";

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
    <div className="bg-surface group rounded-lg text-sm duration-200">
      <div className="group bg-surface relative overflow-hidden rounded-lg">
        {product?.images?.[0] && (
          <div
            style={{ backgroundColor: `var(--tone-${toneNumber})/20` }}
            className="rounded-lg p-2 md:px-3 md:pt-3"
          >
            <Link className="" href={`/product/${product?.slug?.current}`}>
              <Image
                src={urlFor(product?.images[0]).url()}
                alt="ProductImage"
                loading="lazy"
                style={{ backgroundColor: `var(--tone-${toneNumber})` }}
                width={700}
                height={700}
                className={`h-44 w-full overflow-hidden rounded-lg object-contain transition-transform duration-200 ease-out md:h-64 ${product?.stock !== 0 ? "hover:scale-104" : "opacity-50"}`}
              />
            </Link>
          </div>
        )}
        <AddToWishlistButton
          className="absolute top-4 right-4 z-10"
          product={product}
        />
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
        <div className="flex items-center justify-between gap-1">
          {categoryLabel && (
            <p className="text-ink-muted line-clamp-1 text-xs uppercase">
              {categoryLabel}
            </p>
          )}
          <div className="flex items-center gap-0.5">
            <StarIcon size={13} className="fill-ink" />
            <p className="text-ink-muted text-xs tracking-wide">
              {product?.averageRating}
            </p>
            <ProductStockIcon stock={product?.stock} lowStockThreshold={100}/>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Title className="line-clamp-2 min-h-[2lh] min-w-0 flex-1 text-sm font-semibold md:text-lg">
            {product?.name}
          </Title>
          <div className="flex shrink-0 flex-col items-end gap-1.5"></div>
        </div>

        <ProductCardActions product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
