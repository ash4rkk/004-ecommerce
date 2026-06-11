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
    <div className='bg-surface active:scale-95 hover:bg-surface-2 p-2 md:p-3 md:rounded-xl rounded-md hover:cursor-pointer'>

      <ShoppingBag className="hover:text-accent-p text-ink hoverEffect h-4 w-4" />
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-p p-2 font-poppins text-sm font-medium text-white">
        {" "}
        {items?.length ? items.length : '0'}
      </span>
      </div>
    </Link>
    </TooltipTrigger>
    <TooltipContent>
      Shopping Cart
    </TooltipContent>
  </Tooltip>


  );
}

export default CartIcon;
