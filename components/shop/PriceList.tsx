import React from "react";
import { Title } from "../ui/text";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { EllipsisIcon } from "lucide-react";
import { clamp } from "@/lib/price-bounds";

interface Props {
  selectedPrice: number[];
  setSelectedPrice: React.Dispatch<React.SetStateAction<number[]>>;
  bounds: [number, number];
}

const PriceList = ({ selectedPrice, setSelectedPrice, bounds }: Props) => {
  const [minBound, maxBound] = bounds;
  const [minSelected, maxSelected] = selectedPrice;

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

  return (
    <div className="w-full p-2">
      <Title className="text-base font-semibold text-black uppercase">
        Price
      </Title>
      <Label className="m-2" htmlFor="slider">
        Range
      </Label>
      <div className="mb-4 flex items-center justify-start gap-3 pl-2 md:justify-center">
        <Input
          className="w-18 text-center"
          type="text"
          inputMode="numeric"
          maxLength={5}
          pattern="[0-9]*"
          value={String(minSelected)}
          onChange={(e) => updateMin(e.target.value)}
        />
        <EllipsisIcon className="text-muted-foreground shrink-0" />
        <Input
          className="w-18 text-center"
          type="text"
          inputMode="numeric"
          maxLength={5}
          pattern="[0-9]*"
          value={String(maxSelected)}
          onChange={(e) => updateMax(e.target.value)}
        />
      </div>
      <Slider
        className="max-w-100 md:max-w-full"
        id="slider"
        value={selectedPrice}
        onValueChange={setSelectedPrice}
        min={minBound}
        max={maxBound}
        step={1}
        minStepsBetweenThumbs={0}
      />
    </div>
  );
};

export default PriceList;
