import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { FlameIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import { Title } from "./ui/text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: Props) => {
  const toneNumber = (index % 8) + 1; // 1-8 cycle
  return (
    <div className="bg-surface group rounded-lg text-sm">
      <div className="group bg-shop_light_bg rounded-lg relative overflow-hidden">
        {product?.images?.[0] && (
          <div
            style={{ backgroundColor: `var(--tone-${toneNumber})/20` }}
            className="p-2 md:px-3 rounded-lg md:pt-3"
          >
            <Link className="" href={`/product/${product?.slug?.current}`}>
              <Image
                src={urlFor(product?.images[0]).url()}
                alt="ProductImage"
                loading="lazy"
                style={{ backgroundColor: `var(--tone-${toneNumber})` }}
                width={700}
                height={700}
                className={`hoverEffect h-64 w-full overflow-hidden rounded-lg object-contain transition-transform ${product?.stock !== 0 ? "hover:scale-110" : "opacity-50"}`}
              />
            </Link>
          </div>
        )}
        <AddToWishlistButton product={product} />
        {product?.status === "sale" && (
          <p className=" bg-white hoverEffect absolute shadow top-4 left-4 z-10 rounded-full p-1 px-2">
            Sale!
          </p>
        )}
        {product?.status === "new" && (
          <p className=" bg-white hoverEffect absolute shadow top-4 left-4 z-10 rounded-full p-1 px-2">
            New Arrival
          </p>
        )}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className=" bg-white hoverEffect absolute shadow top-4 left-4 z-10 rounded-full p-1 px-2"
          >
            <p>Bestseller</p>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2 p-3">
        {product?.categories && (
          <p className="text-shop_light_text line-clamp-1 text-xs uppercase">
            {product?.categories?.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="line-clamp-1 text-sm">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={13}
                key={index}
                className={
                  index < 4
                    ? "text-accent-soft"
                    : "text-shop_lighter_text"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-shop_light_text text-xs tracking-wide">
            {product?.totalReviews}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`font-semibold ${product?.stock === 0 ? "text-red-600" : "text-accent-soft"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>
        <PriceView
          price={product?.price}
          discount={
            product?.discount && product.discount > 0
              ? product.discount
              : undefined
          }
          className="text-sm"
        />
        <AddToCartButton product={product} className="rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
