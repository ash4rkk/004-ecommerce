import { PackageSearch } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
interface Props{
  orders: MY_ORDERS_QUERY_RESULT | null;
}
const OrderButton = ({orders}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={"/orders"}className="group relative hoverEffect">
          <PackageSearch className="h-5 w-5"/>
          <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">{orders?.length ? orders?.length : 0}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        Orders
      </TooltipContent>
    </Tooltip>
  );
};

export default OrderButton;
