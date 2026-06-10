"use client";
import { cn } from "@/lib/utils";
import type { ProductCardProduct } from "@/lib/product-types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  product: ProductCardProduct;
  className?: string;
}

const AddToWishlistButton = ({ product, className }: Props) => {
  const { favoriteProduct, addToFavorite } = useStore();

  const existingProduct =
    favoriteProduct?.find((item) => item?._id === product?._id) ?? null;

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!product?._id) return;
    const isExisting = !!existingProduct;
    addToFavorite(product).then(() => {
      toast.success(isExisting ? "Product removed" : "Product added");
    });
  };
  return (
    <div
      className={cn(
        className,
      )}
    >
<button
  type="button"
  aria-pressed={!!existingProduct}
  aria-label={existingProduct ? "Remove from wishlist" : "Add to wishlist"}
  onClick={handleFavorite}
  className={cn(
    " p-2 active:scale-95 shadow hoverEffect rounded-full",
    "hover:cursor-pointer transition-colors",
    existingProduct ? "bg-ink text-white" : "bg-white "
  )}
>
  <Heart size={18} aria-hidden="true" />
</button>
    </div>
  );
};

export default AddToWishlistButton;
