"use client";
import { useState, useEffect } from "react";
import BulkOrderBannar from "@/Components/BulkOrder/BulkOrderBannar";
import GetQuote from "@/Components/BulkOrder/GetQuote";
import BulkPremiumCards from "@/Components/BulkOrder/BulkPremiumCards";
import BulkOrders from "@/Components/BulkOrder/BulkOrders";
import axios from "axios";

const BulkOrder = () => {
  const [ProdData, setProdData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Products"
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
