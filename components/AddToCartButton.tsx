"use client";
import type { ProductCardProduct } from "@/lib/product-types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import { toast } from "sonner";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
interface Props {
  product: ProductCardProduct;
  className?: string;
  classNameButton?: string;
}
const AddToCartButton = ({ product, className, classNameButton }: Props) => {
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
    <div className={cn("relative flex w-full items-center", className)}>
      {itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-ink/80 text-xs">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
<Button
  onClick={handleAddToCart}
  disabled={isOutOfStock}
  className={cn(
    "bg-ink text-secondary hover:bg-accent-p ml-auto gap-1.5 rounded-full px-4 py-1 font-semibold tracking-wide shadow-none hover:text-white",
    classNameButton,
  )}
>
  {isOutOfStock ? (
    "Sold Out"
  ) : (
    <>
      <ShoppingBag className="size-4 shrink-0" aria-hidden="true" />
      Buy
    </>
  )}
</Button>
      )}
    </div>
  );
};

export default AddToCartButton;
