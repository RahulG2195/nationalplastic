
import Banner from "@/Components/Home/Banner";
import CoupenBanner from "@/Components/Home/CoupenBanner";
import Features from "@/Components/Home/Features";
import TopPick from "@/Components/Home/TopPick";
  import '../styles/home_prod.css';
import ShopRoom from "@/Components/Home/ShopRoom";

export default function Home() {
 
  return (
    <main>
     <Banner/>
     <Features/>
     <CoupenBanner/>
     <TopPick/>
     <ShopRoom/>
    </main>
  )
}
