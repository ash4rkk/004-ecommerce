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
        <div className="bg-surface hover:bg-surface-2 rounded-xl p-3 hover:cursor-pointer">

          <PackageSearch className="hover:text-accent-p hoverEffect h-4 w-4"/>
          <span className="text-muted font-poppins bg-accent-p absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full p-2 text-sm font-medium">{orders?.length ? orders?.length : 0}
          </span>
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        Orders
      </TooltipContent>
    </Tooltip>
  );
};

export default OrderButton;
