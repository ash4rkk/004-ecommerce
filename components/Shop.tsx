"use client";
import { Brand, Category, Product } from "@/sanity.types";
import { CategoryWithCount } from "@/sanity/queries";
import React, { useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { defineQuery } from "next-sanity";
import { SHOP_QUERY } from "@/sanity/queries/query";

interface Props {
  categories?: CategoryWithCount[];
  brands?: Brand[];
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;

      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = SHOP_QUERY
    } catch (error) {
      console.log("Shop product fetching error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg tracking-wide uppercase">
              Get the products as your needs
            </Title>
            <motion.button
              animate={{
                opacity:
                  selectedBrand || selectedCategory || selectedPrice ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setSelectedPrice(null);
                setSelectedBrand(null);
                setSelectedCategory(null);
              }}
              className="text-shop_dark_green hoverEffect hover:text-shop_orange mt-2 text-sm font-medium underline"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
        {/* Filters + Main window */}
        <div className="border-t-shop_dark_green/50 flex flex-col gap-5 border-t pt-3 md:flex-row">
          <div className="md:border-r-shop_dark_green/50 scrollbar-hide pb-5 md:sticky md:top-20 md:h-[calc(100vh-160px)] md:min-w-64 md:self-start md:overflow-auto md:border-r">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
          <div>Products</div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
