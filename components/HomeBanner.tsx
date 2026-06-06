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
      <Title className=" tracking-tight text-center text-7xl">
        Technology,
        <br />
        Simplified.
      </Title>
      <p className="max-w-2xl text-center text-lg">
        Only the gear we&apos;d choose ourselves. No noise,
        <br /> no compromises.
      </p>
      <div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href='/shop'>
          <Button
            size="lg"
            className="rounded-full  bg-ink px-8 text-white hover:bg-gray-900"
          >
            Shop now
          </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-none rounded-full bg-surface hover:bg-surface-2 px-8">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
