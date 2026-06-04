"use client";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Link from "next/link";
import useStore from "@/store";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function CartIcon() {
  const { items } = useStore();
  return (
    <Tooltip>
    <TooltipTrigger asChild>
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="hover:text-shop_light_green hoverEffect h-5 w-5" />
      <span className="bg-shop_dark_green absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full font-semibold text-white">
        {" "}
        {items?.length ? items.length : 0}
      </span>
    </Link>
    </TooltipTrigger>
    <TooltipContent>
      Shopping Cart
    </TooltipContent>
  </Tooltip>


  );
}

export default CartIcon;
