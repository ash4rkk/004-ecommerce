'use client'
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
          <Heart className="hover:text-shop_light_green hoverEffect h-5 w-5" />
          <span className=" bg-shop_btn_dark_green absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full  font-semibold text-white">
            {favoriteProduct?.length ? favoriteProduct.length : 0}
          </span>
        </Link>
      ) : (
        <button className="group hover:border-shop_light_green hoverEffect border-shop_light_green/80 hover:text-shop_light_green relative rounded-sm border p-1 px-1.5">
          <Heart className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-0.5 h-5 w-5" />
        </button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              Wishlist
            </TooltipContent>
          </Tooltip>


    </>
  );
}

export default FavoriteButton;
