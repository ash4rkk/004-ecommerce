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
    <div className="flex">
      {!inCart && (
        <PriceView
          price={product?.price}
          discount={product?.discount && product.discount > 0 ? product.discount : undefined}
          className="text-sm"
        />
      )}
      <AddToCartButton product={product} className="rounded-full" />
    </div>
  );
};

export default ProductCardActions;