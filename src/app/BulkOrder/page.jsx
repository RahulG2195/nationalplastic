"use client";
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
const BulkOrderBannar = dynamic(() => import('@/Components/BulkOrder/BulkOrderBannar'), { ssr: false })
const GetQuote = dynamic(() => import('@/Components/BulkOrder/GetQuote'), { ssr: false })
const BulkPremiumCards = dynamic(() => import('@/Components/BulkOrder/BulkPremiumCards'), { ssr: false })
const BulkOrders = dynamic(() => import('@/Components/BulkOrder/BulkOrders'), { ssr: false })
import axios from "axios";
import { notifyError } from "@/utils/notify";

const BulkOrder = () => {
  const [ProdData, setProdData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Products`
        );
        setProdData(response.data.limitProd);
      } catch (error) {
        notifyError(error.meesage || "Error fetching products");
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <BulkOrderBannar />
      <GetQuote proddata={ProdData} />
      <BulkPremiumCards proddata={ProdData} />
      <BulkOrders />
    </>
  );
};
export default BulkOrder;
