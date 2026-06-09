"use client";
import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
interface Props {
  showProduct?: boolean;
  product?: Product | null;
}

function FavoriteButton({ showProduct = false, product }: Props) {
  const { favoriteProduct } = useStore();
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          {!showProduct ? (
            <Link href={"/wishlist"} className="group relative">
            <div className="bg-surface hover:bg-surface-2 rounded-xl p-3 hover:cursor-pointer">
                <Heart className="hover:text-accent-p hoverEffect h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-p p-2 font-poppins text-sm font-medium text-white">
                  {favoriteProduct?.length ? favoriteProduct.length : 0}
                </span>
            </div>
              </Link>
          ) : (
            <button className="group hover:border-accent-p hoverEffect border-accent-p/80 hover:text-accent-p relative rounded-sm border p-1 px-1.5">
              <Heart className="text-accent-p/80 group-hover:text-accent-p hoverEffect mt-0.5 h-5 w-5" />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent>Wishlist</TooltipContent>
      </Tooltip>
    </>
  );
}

export default FavoriteButton;
