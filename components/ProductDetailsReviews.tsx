"use client";
import React, { useState } from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";
import { DATA_review } from "@/constants/data";

const ProductDetailsReviews = () => {
  const [details, setDetails] = useState("");
  return (
    <Container className="">
      <div className="mb-10 flex justify-center  pt-5">
        <div className="inline-flex w-full flex-col">
          <div className="flex flex-col gap-2.5 border-t pt-5 md:flex-row md:px-20">
            <Button
            variant='default'
              onClick={() => setDetails("desc")}
              className={` hover:text-white hover:bg-accent-p/80 border-ink/10 rounded-none border py-5 text-black transition-all duration-300 md:w-1/3 md:rounded-sm ${details === "desc" ? "text-white bg-accent-p/80" : "bg-white"}`}
            >
              Description
            </Button>
            <Button
              onClick={() => setDetails("info")}
              className={`hover:text-white hover:bg-accent-p/80 border-ink/10 rounded-none border py-5 text-black transition-all duration-300 md:w-1/3 md:rounded-sm ${details === "info" ? "text-white bg-accent-p/80" : "bg-white"}`}
            >
              Additional Information
            </Button>
            <Button
              onClick={() => setDetails("rev")}
              className={`hover:text-white hover:bg-accent-p/80 border-ink/20 hover:bg-accent-p/70 rounded-none border py-5 text-black transition-all duration-300 md:w-1/3 md:rounded-sm ${details === "rev" ? "text-white bg-accent-p/80" : "bg-white"}`}
            >
              Reviews
            </Button>
          </div>

          <div className="mt-5 overflow-hidden md:px-25">
            <AnimatePresence mode="wait">
              {details === "desc" && (
                <motion.p
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <span className="block text-lg font-semibold tracking-wide">
                    TechCore Wireless Pro — Premium Audio Experience
                  </span>

                  <span className="block leading-relaxed text-gray-600">
                    Experience sound like never before with the TechCore
                    Wireless Pro. Engineered for audiophiles and everyday
                    listeners alike, this device delivers crystal-clear audio
                    with deep, rich bass and a wide soundstage that puts you
                    right in the middle of the music.
                  </span>

                  <span className="block font-medium">Key highlights:</span>

                  <span className="block leading-relaxed text-gray-600">
                    🔋{" "}
                    <span className="font-medium text-black">
                      18-hour battery life
                    </span>{" "}
                    — all-day listening without reaching for the charger.
                  </span>
                  <span className="block leading-relaxed text-gray-600">
                    📡{" "}
                    <span className="font-medium text-black">
                      Bluetooth 5.3
                    </span>{" "}
                    — instant, stable connection up to 30 meters range.
                  </span>
                  <span className="block leading-relaxed text-gray-600">
                    🏗️{" "}
                    <span className="font-medium text-black">
                      Aluminum alloy build
                    </span>{" "}
                    — lightweight yet durable, designed to last.
                  </span>
                  <span className="block leading-relaxed text-gray-600">
                    🌍{" "}
                    <span className="font-medium text-black">
                      Universal compatibility
                    </span>{" "}
                    — works seamlessly with iOS, Android, and Windows.
                  </span>

                  <span className="block text-sm text-gray-500 italic">
                    Backed by a 24-month warranty and dedicated customer
                    support.
                  </span>
                </motion.p>
              )}
              {details === "info" && (
                <motion.p
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Dimensions:{" "}
                    <span className="font-semibold tracking-wide">
                      12 x 8 x 4 cm
                    </span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Weight:{" "}
                    <span className="font-semibold tracking-wide">320 g</span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Color:{" "}
                    <span className="font-semibold tracking-wide">
                      Matte Black
                    </span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Brand:{" "}
                    <span className="font-semibold tracking-wide">
                      TechCore
                    </span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Material:{" "}
                    <span className="font-semibold tracking-wide">
                      Aluminum Alloy
                    </span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Warranty:{" "}
                    <span className="font-semibold tracking-wide">
                      24 months
                    </span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Battery Life:{" "}
                    <span className="font-semibold tracking-wide">
                      Up to 18 hours
                    </span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Connectivity:{" "}
                    <span className="font-semibold tracking-wide">
                      Bluetooth 5.3, USB-C
                    </span>
                  </p>
                  <p className="mb-2 flex items-center justify-between border-b px-2 pb-2">
                    Compatibility:{" "}
                    <span className="font-semibold tracking-wide">
                      iOS, Android, Windows
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-b px-2 pb-2">
                    Country of Origin:{" "}
                    <span className="font-semibold tracking-wide">Germany</span>
                  </p>
                </motion.p>
              )}
              {details === "rev" && (
                <motion.div
                  key="rev"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {DATA_review.map((review) => (
                    <div
                      key={review.name}
                      className="space-y-2 rounded-xl border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{review.name}</span>
                        <span className="text-sm text-gray-400">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailsReviews;
