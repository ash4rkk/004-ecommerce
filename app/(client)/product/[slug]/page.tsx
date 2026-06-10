import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { getProductBySlug } from "@/sanity/queries";
import { CornerDownLeft, Dot, StarIcon, Truck } from "lucide-react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import ProductDetailsReviews from "@/components/ProductDetailsReviews";
import { notFound } from "next/navigation";
import AddToWishlistButton from "@/components/AddToWishlistButton";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const isStock = (product?.stock as number) > 0;
  if (!product) {
    return notFound();
  }
  return (
    <>
      <Container className="flex flex-col gap-10 py-10 md:flex-row">
        {product?.images && (
          <ImageView images={product?.images} isStock={isStock} />
        )}
        <div className="border-darkColor/10 flex w-full flex-col gap-5 rounded-md bg-white p-5 md:w-1/2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{product?.name}</h2>
            <p className="text-sm tracking-wide text-gray-900">
              {product?.description}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-baseline gap-1">
                <StarIcon size={12} className="fill-ink" />
                <p className="font-bold">{product?.averageRating}</p>
              </div>
              <span className="text-ink-muted">
                {product?.totalReviews} reviews
              </span>
              <div className="flex items-center gap-0">
                <Dot />
                <span
                  className={`rounded-lg text-sm font-bold ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-accent-p"}`}
                >
                  {(product?.stock as number) > 0
                    ? "In Stock - ships today"
                    : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex justify-between items-center space-y-2 border-t border-b border-gray-200 py-2">
            <PriceView
              className="text-3xl font-bold"
              price={product?.price}
              discount={product?.discount}
            />
            <div className="flex items-center gap-2.5 lg:gap-5">
            <AddToCartButton classNameButton="py-5.5 px-10 rounded-2xl" className={"flex-1"} product={product} />
            <AddToWishlistButton className='' product={product} />
          </div>
          </div>
          
          <ProductCharacteristics product={product} />
          <div className="-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5">
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <RxBorderSplit className="text-lg" />
              <p>Compare color</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <FaRegQuestionCircle className="text-lg" />
              <p>Ask a question</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <TbTruckDelivery className="text-lg" />
              <p>Delivery & Return</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <FiShare2 className="text-lg" />
              <p>Share</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-lightColor/25 flex items-center gap-2.5 border border-b-0 p-3">
              <Truck size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Free Delivery
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  {" "}
                  Enter your Postal Code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="border-lightColor/25 flex items-center gap-2.5 border border-b p-3">
              <CornerDownLeft size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Return Delivery
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  {" "}
                  Free 30 days Delivery Return
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ProductDetailsReviews />
    </>
  );
};

export default SingleProductPage;
