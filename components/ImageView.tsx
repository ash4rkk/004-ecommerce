"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
interface Props {
  images?: Product["images"];
  isStock?: boolean;
}
const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="w-full space-y-2 md:w-1/2 md:space-y-4">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="group max-h-137.5 min-h-117.5 w-full overflow-hidden rounded-md"
        >
          <Image
            src={urlFor(active).url()}
            alt="productImage"
            width={700}
            height={700}
            priority
            className={`bg-surface h-96 max-h-137.5 min-h-125 w-full rounded-md object-contain transition-transform duration-300 ease-[cubic-bezier(0.0,0,0.5,1)] hover:scale-105 ${!isStock && "opacity-50"}`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid h-20 grid-cols-4 gap-2 md:h-24">
        {images?.map((image) => (
          <button
            key={image?._key}
            onClick={() => setActive(image)}
            className={`bg-surface border-muted overflow-hidden rounded-md border-3 ${active?._key === image?._key ? "border-accent-p/50 opacity-100" : "opacity-80"}`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className="h-full w-full object-cover transition-transform  active:scale-98"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
