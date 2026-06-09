import { BRANDS_QUERY_RESULT } from "@/sanity.types";
import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
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
  selectedBrand?: string | null;
  setSelectedBrand?: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="w-full border-b border-border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="group flex w-full items-center justify-between px-4 py-3 hover:bg-muted">
          <Title className="text-sm font-semibold uppercase text-foreground">
            Brands
          </Title>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {selectedBrand && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge variant="secondary" className="h-6">
                    1
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-1 px-4 py-3">
          <RadioGroup value={selectedBrand || ""}>
            {brands?.map((brand) => (
              <div
                onClick={() => {
                  setSelectedBrand?.(brand?.slug?.current ?? null);
                }}
                key={brand?._id}
                className="flex items-center space-x-2 rounded-md px-2 py-1.5 hover:cursor-pointer hover:bg-muted transition-colors"
              >
                <RadioGroupItem
                  value={brand?.slug?.current ?? ""}
                  id={brand?.slug?.current ?? ""}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={brand?.slug?.current}
                  className={`cursor-pointer text-sm transition-colors ${
                    selectedBrand === brand?.slug?.current
                      ? "font-semibold text-accent-p"
                      : "font-normal text-foreground hover:text-accent-p"
                  }`}
                >
                  {brand?.title}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <AnimatePresence>
            {selectedBrand && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedBrand?.(null)}
                className="mt-2 flex items-center gap-1 text-xs font-semibold text-accent-p hover:text-accent-p/80 transition-colors"
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