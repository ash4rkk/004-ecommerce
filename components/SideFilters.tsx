import { X } from "lucide-react";
import { ShopFiltersProps } from "./Shop";
import BrandList from "./shop/BrandList";
import CategoryList from "./shop/CategoryList";
import PriceList from "./shop/PriceList";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Title } from "./ui/text";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  filters: ShopFiltersProps;
}

const SideFilters = ({ isOpen, onClose, filters }: Props) => {
  const {
    categories,
    brands,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    priceReady,
    selectedPrice,
    setSelectedPrice,
    priceBounds,
  } = filters;
  const hasPriceFilter =
    selectedPrice[0] !== priceBounds[0] || selectedPrice[1] !== priceBounds[1];

  const activeFilterCount =
    selectedBrands.length +
    selectedCategories.length +
    (hasPriceFilter ? 1 : 0);

  return (
    <div
      inert={!isOpen}
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      {/* Panel */}
      <div
        className={`bg-surface text-ink border-r-accent-p relative flex h-full max-w-96 min-w-72 flex-col gap-6 border-r p-10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-row items-center justify-between">
          <Title className="font-semibold">
            Filters{" "}
            {activeFilterCount > 0 && (
              <span className="bg-accent-p text-surface ml-2 rounded-full px-2 py-0.5 text-xs">
                {activeFilterCount}
              </span>
            )}
          </Title>
          <button className="active:scale-97" onClick={onClose}>
            <X className="text-ink z-20" />
          </button>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <CategoryList
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <BrandList
            brands={brands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
          {priceReady && (
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              bounds={priceBounds}
            />
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideFilters;
