"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import { Title } from "@/components/ui/text";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItem());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [adresses, setAddresses] = useState<null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  return (
    <div className="pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                {" "}
                <ShoppingBag className="text-darkColor"/> 
                <Title>Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border rounded-md">
                    {groupedItems?.map(({product}) => {
                      const itemCount = getItemCount(product?._id)
                      return (
                        <div key={product?._id} className="border-b p-2.5 last:border-b-0">
                          <div>
                            {product?.images && 
                            <Link href={`/product/${product?.slug?.current}`}>
                            <Image src={urlFor(product?.images[0]).url()} alt='Product Image' width={500} height={500} loading="lazy" className="w-32 md:w-40 h-32 md:h-40 object-contain border-r"/>
                            </Link>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div>Sumary</div>
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
