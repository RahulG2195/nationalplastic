
import Banner from "@/Components/Home/Banner";
import CoupenBanner from "@/Components/Home/CoupenBanner";
import Features from "@/Components/Home/Features";
import TopPick from "@/Components/Home/TopPick";
  import '../styles/home_prod.css';
import ShopRoom from "@/Components/Home/ShopRoom";
import Manufacture from "@/Components/Home/Manufacture";
import Houseware from "@/Components/Home/Houseware";
import Highlight from "@/Components/Home/Highlight";
import HappyStory from "@/Components/Home/HappyStory";

export default function Home() {
 
  return (
    <main>
     <Banner />
     <Features/>
     <CoupenBanner/>
     <TopPick/>
     <Manufacture/>
     <ShopRoom/>
     <Houseware/>
     <Highlight/>
     <HappyStory/>
    </main>
  )
}


