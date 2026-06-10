"use client";
import type { ProductCardProduct } from "@/lib/product-types";
import useStore, { useCartHydrated } from "@/store";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";

const ProductCardActions = ({ product }: { product: ProductCardProduct }) => {
  const isHydrated = useCartHydrated();
  const itemCount = useStore((s) => s.getItemCount(product?._id ?? ""));
  const inCart = isHydrated && itemCount > 0;

  return (
    <div className="flex items-center">
      <div
        className={`transition-[display,opacity,filter] transition-discrete duration-200 ease-out ${
          inCart
            ? "hidden opacity-0 blur-[2px]"
            : "opacity-100 starting:opacity-0 starting:blur-[2px]"
        }`}
      >
        <PriceView
          price={product?.price}
          discount={
            product?.discount && product.discount > 0
              ? product.discount
              : undefined
          }
          className="text-sm"
        />
      </div>
      <AddToCartButton product={product} className="rounded-full" />
    </div>
  );
};

export default ProductCardActions;
