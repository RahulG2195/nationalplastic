import Banner from "@/Components/Home/Banner";
import CoupenBanner from "@/Components/Home/CoupenBanner";
import Features from "@/Components/Home/Features";
import TopPick from "@/Components/Home/TopPick";
import ShopRoom from "@/Components/Home/ShopRoom";
import Manufacture from "@/Components/Home/Manufacture";
import Houseware from "@/Components/Home/Houseware";
import Highlight from "@/Components/Home/Highlight";
import HappyStory from "@/Components/Home/HappyStory";
import Dealers from "@/Components/Home/Dealers";
import Blog from "@/Components/Home/Blog";
import Catalogue from "@/Components/Home/Catalogue";
import "../styles/home_prod.css";
import AOS from "aos";
import "aos/dist/aos.css";
import CommingSoon from "./CommingSoon/page";

export const metadata = {
  title: 'Nationalplastic - Home | Quality Plastic Furniture & Household Items',
  description: 'Discover our wide range of affordable plastic chairs, stools, and household items. Quality products from Nationalplastic, a trusted, listed company.',
  keywords: 'Nationalplastic, plastic chairs, stools, household items, affordable furniture, listed company',
  openGraph: {
    title: 'Nationalplastic - Affordable Plastic Furniture & Household Items',
    description: 'Browse Nationalplastic\'s selection of durable plastic chairs, stools, and household essentials. Quality products from a trusted, listed company.',
    images: [
      {
        url: 'https://nationalplastic.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nationalplastic Product Showcase',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nationalplastic - Affordable Plastic Furniture & Household Items',
    description: 'Browse Nationalplastic\'s selection of durable plastic chairs, stools, and household essentials. Quality products from a trusted, listed company.',
    images: ['https://nationalplastic.com/twitter-image.jpg'],
  },
};

export default function Home() {


  return (
    <main>
      {/* <CommingSoon /> */}
      <Banner />
      {/* <Features /> */}

      {/* show only when user is not login  */}
      {
        // (!ValidateLogin) && <CoupenBanner />
      }
      <CoupenBanner />
      <TopPick />
      <Manufacture />
      <ShopRoom />
      {/* <Houseware /> */}
      <Highlight />
      <HappyStory />
      <Dealers />
      {/* <Blog /> */}
      <Catalogue />
      {/* <ScrollToTop displayType="htmlArrow" /> */}
    </main>
  );
}