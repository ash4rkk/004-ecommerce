"use client";
import { Brand, Category, Product } from "@/sanity.types";
import { CategoryWithCount } from "@/sanity/queries";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { defineQuery } from "next-sanity";
import { SHOP_QUERY } from "@/sanity/queries/query";
import { client } from "@/sanity/lib/client";
import { Loader, Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories?: CategoryWithCount[];
  brands?: Brand[];
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get('category')

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  useEffect(() => {
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
        const query = SHOP_QUERY;
        const data = await client.fetch(
          query,
          {
            selectedCategory,
            selectedBrand,
            minPrice,
            maxPrice,
          },
          {
            next: { revalidate: 0 },
          },
        );
        setProducts(data);
      } catch (error) {
        console.log("Shop product fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);
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
          <div className="flex-1 pt-5">
            <div className="scrollbar-hide h-[calc(100vh-160px)] overflow-y-auto pr-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-2 p-20">
                  <Loader2 className="text-shop_dark_green h-10 w-10 animate-spin" />{" "}
                  <p className="font-sans text-base tracking-wide">
                    Product is loading ...
                  </p>
                </div>
              ) : (
                <div>
                  {products?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                      {products?.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <NoProductAvailable className="mt-0" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
