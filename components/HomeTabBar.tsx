import { DATA_productType } from "@/constants/data";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}
const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <Link href={"/shop"}>
        <Button className=" rounded-full md:px-6" size='lg'>See all</Button>
      </Link>
      <div className="flex items-center gap-3 text-sm font-semibold">
        {DATA_productType?.map((item) => (
          <Button
            key={item?.title}
            size="sm"
            onClick={() => onTabSelect(item?.title)}
            className={`hover:bg-surface  hoverEffect rounded-full border-none px-4 py-1.5 text-ink md:px-6 md:py-2 ${selectedTab === item?.title ? "bg-ink text-muted pointer-events-none" : "bg-surface-2 "}`}
          >
            {item?.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HomeTabBar;
