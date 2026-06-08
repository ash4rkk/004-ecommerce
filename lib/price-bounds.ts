export const DEFAULT_PRICE_BOUNDS: [number, number] = [0, 10000];

export const normalizePriceBounds = (
  minPrice: number | null | undefined,
  maxPrice: number | null | undefined,
): [number, number] => {
  const min = minPrice ?? DEFAULT_PRICE_BOUNDS[0];
  const max = maxPrice ?? DEFAULT_PRICE_BOUNDS[1];
  return max >= min ? [min, max] : [min, min];
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
