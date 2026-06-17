"use client";

import { cn } from "@/lib/utils";
import { CircleSmall, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type StockFraction = 0 | 0.25 | 0.5 | 0.75 | 1;

interface ProductStockIconProps {
  stock?: number | null;
  /** Próg „niskiego stanu” — powyżej pełne kółko */
  lowStockThreshold?: number;
  className?: string;
}

/** Ćwiartki: start od góry (12:00), zgodnie z ruchem wskazówek */
function getClockwiseClipPath(fraction: StockFraction): string | undefined {
  switch (fraction) {
    case 0:
      return "polygon(50% 50%)"; // nic nie widać
    case 0.25:
      return "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)";
    case 0.5:
      return "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)";
    case 0.75:
      return "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)";
    case 1:
      return undefined; // pełne kółko — bez clip-path
  }
}

function stockToFraction(stock: number, threshold: number): StockFraction {
  if (stock <= 0) return 0;
  if (stock >= threshold) return 1;

  const ratio = stock / threshold;

  if (ratio <= 0.25) return 0.25;
  if (ratio <= 0.5) return 0.5;
  if (ratio <= 0.75) return 0.75;
  return 1;
}

function getStockColor(stock: number, threshold: number): string {
  if (stock === 0) return "text-red-600";
  if (stock < threshold * 0.25) return "text-amber-500";
  if (stock < threshold * 0.5) return "text-purple-500";
  if (stock < threshold * 0.75) return "text-sky-500";
  return "text-accent-soft";
}

const ProductStockIcon = ({
  stock = 0,
  lowStockThreshold = 10,
  className,
}: ProductStockIconProps) => {
  const safeStock = stock ?? 0;
  const fraction = stockToFraction(safeStock, lowStockThreshold);
  const clipPath = getClockwiseClipPath(fraction);
  const color = getStockColor(safeStock, lowStockThreshold);
  const iconSize = 20;
  const label =
    safeStock === 0
      ? "Out of stock"
      : safeStock < lowStockThreshold
        ? `${safeStock} items left`
        : "In stock";

  // Pełne kółko (stock >= threshold lub blisko pełne)
  if (safeStock > 0 && fraction === 1) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <CircleSmall size={iconSize} className={cn("", color)} />

          <TooltipContent
            className="bg-white"
            classNameArrow="fill-white bg-white"
          >
            {label}
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    );
  }

  // Out of stock — puste/szare kółko
  if (safeStock === 0) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <X size={iconSize - 2} className={cn("", color)} />

          <TooltipContent
            className="bg-white"
            classNameArrow="fill-white bg-white"
          >
            {label}
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    );
  }

  // Niski stan — szare tło + kolorowy wycinek tortu
  return (
    <Tooltip>
      <TooltipTrigger>
        <span className={cn("relative flex", className)}>
          <CircleSmall size={iconSize} className="text-surface-2" />

          <CircleSmall
            size={iconSize}
            className={cn("absolute inset-0", color)}
            style={clipPath ? { clipPath } : undefined}
          />
        </span>
      </TooltipTrigger>

      <TooltipContent className="bg-white" classNameArrow="fill-white bg-white">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default ProductStockIcon;
