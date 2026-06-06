"use client";
import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
interface Props {
  product: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { addItem, getItemCount } = useStore();
  const itemCount = isMounted ? getItemCount(product?._id ?? "") : 0;
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    if (!product) return;
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`,
      );
    } else {
      toast.error("Not enough items in stock.");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className={cn("w-full h-12 flex relative items-center", className)}>
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityButtons product={product}/>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter amount={product?.price ? product?.price * itemCount : 0} />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          size='lg'
          className={cn(
            "bg-ink absolute right-2 rounded-full px-4 text-shop_light_bg hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect  font-semibold tracking-wide shadow-none hover:text-white",
          )}
        >
          <ShoppingBag />
          {isOutOfStock ? "Out of stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
