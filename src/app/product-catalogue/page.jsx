"use client";
import { useState, useEffect } from 'react';
import PreChairsCards from "@/Components/ProductsCatlogue/PreChairCards";
import BoughtTogether from "@/Components/ProductsCatlogue/BoughtTogether";
import RecentlyViewed from "@/Components/ProductsCatlogue/RecentlyViewed";
import FooterRow from "@/Components/FooterRow/FooterRow";
import BottomCTABanner from "@/Components/ProductsCatlogue/BottomCTABanner";

const ProductCatlogue = () => {
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('searchedProducts');
    setSearchedProducts(storedProducts ? JSON.parse(storedProducts) : []);
  }, []);
  return (
    <>
      {/* <CatlogueBanner /> */}
      {/* <TopPics /> */}
      {/* <PremiumChairs /> */}
      <PreChairsCards />
      <BoughtTogether />
      {searchedProducts.length > 0 && <RecentlyViewed />}
      <FooterRow />
      <BottomCTABanner />
    </>
  );
};
export default ProductCatlogue;
