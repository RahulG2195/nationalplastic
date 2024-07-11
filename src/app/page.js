"use client";
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
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CommingSoon from "./CommingSoon/page";

export default function Home() {
  // alert(pool)
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);
  return (
    <>
      <main>
        {/* <CommingSoon /> */}
        <Banner />
        <Features />
        <CoupenBanner />
        <TopPick />
        <Manufacture />
        <ShopRoom />
        <Houseware />
        <Highlight />
        <HappyStory />
        <Dealers />
        <Blog />
        <Catalogue />
      </main>
    </>
  );
}
