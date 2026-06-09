import React from "react";
import Container from "./Container";
import Image from "next/image";
import { hero2 } from "@/images";
import { Title } from "./ui/text";
import Link from "next/link";

const HomeHero = () => {
  return (
    <Container className="relative px-0">
      <div className="bg-accent-p absolute top-8 right-8 rounded-full px-6 py-2 text-sm font-semibold text-white shadow">
        From 1229 $
      </div>
      <div className="bg-white absolute bottom-8 left-8 z-10 rounded-full px-4 py-2 shadow">
        <p className="text-ink/80 text-sm font-bold uppercase">
          Iphone 15 Pro Max
        </p>
      </div>
      <Image
        src={hero2}
        alt="Hero banner"
        className="h:60 w-full rounded-lg object-cover md:h-100"
        priority
      />
    </Container>
  );
};

export default HomeHero;
