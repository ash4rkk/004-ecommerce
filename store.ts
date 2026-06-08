import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductCardProduct } from "./lib/product-types";
import { useSyncExternalStore } from "react";

export interface CartItem {
  product: ProductCardProduct;
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  addItem: (product: ProductCardProduct) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItem: () => CartItem[];

  favoriteProduct: ProductCardProduct[];
  addToFavorite: (product: ProductCardProduct) => Promise<void>;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial condition
      items: [],
      favoriteProduct: [],
      // addItem - check for existingItem, if exists change quantity by 1. When
      // there is no item available return 'item', else add item with quantity
      // 1.
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      // removeItem - reduce used for building array acc as initial state = [].
      // If item matches and quantity is > 1, quantity in acc array is reduced
      // by 1. If no item matches, returns push acc as new original array.
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      // deleteCartProduct - filter creates a new shallow copy of the array.
      // Items whose _id does NOT match productId return true → stay in the
      // array. The item whose _id matches returns false → is excluded from the
      // result.
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId,
          ),
        })),
      resetCart: () => set({ items: [] }),
      // getTotalPrice - get() only reads state without modifying it. reduce
      // iterates through all items and produces a single number (total price).
      // Initial value starts at 0. +?? (nullish coalescing) returns 0 if
      // item.product.price is null or undefined.
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0,
        );
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountPrice = price + discount;
          return total + discountPrice * item.quantity;
        }, 0);
      },
      //
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItem: () => get().items,
      // addToFavorite: generally Promise is not needed but later component can
      // write await.
      // isFavorite returns true or false based on some method
      // if isFavorite = false, create new shallow copy without item
      // if isFavorite = true, create array with product and update
      addToFavorite: (product: ProductCardProduct) => {
        return new Promise<void>((resolve) => {
          set((state: StoreState) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id,
            );
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) => item._id !== product._id,
                  )
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },
      //
      removeFromFavorite: (productId: string) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item?._id !== productId,
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "cart-store",
    },
  ),
);
export const useCartHydrated = () =>
  useSyncExternalStore(
    (cb) => useStore.persist.onFinishHydration(cb),
    () => useStore.persist.hasHydrated(),
    () => false,
  );
export default useStore;
