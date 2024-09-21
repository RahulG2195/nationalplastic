import PreChairsCards from "@/Components/ProductsCatlogue/PreChairCards";
import BoughtTogether from "@/Components/ProductsCatlogue/BoughtTogether";
import RecentlyViewed from "@/Components/ProductsCatlogue/RecentlyViewed";
import FooterRow from "@/Components/FooterRow/FooterRow";
import BottomCTABanner from "@/Components/ProductsCatlogue/BottomCTABanner";

const ProductCatlogue = () => {
  
  return (
    <>
      {/* <CatlogueBanner /> */}
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
