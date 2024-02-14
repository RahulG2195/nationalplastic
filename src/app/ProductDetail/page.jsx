import ProdData from "@/Components/ProductDetail/ProdData";
import Breadcrump from "../Breadcromp/page";
import RecentlyViewedDetails from "@/Components/ProductDetail/RecentlyViewedDetails/RecentlyViewedDetails";
import CustomerReview from "@/Components/ProductDetail/CustomerReview/CustomerReview";
import Faqs from "@/Components/FAQs/Faqs";
import FooterRow from "@/Components/FooterRow/FooterRow";

function page() {
  return (
    <>
      <div className="pd-wrap">
        <Breadcrump />
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
