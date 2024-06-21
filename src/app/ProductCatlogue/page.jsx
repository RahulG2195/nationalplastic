import PreChairsCards from "@/components/ProductsCatlogue/PreChairCards";
import BoughtTogether from "@/components/ProductsCatlogue/BoughtTogether";
import RecentlyViewed from "@/components/ProductsCatlogue/RecentlyViewed";
import FooterRow from "@/components/FooterRow/FooterRow";
import BottomCTABanner from "@/components/ProductsCatlogue/BottomCTABanner";

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
