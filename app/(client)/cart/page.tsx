"use client";
import { createCheckoutSession } from "@/actions/createCheckoutSession";
import getMyAddresses from "@/actions/getMyAddresses";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import { AddAddressDialog } from "@/components/AddAddressDialog";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Title } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConfirm } from "@/hooks/use-confirm";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ADDRESSES_QUERY } from "@/sanity/queries/query";
import useStore, { useCartHydrated } from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { add } from "date-fns";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItem());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);

  const confirm = useConfirm();
  const isHydrated = useCartHydrated();

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const data = await getMyAddresses();
        setAddresses(data);
        const defaultAddress = data.find((addr: Address) => addr.default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        } else if (data.length > 0) {
          setSelectedAddress(data[0]);
        }
      } catch (error) {
        console.log("Addresses fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleDeleteProduct = (product: string) => {
    deleteCartProduct(product);
  };
  const handleResetCart = async () => {
    const ok = await confirm({
      title: "Clear your cart?",
      description: "All of the products would be deleted.",
      confirmLabel: "Confirm",
      cancelLabel: "Abort",
      variant: "destructive",
    });

    if (ok) {
      resetCart();
      toast.success("Cart cleared");
    }
  };
  const handleAddressAdded = (newAddress: Address) => {
    setAddresses((prev) => [newAddress, ...(prev ?? [])]);
    setSelectedAddress(newAddress);
  };
  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast.warning("No delivery address");
      return;
    }
    setLoading(true);
    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id ?? "",
        address: selectedAddress,
      };
      const checkoutURL = await createCheckoutSession(groupedItems, metadata);
      if (groupedItems && groupedItems?.length > 0) {
        if (checkoutURL) {
          window.location.href = checkoutURL;
        }
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center pb-52 md:pb-10">
        <span className="text-sm text-gray-500">Loading cart...</span>
      </div>
    );
  }
  return (
    <div className="mx-4 pb-64 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="mt-5 mb-3 flex items-center gap-2 md:mb-7">
                {" "}
                <ShoppingBag className="text-ink" />
                <Title className="font-bold tracking-wide">Shopping Cart</Title>
              </div>
              <div className="grid md:gap-8 lg:grid-cols-3">
                <div className="rounded-lg bg-white lg:col-span-2">
                  <div>
                    {groupedItems?.map(({ product }, index) => {
                      const itemCount = getItemCount(product?._id);
                      const toneNumber = (index % 8) + 1;
                      return (
                        <div
                          key={product?._id}
                          className="bg-surface my-2 flex flex-col gap-3 rounded-xl border p-2.5"
                        >
                          <div className="flex items-start justify-between gap-3 md:gap-5">
                            <div className="flex min-w-0 flex-1 items-center gap-2">
                              {product?.images && (
                                <Link
                                  href={`/product/${product?.slug?.current}`}
                                  className="group hoverEffect shrink-0 overflow-hidden rounded-xl hover:scale-110"
                                >
                                  <Image
                                    src={urlFor(product?.images[0]).url()}
                                    alt="Product Image"
                                    style={{
                                      backgroundColor: `var(--tone-${toneNumber})`,
                                    }}
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    className="hoverEffect bg-tone-1 h-28 w-24 rounded-xl object-contain group-hover:scale-110 md:h-44 md:w-42"
                                  />
                                </Link>
                              )}
                              <div className="min-w-0 flex-1 px-1 py-0.5">
                                <div className="flex flex-col gap-0.5 md:gap-1.5">
                                  <h2 className="line-clamp-2 text-base font-semibold">
                                    {product?.name}
                                  </h2>
                                  <p className="text-sm capitalize">
                                    Variant:{" "}
                                    <span className="font-semibold">
                                      {product?.variant}
                                    </span>
                                  </p>
                                  <p className="text-sm capitalize">
                                    Status:{" "}
                                    <span className="font-semibold">
                                      {product?.status}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t pt-2">
                            <TooltipProvider>
                              <div className="flex items-center gap-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AddToWishlistButton product={product} />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    className="bg-ink text-gray-200"
                                    classNameArrow="bg-ink fill-ink"
                                  >
                                    Add to Favorite
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      aria-label="Delete product"
                                      onClick={() => {
                                        handleDeleteProduct(product?._id);
                                        toast.success("Product deleted");
                                      }}
                                      className="hoverEffect h-8 w-8 text-gray-500 hover:text-red-500"
                                    >
                                      <Trash className="h-4 w-4 md:h-5 md:w-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    className="bg-ink text-gray-200"
                                    classNameArrow="bg-ink fill-ink"
                                  >
                                    Delete product
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TooltipProvider>
                            <div className="flex w-full justify-between pl-4">
                              <QuantityButtons
                                product={product}
                                className="pb-0"
                              />
                              <PriceFormatter
                                amount={(product?.price as number) * itemCount}
                                className="shrink-0 text-lg font-bold md:text-xl lg:text-2xl"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      className="bg-ink my-5 font-semibold hover:bg-red-500"
                      size="lg"
                      onClick={handleResetCart}
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden w-full rounded-lg border bg-white p-6 md:inline-block">
                      <h2 className="mb-4 text-xl font-semibold">
                        Order Summary
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Discount</span>
                          <span>
                            {" "}
                            -
                            <PriceFormatter
                              amount={getSubTotalPrice() - getTotalPrice()}
                            />
                          </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-lg font-semibold">
                          <span>Total</span>
                          <PriceFormatter
                            className="text-lg font-bold"
                            amount={getTotalPrice()}
                          />
                        </div>
                        <Button
                          className="hoverEffect w-full rounded-full font-semibold tracking-wide"
                          size="lg"
                          disabled={loading}
                          onClick={handleCheckout}
                        >
                          {loading ? "Please wait..." : "Proceed to Checkout"}
                        </Button>
                      </div>
                    </div>
                    {addresses && (
                      <div className="mt-5 rounded-md bg-white">
                        <Card className="p-4">
                          <CardHeader >
                            <CardTitle>Delivery Address</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              value={selectedAddress?._id}
                              onValueChange={(id) =>
                                setSelectedAddress(
                                  addresses?.find((addr) => addr._id === id) ??
                                    null,
                                )
                              }
                            >
                              {addresses.length === 0 && <div className="flex justify-center text-gray-500 font-semibold">No delivery address</div>}
                              {addresses?.map((addr) => (
                                <div
                                  className={`mb-4 flex cursor-pointer items-center space-x-2 ${selectedAddress?._id === addr?._id ? "text-accent-p" : "opacity-50"}`}
                                  key={addr?._id}
                                  onClick={() => setSelectedAddress(addr)}
                                >
                                  <RadioGroupItem
                                    value={addr?._id?.toString()}
                                  />
                                  <Label
                                    htmlFor={`address-${addr?._id}`}
                                    className="grid flex-1 gap-1.5"
                                  >
                                    <span className="font-semibold">
                                      {addr?.name}
                                    </span>
                                    <span className="text-sm text-black/60">
                                      {addr.address}, {addr.city}, {""}
                                      {addr.state}, {addr.zip}
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button
                              variant="outline"
                              onClick={() => setAddressDialogOpen(true)}
                              className="mt-4 w-full"
                            >
                              Add New Address
                            </Button>
                            <AddAddressDialog
                              open={addressDialogOpen}
                              onOpenChange={setAddressDialogOpen}
                              onSuccess={handleAddressAdded}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
                {/* Order summary for mobile view */}
                <div className="fixed bottom-0 left-0 w-full border-t bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden">
                  <div className="mx-auto max-w-lg space-y-2 px-4 py-3">
                    <p>Order Summary</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <PriceFormatter
                        className="text-gray-500"
                        amount={getSubTotalPrice()}
                      />
                    </div>
                    {getSubTotalPrice() - getTotalPrice() > 0 && (
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Discount</span>
                        <span className="flex items-center gap-0.5">
                          -
                          <PriceFormatter
                            className="text-gray-500"
                            amount={getSubTotalPrice() - getTotalPrice()}
                          />
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold"
                      />
                    </div>
                    <Button
                      className="hoverEffect w-full rounded-full font-semibold tracking-wide"
                      size="lg"
                      disabled={loading}
                      onClick={handleCheckout}
                    >
                      {loading ? "Please wait..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
