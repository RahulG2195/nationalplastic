
"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Select, Input, message, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const { Option } = Select;


const Order_detail = ({params}) => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [cancelReason, setCancelReason] = useState("");

    useEffect(() => {
        fetchOrders();
      }, []);

    
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const oid = params.oid
          const response = await axios.post(`/api/UserOrderDetail/`, { oid });
          
          const UserOrderDetail = response.data.orderData;
          
          if (response.data.status === 200) {
            setOrders(UserOrderDetail);
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
        {params.oid}
    </>
  );
};
export default Order_detail;
