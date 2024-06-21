"use client";
import Banner from "@/components/Home/Banner";
import CoupenBanner from "@/components/Home/CoupenBanner";
import Features from "@/components/Home/Features";
import TopPick from "@/components/Home/TopPick";
import ShopRoom from "@/components/Home/ShopRoom";
import Manufacture from "@/components/Home/Manufacture";
import Houseware from "@/components/Home/Houseware";
import Highlight from "@/components/Home/Highlight";
import HappyStory from "@/components/Home/HappyStory";
import Dealers from "@/components/Home/Dealers";
import Blog from "@/components/Home/Blog";
import Catalogue from "@/components/Home/Catalogue";
import "../styles/home_prod.css";
import { React, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
