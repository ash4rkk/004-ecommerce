import React from "react";
import { Title } from "../ui/text";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Badge } from "../ui/badge";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clamp } from "@/lib/price-bounds";

interface Props {
  selectedPrice: number[];
  setSelectedPrice: React.Dispatch<React.SetStateAction<number[]>>;
  bounds: [number, number];
}

const PriceList = ({ selectedPrice, setSelectedPrice, bounds }: Props) => {
  const [minBound, maxBound] = bounds;
  const [minSelected, maxSelected] = selectedPrice;
  const [isOpen, setIsOpen] = React.useState(true);

  const isFiltered =
    minSelected > minBound || maxSelected < maxBound;

  const updateMin = (raw: string) => {
    const parsed = Number(raw.replace(/\D/g, "").slice(0, 5) || 0);
    const nextMin = clamp(parsed, minBound, maxSelected);
    setSelectedPrice([nextMin, Math.max(nextMin, maxSelected)]);
  };

  const updateMax = (raw: string) => {
    const parsed = Number(raw.replace(/\D/g, "").slice(0, 5) || 0);
    const nextMax = clamp(parsed, minSelected, maxBound);
    setSelectedPrice([Math.min(minSelected, nextMax), nextMax]);
  };

  const handleReset = () => {
    setSelectedPrice([minBound, maxBound]);
  };

  return (
    <div className="w-full border-b border-border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="group flex w-full items-center justify-between px-4 py-3 hover:bg-muted">
          <Title className="text-sm font-semibold uppercase text-foreground">
            Price
          </Title>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isFiltered && (
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

        <CollapsibleContent className="space-y-4 px-4 py-3">
          <div>
            <Label htmlFor="slider" className="text-xs font-semibold text-foreground">
              Range
            </Label>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Input
              className="w-20 text-center"
              type="text"
              inputMode="numeric"
              maxLength={5}
              pattern="[0-9]*"
              value={String(minSelected)}
              onChange={(e) => updateMin(e.target.value)}
            />
            <div className="h-0.5 w-6 bg-border" />
            <Input
              className="w-20 text-center"
              type="text"
              inputMode="numeric"
              maxLength={5}
              pattern="[0-9]*"
              value={String(maxSelected)}
              onChange={(e) => updateMax(e.target.value)}
            />
          </div>

          <Slider
            id="slider"
            value={selectedPrice}
            onValueChange={setSelectedPrice}
            min={minBound}
            max={maxBound}
            step={1}
            minStepsBetweenThumbs={0}
            className="w-full"
          />

          <AnimatePresence>
            {isFiltered && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleReset}
                className="flex items-center gap-1 text-xs font-semibold text-accent-p hover:text-accent-p/80 transition-colors"
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

export default PriceList;