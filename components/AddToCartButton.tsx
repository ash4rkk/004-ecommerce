"use client";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";
interface Props {
  product?: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id ?? "");
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    if (!product) return;
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`,
      );
    } else {
      toast.error('Not enough items in stock.')
    }
  };
  return (
    <div className={cn("w-full", className)}>
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "bg-shop_dark_green/80 text-shop_light_bg border-shop_dark_green/80 hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect w-full border font-semibold tracking-wide shadow-none hover:text-white",
        )}
      >
        <ShoppingBag />
        {isOutOfStock ? "Out of stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
