import { Category } from "@/sanity.types";
import { CategoryWithCount } from "@/sanity/queries";
import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { motion } from "motion/react";
interface Props {
  categories?: Category[];
  selectedCategory?: string | null;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string | null>>;
}
const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full p-2">
      <Title className="text-base font-semibold text-black">
        Product Categories
      </Title>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories?.map((category) => (
          <div
            onClick={() => {
              setSelectedCategory?.(category?.slug?.current ?? null);
            }}
            key={category?._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={category?.slug?.current ?? ""}
              id={category?.slug?.current ?? ""}
              className="rounded-md"
            />
            <Label
              htmlFor={category?.slug?.current}
              className={` cursor-pointer ${selectedCategory === category?.slug?.current ? "text-shop_dark_green font-semibold" : "font-normal"}`}
            >
              {category?.title}
            </Label>
          </div>
        ))}
          <motion.button
            animate={{ opacity: selectedCategory ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedCategory?.(null)}
            className={`hover:text-shop_dark_green hoverEffect mt-2 text-sm font-medium underline decoration-1 underline-offset-2 ${!selectedCategory && "invisible"}`}
          >
            Reset Selection
          </motion.button>
      </RadioGroup>
    </div>
  );
};

export default CategoryList;
