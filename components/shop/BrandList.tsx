import { BRANDS_QUERY_RESULT } from "@/sanity.types";
import React from "react";
import { Title } from "../ui/text";
import { Checkbox } from "../ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, X } from "lucide-react";

interface Props {
  brands?: BRANDS_QUERY_RESULT;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandList = ({ brands, selectedBrands, setSelectedBrands }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleBrand = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  return (
    <div className="border-border w-full border-b">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="group hover:bg-muted flex w-full items-center justify-between px-4 py-3">
          <Title className="text-foreground text-sm font-semibold uppercase">
            Brands
          </Title>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {selectedBrands.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge variant="secondary" className="h-6">
                    {selectedBrands.length}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-1 px-4 py-3">
          <div className="space-y-1">
            {brands?.map((brand) => {
              const slug = brand?.slug?.current ?? "";
              const checked = selectedBrands.includes(slug);
              return (
                <div
                  onClick={() => toggleBrand(slug)}
                  key={brand?._id}
                  className="hover:bg-muted flex items-center space-x-2 rounded-md px-2 py-1.5 transition-colors hover:cursor-pointer"
                >
                  <Checkbox
                    checked={checked}
                    tabIndex={-1}
                    className="pointer-events-none h-4 w-4"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      checked
                        ? "text-accent-p font-semibold"
                        : "text-foreground hover:text-accent-p font-normal"
                    }`}
                  >
                    {brand?.title}
                  </span>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedBrands.length > 0 && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedBrands([])}
                className="text-accent-p hover:text-accent-p/80 mt-2 flex items-center gap-1 text-xs font-semibold transition-colors"
              >
                <X className="h-3 w-3" />
                Reset Selection
              </motion.button>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default BrandList;
