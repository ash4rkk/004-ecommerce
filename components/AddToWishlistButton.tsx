"use client";
import { cn } from "@/lib/utils";
import type { ProductCardProduct } from "@/lib/product-types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  product: ProductCardProduct;
  className?: string;
}

const AddToWishlistButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ product, className, onClick, ...props }, ref) => {
    const { favoriteProduct, addToFavorite } = useStore();
    const { isSignedIn } = useAuth()
    const existingProduct =
      favoriteProduct?.find((item) => item?._id === product?._id) ?? null;

    const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick?.(e);

      if (!product?._id) return;
      const isExisting = !!existingProduct;
      addToFavorite(product).then(() => {
        toast.success(isExisting ? "Product removed" : "Product added");
      });
    };
    if (!isSignedIn) return null
    return (

      <button
        ref={ref}
        type="button"
        aria-pressed={!!existingProduct}
        aria-label={
          existingProduct ? "Remove from wishlist" : "Add to wishlist"
        }
        onClick={handleFavorite}
        className={cn(
          "hoverEffect rounded-full p-1.5 shadow transition-colors active:scale-95 hover:cursor-pointer",
          existingProduct ? "bg-ink text-white" : "bg-white",
          className,
        )}
        {...props}
      >
        <Heart size={18} aria-hidden="true" />
      </button>
    );
  },
);

AddToWishlistButton.displayName = "AddToWishlistButton";

export default AddToWishlistButton;
