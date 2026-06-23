"use client";
import type { ProductCardProduct } from "@/lib/product-types";
import { cn } from "@/lib/utils";
import useStore, { useCartHydrated } from "@/store";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import { Button } from "./ui/button";

interface Props {
  product: ProductCardProduct;
  className?: string;
  classNameButton?: string;
}

const AddToCartButton = ({ product, className, classNameButton }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { addItem, getItemCount } = useStore();
  const isOutOfStock = product?.stock === 0;
  const isHydrated = useCartHydrated()
  const itemCount = useStore((s) => s.getItemCount(product?._id ?? ''))
  const inCart = isHydrated && itemCount > 0

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


  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        tabIndex={inCart ? -1 : undefined}
        aria-hidden={inCart}
        className={cn(
          "bg-ink text-secondary hover:bg-accent-p gap-1.5 rounded-full px-4 py-1 font-semibold tracking-wide shadow-none hover:text-white",
          "origin-right transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
          inCart
            ? "pointer-events-none absolute right-0 top-0 z-0 opacity-0 scale-95"
            : "relative z-10 ml-auto opacity-100 scale-100",
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

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          inCart ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "origin-right w-full text-sm transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              inCart
                ? "pointer-events-auto translate-x-0 scale-100 opacity-100 blur-0"
                : "pointer-events-none translate-x-2 scale-[0.97] opacity-0 blur-[2px]",
            )}
            aria-hidden={!inCart}
          >
            <div className="flex items-center justify-between">
              <span className="text-ink/80 text-xs">Quantity</span>
              <QuantityButtons product={product} />
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-xs font-semibold">Subtotal</span>
              <PriceFormatter
                amount={product?.price ? product.price * itemCount : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartButton;
