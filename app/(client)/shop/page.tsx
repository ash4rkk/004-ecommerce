import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function ShopFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 className="size-8 animate-spin text-accent-p" />
    </div>
  );
}

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <Suspense fallback={<ShopFallback />}>
      <Shop categories={categories} brands={brands} />
    </Suspense>
  );
};

export default ShopPage;
