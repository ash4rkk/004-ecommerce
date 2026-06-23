import type { ProductCardProduct } from "@/lib/product-types";
import useStore from "@/store";
import React from "react";
import { Button } from "./ui/button";
import { MinusIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  product: ProductCardProduct;
  className?: string;
}
const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddProduct = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success("Item quantity increased");
    } else {
      toast.error(`Exceeds available stock`);
    }
  };
  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Item quantity decreased");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed!`);
    }
  };

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="hover:bg-ink hover:text-white hoverEffect h-6 w-6 active:scale-[0.97] transition-transform duration-150 ease-out"
      >
        <MinusIcon />
      </Button>
      <span className="text-ink w-6 text-center text-sm font-semibold">
        {itemCount}
      </span>
      <Button
        onClick={handleAddProduct}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="hover:bg-ink hover:text-white hoverEffect h-6 w-6 active:scale-[0.97] transition-transform duration-150 ease-out"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
