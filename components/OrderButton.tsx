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
        <div className="bg-surface hover:bg-surface-2 p-2 md:p-3 md:rounded-xl rounded-md hover:cursor-pointer">

          <PackageSearch className="hover:text-accent-p hoverEffect h-4 w-4"/>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-p p-2 font-poppins text-sm font-medium text-white">{orders?.length ? orders?.length : 0}
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
