import TopPics from "@/Components/ProductsCatlogue/TopPics";
import CatlogueBanner from "../../../Components/ProductsCatlogue/Banner";
import PremiumChairs from "@/Components/ProductsCatlogue/PremiumChairs";
import PreChairsCards from "@/Components/ProductsCatlogue/PreChairCards";
import BoughtTogether from "@/Components/ProductsCatlogue/BoughtTogether";
import RecentlyViewed from "@/Components/ProductsCatlogue/RecentlyViewed";
import FooterRow from "@/Components/FooterRow/FooterRow";
import BottomCTABanner from "@/Components/ProductsCatlogue/BottomCTABanner";
async function getCategoryData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categorySeo?id=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const { productCatId } = params;
  const categoryData = await getCategoryData(productCatId);
  return {
    title: categoryData.meta_title || `Product: ${categoryData.category_name}`,
    description: categoryData.meta_description || `Details for ${categoryData.category_name}`,
  };
}
const ProductCatlogue = ({ params}) => {

  
  return (
    <>
      <CatlogueBanner catName={params.productCatId}/>
      {/* <TopPics /> */}
      {/* <PremiumChairs /> */}
      <PreChairsCards />
      <BoughtTogether />
      <RecentlyViewed />
      {/* <FooterRow /> */}
      {/* <BottomCTABanner /> */}
    </>
  );
};
export default ProductCatlogue;
