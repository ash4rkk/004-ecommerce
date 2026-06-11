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
              <div className="bg-surface hover:bg-surface-2 rounded-md p-2 hover:cursor-pointer active:scale-95 md:rounded-xl md:p-3">
                <Heart className="hover:text-accent-p hoverEffect h-4 w-4" />
                <span className="bg-accent-p font-poppins absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full p-2 text-sm font-medium text-white">
                  {favoriteProduct?.length ? favoriteProduct.length : 0}
                </span>
              </div>
            </Link>
          ) : (
            <button className="bg-surface hover:bg-surface-2 rounded-xl p-3 hover:cursor-pointer active:scale-95">
              <Heart className="text-accent-p/80 group-hover:text-accent-p hoverEffect mt-0.5 h-5 w-5 active:scale-95" />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent>Wishlist</TooltipContent>
      </Tooltip>
    </>
  );
}

export default FavoriteButton;
