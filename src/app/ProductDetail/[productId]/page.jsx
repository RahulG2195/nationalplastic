import ProdData from "@/components/ProductDetail/ProdData";
import Breadcrump from "../../Breadcromp/page";
import RecentlyViewedDetails from "@/components/ProductDetail/RecentlyViewedDetails/RecentlyViewedDetails";
import CustomerReview from "@/components/ProductDetail/CustomerReview/CustomerReview";
import Faqs from "@/components/FAQs/Faqs";
import FooterRow from "@/components/FooterRow/FooterRow";

function page() {
  return (
    <>
      <div className="pd-wrap">
        <ProdData />
        <RecentlyViewedDetails />
        <CustomerReview />
        <Faqs />
        <FooterRow />
      </div>
    </>
  );
}

export default page;
