import { cn } from "@/lib/utils";
import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={cn("mx-auto px-4 max-w-7xl", className)}>{children}</div>
    </>
  );
}

export default Container;
