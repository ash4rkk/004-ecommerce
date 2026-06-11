import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { banner_1 } from "@/images";
import { Button } from "./ui/button";

function HomeBanner() {
  return (
    <div className="flex flex-col items-center justify-between space-y-4 rounded-lg bg-white px-10 py-16 md:pt-22 md:pb-14 lg:px-24">
      <p className="text-accent-p uppercase">new collection·2026</p>
      <Title className="text-center text-5xl md:text-7xl tracking-tight">
        Technology,
        <br />
        Simplified.
      </Title>
      <p className="max-w-2xl text-center text-sm md:text-lg">
        Only the gear we&apos;d choose ourselves. No noise,
        <br /> no compromises.
      </p>
      <div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/shop">
            <Button
              size="lg"
              className="hoverEffect bg-ink rounded-full px-8 text-white hover:scale-105 hover:bg-gray-900"
            >
              Shop now
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="bg-surface hoverEffect hover:bg-surface-2 rounded-full border-none px-8 hover:scale-105"
          >
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
