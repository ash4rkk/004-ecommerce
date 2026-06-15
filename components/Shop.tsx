"use client";
import type { ProductListItem } from "@/lib/product-types";
import { DEFAULT_PRICE_BOUNDS, normalizePriceBounds } from "@/lib/price-bounds";
import { Brand } from "@/sanity.types";
import { CategoryWithCount } from "@/sanity/queries";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { SHOP_PRICE_BOUNDS_QUERY, SHOP_QUERY } from "@/sanity/queries/query";
import { client } from "@/sanity/lib/client";
import { Loader2, X } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import SideFilters from "./SideFilters";

interface Props {
  categories?: CategoryWithCount[];
  brands?: Brand[];
}
export type ShopFiltersProps = {
  categories?: CategoryWithCount[];
  brands?: Brand[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  priceReady: boolean;
  selectedPrice: number[];
  setSelectedPrice: React.Dispatch<React.SetStateAction<number[]>>;
  priceBounds: [number, number];
};

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [priceReady, setPriceReady] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams?.getAll("category") ?? [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams?.getAll("brand") ?? [],
  );
  const [priceBounds, setPriceBounds] =
    useState<[number, number]>(DEFAULT_PRICE_BOUNDS);
  const [selectedPrice, setSelectedPrice] =
    useState<number[]>(DEFAULT_PRICE_BOUNDS);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    let cancelled = false;

    const fetchPriceBounds = async () => {
      setPriceReady(false);
      try {
        const result = await client.fetch(
          SHOP_PRICE_BOUNDS_QUERY,
          { selectedCategories, selectedBrands },
          { next: { revalidate: 0 } },
        );
        if (cancelled) return;

        const bounds = normalizePriceBounds(result?.minPrice, result?.maxPrice);
        setPriceBounds(bounds);
        setSelectedPrice(bounds);
      } catch (error) {
        console.log("Shop price bounds fetching error", error);
        if (!cancelled) {
          setPriceBounds(DEFAULT_PRICE_BOUNDS);
          setSelectedPrice(DEFAULT_PRICE_BOUNDS);
        }
      } finally {
        if (!cancelled) setPriceReady(true);
      }
    };

    fetchPriceBounds();
    return () => {
      cancelled = true;
    };
  }, [selectedCategories, selectedBrands]);

  useEffect(() => {
    if (!priceReady) return;

    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [minPrice, maxPrice] = selectedPrice;
        const data = await client.fetch(
          SHOP_QUERY,
          { selectedCategories, selectedBrands, minPrice, maxPrice },
          { next: { revalidate: 0 } },
        );
        if (!cancelled) setProducts(data);
      } catch (error) {
        console.log("Shop product fetching error", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [selectedCategories, selectedBrands, selectedPrice, priceReady]);

  const hasPriceFilter =
    selectedPrice[0] !== priceBounds[0] || selectedPrice[1] !== priceBounds[1];
  const hasActiveFilters = Boolean(
    selectedBrands.length || selectedCategories.length || hasPriceFilter,
  );
  const activeFilterCount =
    selectedBrands.length +
    selectedCategories.length +
    (hasPriceFilter ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  const filters: ShopFiltersProps = {
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
  };
  return (
    <div>
      <Container className="mt-5 mb-10">
        {/* Mobile */}
        <div className="fixed right-4 bottom-4 z-20 flex items-center gap-1 md:hidden">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-surface text-ink rounded-lg py-1 font-semibold shadow"
            size={'lg'}
          >
            Filters{" "}
            <span
              className={`bg-accent-p ${!activeFilterCount && "invisible"} text-surface ml-2 rounded-full px-2 py-0.5 text-xs`}
            >
              {activeFilterCount}
            </span>
          </Button>

          {hasActiveFilters && (
            <Button
              size={"lg"}
              className="bg-ink rounded-lg shadow"
              onClick={handleResetFilters}
            >
              <X />
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <SideFilters
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            filters={filters}
          />
        </div>
        {/* End Mobile */}
        <div className="relative md:sticky top-0 z-10 mb-1 md:mb-5">
          <div className="flex w-full items-center justify-between">
            <Title className="w-full font-bold tracking-wide">
              Get the products as your needs
            </Title>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-3 md:flex-row">
          <div className="md:border-r-accent-p/50 scrollbar-hide hidden pb-5 md:sticky md:top-20 md:block md:h-[calc(100vh-160px)] md:min-w-64 md:self-start md:overflow-auto">
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
            <motion.button
              animate={{ opacity: hasActiveFilters ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleResetFilters}
              className="text-ink mt-5 hoverEffect w-full  hover:text-accent-p hover:bg-surface-2 bg-surface hidden rounded-full px-2 py-1 text-sm tracking-wide md:block"
            >
              Reset Filters
            </motion.button>
          </div>
          <div className="mb:pt-5 flex-1 pt-1">
            <div className="scrollbar-hide md:h-[calc(100vh)] md:overflow-y-auto pr-2">
              {loading || !priceReady ? (
                <div className="flex flex-col items-center justify-center gap-2 p-20">
                  <Loader2 className="text-accent-p h-10 w-10 animate-spin" />
                  <p className="font-sans text-base tracking-wide">
                    Product is loading ...
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
