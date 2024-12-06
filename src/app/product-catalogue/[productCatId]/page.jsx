import TopPics from "@/Components/ProductsCatlogue/TopPics";
import CatlogueBanner from "../../../Components/ProductsCatlogue/Banner";
import PremiumChairs from "@/Components/ProductsCatlogue/PremiumChairs";
import PreChairsCards from "@/Components/ProductsCatlogue/PreChairCards";
import BoughtTogether from "@/Components/ProductsCatlogue/BoughtTogether";
import RecentlyViewed from "@/Components/ProductsCatlogue/RecentlyViewed";
import FooterRow from "@/Components/FooterRow/FooterRow";
import BottomCTABanner from "@/Components/ProductsCatlogue/BottomCTABanner";
import Head from 'next/head';
import PRODUCT_CATEGORIES from "./catSchema";
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

const ProductCatlogue = ({ params }) => {
  const { productCatId } = params;

  // Prepare breadcrumb schema dynamically or fetch from the constant
  const breadcrumbSchema = PRODUCT_CATEGORIES[productCatId] || {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.nationalplastic.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Premium Event Chair",
        "item": "https://www.nationalplastic.com/product-catalogue/premium-event-chair"
      }
    ],
    metadata: {
      baseUrl: "https://www.nationalplastic.com",
      pagePath: "/product-catalogue/premium-event-chair",
      canonicalUrl: "https://www.nationalplastic.com/product-catalogue/premium-event-chair",
      imageUrl:
        "https://www.nationalplastic.com/_next/image?url=https%3A%2F%2Fnationalplastic.com%2Fuploads%2Fuploads%2Fbanner%2FPremium%20Event%20Chairs.jpg&w=1920&q=75",
      openGraph: {
        type: "website",
        siteName: "National Plastic",
      },
      twitter: {
        card: "summary_large_image",
      },
    },
  };

  return (
    <>
      <Head>
        <meta property="og:type" content={breadcrumbSchema.metadata.openGraph.type} />
        <meta property="og:site_name" content={breadcrumbSchema.metadata.openGraph.siteName} />
        <meta property="og:url" content={breadcrumbSchema.metadata.canonicalUrl} />
        <meta property="og:image" content={breadcrumbSchema.metadata.imageUrl} />
        <meta name="twitter:card" content={breadcrumbSchema.metadata.twitter.card} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <CatlogueBanner catName={params.productCatId} />
      {/* Uncomment other components if needed */}
      {/* <TopPics /> */}
      <PreChairsCards />
      <BoughtTogether />
      <RecentlyViewed />
      {/* <FooterRow /> */}
      {/* <BottomCTABanner /> */}
    </>
  );
};

export default ProductCatlogue;