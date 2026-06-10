"use client";
import type { ProductListItem } from "@/lib/product-types";
import {
  DEFAULT_PRICE_BOUNDS,
  normalizePriceBounds,
} from "@/lib/price-bounds";
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
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories?: CategoryWithCount[];
  brands?: Brand[];
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [priceReady, setPriceReady] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams?.getAll('category') ?? [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams?.getAll('brand') ?? [])
  const [priceBounds, setPriceBounds] = useState<[number, number]>(
    DEFAULT_PRICE_BOUNDS,
  );
  const [selectedPrice, setSelectedPrice] = useState<number[]>(
    DEFAULT_PRICE_BOUNDS,
  );

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

        const bounds = normalizePriceBounds(
          result?.minPrice,
          result?.maxPrice,
        );
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
    selectedPrice[0] !== priceBounds[0] ||
    selectedPrice[1] !== priceBounds[1];
  const hasActiveFilters =
    Boolean(selectedBrands.length || selectedCategories.length || hasPriceFilter);

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  return (
    <div>
      <Container className="mt-5 mb-10">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="font-bold tracking-wide uppercase">
              Get the products as your needs
            </Title>
            <motion.button
              animate={{ opacity: hasActiveFilters ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleResetFilters}
              className="text-ink hoverEffect hover:text-accent-p hover:bg-surface-2 mt-2 rounded-full bg-surface px-2 py-1 text-sm tracking-wide"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-3 md:flex-row">
          <div className="md:border-r-accent-p/50 scrollbar-hide pb-5 md:sticky md:top-20 md:h-[calc(100vh-160px)] md:min-w-64 md:self-start md:overflow-auto">
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
          </div>
          <div className="flex-1 pt-5">
            <div className="scrollbar-hide h-[calc(100vh-160px)] overflow-y-auto pr-2">
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
