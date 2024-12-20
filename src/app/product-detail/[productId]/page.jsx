import ProdData from "@/Components/ProductDetail/ProdData";
import Breadcrump from "../../Breadcromp/page";
import RecentlyViewedDetails from "@/Components/ProductDetail/RecentlyViewedDetails/RecentlyViewedDetails";
import CustomerReview from "@/Components/ProductDetail/CustomerReview/CustomerReview";
import Faqs from "@/Components/FAQs/Faqs";
import FooterRow from "@/Components/FooterRow/FooterRow";

async function getProductData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/productSeo?id=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const { productId } = params;
  const productData = await getProductData(productId);
  return {
    title: productData.meta_title || `Product: ${productData.product_name}`,
    description: productData.meta_description || `Details for ${productData.product_name}`,
  };
}

function page({params}) {
  const { productId } = params;

  return (
    <>
      <div className="pd-wrap">
        <ProdData />
        <RecentlyViewedDetails id={productId} />
        
        {/* <CustomerReview /> */}
        <Faqs />
        {/* <FooterRow /> */}
      </div>
    </>
  );
}

export default page;
