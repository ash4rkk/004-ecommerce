import { BRANDS_QUERY_RESULT } from "@/sanity.types";
import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { motion } from 'motion/react'

interface Props {
  brands?: BRANDS_QUERY_RESULT;
  selectedBrand?: string | null;
  setSelectedBrand?: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="w-full p-2">
      <Title className="text-base uppercase font-semibold text-black">
        Brands
      </Title>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands?.map((brand) => (
          <div
            onClick={() => {
              setSelectedBrand?.(brand?.slug?.current ?? null);
            }}
            key={brand?._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug?.current ?? ""}
              id={brand?.slug?.current ?? ""}
              className="rounded-md"
            />
            <Label
              htmlFor={brand?.slug?.current}
              className={` cursor-pointer ${selectedBrand === brand?.slug?.current ? "text-accent-p font-semibold" : "font-normal"}`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
          <motion.button
            animate={{ opacity: selectedBrand ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedBrand?.(null)}
            className={`hover:text-accent-p hoverEffect mt-2 text-sm font-medium underline decoration-1 underline-offset-2 ${!selectedBrand && "invisible"}`}
          >
            Reset Selection
          </motion.button>
      </RadioGroup>
    </div>
  );
};

export default BrandList;
