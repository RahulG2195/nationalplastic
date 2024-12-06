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
  title: 'India\'s Largest House hold Product Manufacturers | High Quality Plastic Durable Products',
  description: 'Discover premium plastic chairs, tables & cabinets for every space. Our durable, stylish furniture offers perfect solutions for homes, offices, and events. Browse our collection today!',
  keywords: 'plastic chairs, tables, cabinets, durable furniture, home furniture, office furniture, event furniture',
  openGraph: {
    url: 'https://www.nationalplastic.com/',
    type: 'website',
    title: 'India\'s Largest House hold Product Manufacturers | High Quality Plastic Durable Products',
    description: 'Discover premium plastic chairs, tables & cabinets for every space. Our durable, stylish furniture offers perfect solutions for homes, offices, and events. Browse our collection today!',
    images: [
      {
        url: 'https://nationalplastic.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'National Plastic - Premium Plastic Furniture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nationalplastic',
    title: 'India\'s Largest House hold Product Manufacturers | High Quality Plastic Durable Products',
    description: 'Discover premium plastic chairs, tables & cabinets for every space. Our durable, stylish furniture offers perfect solutions for homes, offices, and events. Browse our collection today!',
    images: ['https://nationalplastic.com/og-image.jpg'],
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