import Container from "@/components/Container"
import HomeBanner from "@/components/HomeBanner"
import HomeHero from "@/components/HomeHero"
import LatestBlog from "@/components/LatestBlog"
import ProductGrid from "@/components/ProductGrid"
import ShopByBrands from "@/components/ShopByBrands"
import { getCategories } from "@/sanity/queries"


const Home =  async () => {
  const categories = await getCategories(6)
  return (
    <>
      <Container>
        <HomeBanner/>
        <HomeHero />
          <ProductGrid />
{/*           <HomeCategories categories={categories}/>
 */}          <ShopByBrands />
          <LatestBlog />
      </Container>
    </>
  )
}

export default Home