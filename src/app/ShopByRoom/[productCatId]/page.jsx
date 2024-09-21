import TopPics from "@/Components/ProductsCatlogue/TopPics";
import CatlogueBanner from "../../../Components/ShopByRoom/Banner";
import PremiumChairs from "@/Components/ProductsCatlogue/PremiumChairs";
import PreChairsCards from "@/Components/ShopByRoom/PreChairCards";
import BoughtTogether from "@/Components/ProductsCatlogue/BoughtTogether";
import RecentlyViewed from "@/Components/ProductsCatlogue/RecentlyViewed";
import FooterRow from "@/Components/FooterRow/FooterRow";
import BottomCTABanner from "@/Components/ProductsCatlogue/BottomCTABanner";



async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/shopByRoom?id=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const { productCatId } = params;
  const categoryData = await getData(productCatId);
  return {
    title: categoryData.meta_title || `Product: ${categoryData.id}`,
    description: categoryData.meta_description || `Details for ${id}`,
  };
}



const ProductCatlogue = () => {
  return (
    <>
      <CatlogueBanner />
      {/* <TopPics /> */}
      {/* <PremiumChairs /> */}
      <PreChairsCards />
      <BoughtTogether />
      <RecentlyViewed />
      <FooterRow />
      <BottomCTABanner />
    </>
  );
};
export default ProductCatlogue;
