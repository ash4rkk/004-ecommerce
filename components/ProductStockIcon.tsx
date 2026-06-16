"use client";

import { cn } from "@/lib/utils";
import { CircleSmall } from "lucide-react";

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

function stockToFraction(
  stock: number,
  threshold: number,
): StockFraction {
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
  if (stock < threshold * 0.4) return "text-red-500";
  if (stock < threshold * 0.7) return "text-amber-500";
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
  const iconSize = 20
  const label =
    safeStock === 0
      ? "Out of stock"
      : safeStock < lowStockThreshold
        ? `${safeStock} items left`
        : "In stock";

  // Pełne kółko (stock >= threshold lub blisko pełne)
  if (safeStock > 0 && fraction === 1) {
    return (
      <span
        className={cn(`inline-flex  shrink-0 size-${iconSize / 4}`, className)}
        aria-label={label}
        title={label}
      >
        <CircleSmall size={iconSize} className={cn("fill-current", color)} />
      </span>
    );
  }

  // Out of stock — puste/szare kółko
  if (safeStock === 0) {
    return (
      <span
        className={cn(`inline-flex size-${iconSize / 4} shrink-0 `, className)}
        aria-label={label}
        title={label}
      >
        <CircleSmall size={iconSize} className="fill-current text-surface-2" />
      </span>
    );
  }

  // Niski stan — szare tło + kolorowy wycinek tortu
  return (
    <span
      className={cn(`relative inline-flex size-${iconSize / 4} shrink-0`, className)}
      aria-label={label}
      title={label}
    >
      <CircleSmall size={iconSize} className="fill-current text-surface-2" />
      <CircleSmall size={iconSize}
        className={cn("absolute inset-0 fill-current", color)}
        style={clipPath ? { clipPath } : undefined}
      />
    </span>
  );
};

export default ProductStockIcon;