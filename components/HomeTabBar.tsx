import { DATA_productType } from '@/constants/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <Link href="/shop">
        <Button className="rounded-full font-medium text-white md:px-6" size="lg">
          See all
        </Button>
      </Link>
      <div className="flex items-center gap-3 text-sm font-semibold">
        {DATA_productType?.map((item) => (
          <Button
            key={item?.title}
            variant="ghost"
            size="sm"
            onClick={() => onTabSelect(item?.title)}
            className={cn(
              'hoverEffect rounded-full border-none px-4 py-1.5 shadow-none md:px-6 md:py-2',
              selectedTab === item?.title
                ? 'pointer-events-none bg-ink text-white hover:bg-ink hover:text-white'
                : 'bg-surface-2 text-ink hover:bg-surface hover:text-ink',
            )}
          >
            {item?.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HomeTabBar;
