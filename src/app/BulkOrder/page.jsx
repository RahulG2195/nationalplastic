"use client";
import { useState, useEffect } from "react";
import BulkOrderBannar from "@/components/BulkOrder/BulkOrderBannar";
import GetQuote from "@/components/BulkOrder/GetQuote";
import BulkPremiumCards from "@/components/BulkOrder/BulkPremiumCards";
import BulkOrders from "@/components/BulkOrder/BulkOrders";
import axios from "axios";

const BulkOrder = () => {
  const [ProdData, setProdData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "/api/Products"
        );
        setProdData(response.data.limitProd);
      } catch (error) {
        alert("error");
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
