"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const AddToWishlistButton = ({ product, className }: Props) => {
  const { favoriteProduct, addToFavorite } = useStore();

  const existingProduct =
    favoriteProduct?.find((item) => item?._id === product?._id) ?? null;

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
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
        "absolute top-4 right-4 z-10 hover:cursor-pointer",
        className,
      )}
    >
      <div
        onClick={handleFavorite}
        className={`hover:bg-surface p-2 shadow hoverEffect rounded-full p-1 ${existingProduct ? "bg-ink text-white" : "bg-white"}`}
      >
        <Heart size={18} />
      </div>
    </div>
  );
};

export default AddToWishlistButton;
