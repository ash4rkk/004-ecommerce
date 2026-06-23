"use client";
import type { ProductCardProduct } from "@/lib/product-types";
import useStore, { useCartHydrated } from "@/store";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";
import { cn } from "@/lib/utils";

const ProductCardActions = ({ product }: { product: ProductCardProduct }) => {
  const isHydrated = useCartHydrated();
  const itemCount = useStore((s) => s.getItemCount(product?._id ?? ""));
  const inCart = isHydrated && itemCount > 0;

  return (
    <div
      className={cn(
        "grid w-full min-w-0 items-center gap-2 transition-[grid-template-columns] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        inCart ? "grid-cols-[0fr_1fr]" : "grid-cols-[1fr_1fr]",
      )}
    >
      <div className="min-w-0 overflow-hidden">
        <div
          className={cn(
            "transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            inCart ? "pointer-events-none opacity-0 blur-[2px]" : "opacity-100 blur-0",
          )}
        >
          <PriceView
            price={product?.price}
            discount={
              product?.discount && product.discount > 0
                ? product.discount
                : undefined
            }
            className="text-sm md:text-lg"
            classNamePrev="text-xs"
          />
        </div>
      </div>
      <div className="min-w-0">
        <AddToCartButton product={product} className="rounded-full" />
      </div>
    </div>
  );
};

export default ProductCardActions;
