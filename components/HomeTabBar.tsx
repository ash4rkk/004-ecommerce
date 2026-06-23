import { DATA_productType } from "@/constants/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
<div className="flex w-full min-w-0 items-center gap-3 md:gap-5">
  <Link href="/shop" className="shrink-0 ">
    <Button className="font-bold rounded-xl  text-white md:px-6">See all</Button>
  </Link>
        <ScrollArea className="min-w-0 rounded-lg flex-1">
          <div className="flex w-max flex-nowrap items-center gap-1 md:gap-3">
            {DATA_productType?.map((item, _) => (
              <Button
                key={item?.title}
                variant="ghost"
                size="sm"
                onClick={() => onTabSelect(item?.title)}
                className={cn(
                  "hoverEffect shrink-0 rounded-xl border-none px-4 py-1.5 shadow-none md:px-6 md:py-2",
                  selectedTab === item?.title
                    ? "bg-ink hover:bg-ink pointer-events-none text-white hover:text-white"
                    : "bg-surface-2 text-ink hover:bg-surface hover:text-ink",
                )}
              >
                {item?.title}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />

        </ScrollArea>
    </div>
  );
};

export default HomeTabBar;
