import ProdData from "@/Components/ProductDetail/ProdData";
import Breadcrump from "../../Breadcromp/page";
import RecentlyViewedDetails from "@/Components/ProductDetail/RecentlyViewedDetails/RecentlyViewedDetails";
import CustomerReview from "@/Components/ProductDetail/CustomerReview/CustomerReview";
import Faqs from "@/Components/FAQs/Faqs";
import FooterRow from "@/Components/FooterRow/FooterRow";

async function getProductData(id) {
  // Replace this with your actual API call
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/productSeo?id=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  console.log('params' + params);
  const { productId } = params;

  const productData = await getProductData(productId);
  console.log('productData' + productData);
  console.log('productData' + JSON.stringify(productData));

  return {
    title: productData.metaTitle || `Product: ${productData.product_name}`,
    description: productData.metaDescription || `Details for ${productData.product_name}`,
  };
}

function page() {

  return (
    <>
      <div className="pd-wrap">
        <ProdData />
        <RecentlyViewedDetails />
        <CustomerReview />
        <Faqs />
        {/* <FooterRow /> */}
      </div>
    </>
  );
}

export default page;
