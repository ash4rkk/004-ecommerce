"use client";
import { useConfirm } from "@/hooks/use-confirm";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import AddToCartButton from "./AddToCartButton";
import Container from "./Container";
import PriceFormatter from "./PriceFormatter";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";


const WishlistProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(5);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };
  const loadLess = () => {
    setVisibleProducts((prev) => Math.max(prev - 5, 5));
  };
  const confirm = useConfirm();

  const handleResetWishlist = async () => {
    const ok = await confirm({
      title: "Clear wishlist?",
      description: "All products will be cleared.",
      confirmLabel: "Clear",
      cancelLabel: "Cancel",
      variant: "destructive",
    });

    if (ok) {
      resetFavorite();
      toast.success("Wishlist cleared.");
    }
  };
  return (
    <Container className="pb-10">
      {favoriteProduct?.length > 0 ? (
        <>
          {/* Mobile: card layout */}
          <div className="space-y-4 md:hidden">
            {favoriteProduct?.slice(0, visibleProducts)?.map((product) => (
              <div key={product?._id} className="relative flex gap-4 rounded-xl border p-4 shadow-sm">
                <button
                  onClick={() => removeFromFavorite(product._id)}
                  className="absolute top-3 right-3"
                >
                  <X className="text-muted-foreground hoverEffect h-4 w-4 hover:text-red-500" />
                </button>
                {product?.images?.[0] && (
                  <Link
                    href={{ pathname: `/product/${product?.slug?.current}`, query: { id: product?._id } }}
                    className="shrink-0"
                  >
                    <Image
                      src={urlFor(product.images[0]).url()}
                      alt={product?.name ?? "Product image"}
                      width={80}
                      height={80}
                      className="hoverEffect rounded-md h-full object-contain"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col gap-1.5 pr-6">
                  <p className="text-sm font-semibold leading-tight">{product?.name}</p>
                  {product?.variant && (
                    <p className="text-muted-foreground capitalize text-xs">{product?.variant}</p>
                  )}
                  <span
                    className={`w-fit rounded  py-0.5 text-xs font-semibold ${
                      (product?.stock as number) > 0
                        ? "text-accent-p"
                        : "text-red-400"
                    }`}
                  >
                    {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  <PriceFormatter className="font-bold" amount={product?.price ?? null} />
                  <AddToCartButton product={product} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table layout */}
          <div className="hidden overflow-x-auto md:block">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow >
                  <TableHead className="w-10 font-semibold"></TableHead>
                  <TableHead className="font-semibold">Image</TableHead>
                  <TableHead className="text-center font-semibold">Category</TableHead>
                  <TableHead className="text-center font-semibold">Status</TableHead>
                  <TableHead className="text-center font-semibold">Price</TableHead>
                  <TableHead className="text-center font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favoriteProduct
                  ?.slice(0, visibleProducts)
                  ?.map((product) => (
                    <TableRow key={product?._id}>
                      <TableCell>
                        <button onClick={() => removeFromFavorite(product._id)}>
                          <X className="text-muted-foreground hoverEffect h-5 w-5 hover:text-red-500" />
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product?.images?.[0] && (
                            <Link
                              href={{
                                pathname: `/product/${product?.slug?.current}`,
                                query: { id: product?._id },
                              }}
                            >
                              <Image
                                src={urlFor(product.images[0]).url()}
                                alt={product?.name ?? "Product image"}
                                width={64}
                                height={64}
                                className="hoverEffect md:w-30 md:h-30 rounded-md object-contain"
                              />
                            </Link>
                          )}
                          <p className="text-sm font-semibold">{product?.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-center capitalize">{product?.variant}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-block rounded-lg px-4 py-1.5 text-sm font-semibold ${
                            (product?.stock as number) > 0
                              ? " text-accent-soft"
                              : " text-red-400"
                          }`}
                        >
                          {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <PriceFormatter className="font-bold" amount={product?.price ?? null} />
                      </TableCell>
                      <TableCell className="text-center">
                        <AddToCartButton product={product} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              {visibleProducts < favoriteProduct?.length && (
                <Button className="w-full sm:w-48" onClick={loadMore} variant="default" size="lg">
                  Load More
                  <ArrowDownNarrowWide />
                </Button>
              )}
              {visibleProducts > 5 && (
                <Button className="w-full sm:w-48" onClick={loadLess} variant="default" size="lg">
                  Load Less
                  <ArrowUpNarrowWide />
                </Button>
              )}
            </div>
            <Button
              onClick={handleResetWishlist}
              variant="destructive"
              size="lg"
              className="w-full bg-red-800/80 text-white shadow hover:bg-red-700 sm:w-auto"
            >
              Clear Wishlist
              <X />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex min-h-100 flex-col items-center justify-center space-y-6 px-4 text-center align-middle">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full">
              <Heart
                className="text-muted-foreground h-12 w-12"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground text-sm">
                Items added to your wishlist will appear here
              </p>
            </div>
            <Button size="lg" asChild className="my-5">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default WishlistProducts;
