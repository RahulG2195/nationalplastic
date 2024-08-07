"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import numberWithCommas from "@/utils/formatnumber";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [prodcount, setprodcount] = useState([]);
  const [TotalUser, setTotalUser] = useState([]);
  const [TotalCat, setTotalCat] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const OrderDataApi = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Count`
      );

      const OrderCount = OrderDataApi.data.OrderCount;
      const ProductCount = OrderDataApi.data.allProducts;
      const TotalUsers = OrderDataApi.data.TotalUser;
      const TotalCat = OrderDataApi.data.TotalCat;

      // const data = await OrderDataApi.json();
      if (OrderDataApi.data.status === 200) {
        setOrders(OrderCount);
        setprodcount(ProductCount);
        setTotalUser(TotalUsers);
        setTotalCat(TotalCat);
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container admin_dashboard">
        <div className="row">
          <div className="col">
            <div class="card text-center">
              <div class="card-body">
                <h4 class="card-title">Total Orders</h4>
                <p class="card-text">
                  {orders.map((data) => data.order_count)} +
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card text-center">
              <div class="card-body">
                <h4 class="card-title">Total Reveniue</h4>
                <p class="card-text">
                  Rs {orders.map((data) => numberWithCommas(data.order_amt))}{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card text-center">
              <div class="card-body">
                <h4 class="card-title">Total Users</h4>
                <p class="card-text">
                  {TotalUser.map((data) => data.cust_count)} +
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card text-center">
              <div class="card-body">
                <h4 class="card-title">Total Products</h4>
                <p class="card-text">
                  {prodcount.map((data) => data.prod_count)} +
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card text-center">
              <div class="card-body">
                <h4 class="card-title">Total Category</h4>
                <p class="card-text">
                  {TotalCat.map((data) => data.cat_count)} +
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
