import React from "react";
import Container from "./Container";
import Image from "next/image";
import { hero2 } from "@/images";
import { Title } from "./ui/text";
import Link from "next/link";

const HomeHero = () => {
  return (
    <Container className="relative px-0">
      <div className="text-ink absolute top-2 right-2 rounded-full bg-surface/10 px-6 py-2 text-sm font-semibold shadow backdrop-blur-xl md:top-8 md:right-8">
        From 1229 $
      </div>
      <div className="absolute bottom-2 left-2 z-10 rounded-full bg-surface/10 px-4 py-2 shadow backdrop-blur-xl md:bottom-8 md:left-8">
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
