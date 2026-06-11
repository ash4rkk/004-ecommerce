import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { DATA_shopByBrands } from "@/constants/data";

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="bg-surface mb-10 rounded-md p-5 lg:mb-20 lg:p-7">
      <div className="mb-10 flex items-center justify-between gap-5">
        <Title className="font-bold">Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="hover:text-accent-p hoverEffect text-sm font-semibold tracking-wide text-gray-500 hover:scale-110"
        >
          View All
        </Link>
      </div>
      {/* //TODO dostosować grid
       */}
      <div className="grid grid-cols-4 gap-2.5 md:grid-cols-6 lg:grid-cols-8">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
            className="border-border hoverEffect flex h-20 w-20 md:h-30 md:w-30 items-center justify-center overflow-hidden rounded-md border bg-white hover:scale-110 hover:shadow"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt="brandImage"
                width={250}
                height={250}
                className="h-20 w-20 object-cover md:h-30 md:w-30"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="mt-16 grid grid-cols-1 gap-4 border-t p-2 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {DATA_shopByBrands?.map((item, index) => {
          const Icon = item?.icon;
          return (
            <div
              key={index}
              className="group text-lightColor hover:text-accent-p flex items-center gap-3 border-r"
            >
              <span className="hoverEffect inline-flex scale-100 group-hover:scale-90">
                {" "}
                <Icon size={45} />
              </span>
              <div className="text-sm">
                <p className="text-darkColor/90 font-bold capitalize">
                  {item?.title}
                </p>
                <p className="text-lightColor">{item?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByBrands;
