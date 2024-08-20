
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
          const oid = {orderid: params.oid}

          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrderDetail`, oid);
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

      const handleStatusUpdate = (order) => {
        setSelectedOrder(order);
        setIsStatusModalVisible(true);
      };
    
      const handleCancelOrder = (order) => {
        setSelectedOrder(order);
        setIsCancelModalVisible(true);
      };
    
      const updateOrderStatus = async () => {
        try {
          // Here you would call your API to update the order status
          // For now, we'll just log it and show a success message
          message.success(`Order status updated to ${newStatus}`);
          setIsStatusModalVisible(false);
          // After successful update, refetch the orders
          await fetchOrders();
        } catch (error) {
          message.error("Failed to update order status");
        }
      };
    
      const cancelOrder = async () => {
        try {
          
          message.success("Order cancelled successfully");
          setIsCancelModalVisible(false);
          // After successful cancellation, refetch the orders
          await fetchOrders();
        } catch (error) {
          message.error("Failed to cancel order");
        }
      };
    
      const columns = [
        {
          title: "Sr No",
          dataIndex: "srNo",
          key: "srNo",
          render: (text, record, index) => index + 1,
        },
        {
          title: "Product Name",
          dataIndex: "product_name",
          key: "product_name",
        },
        {
          title: "Colour",
          dataIndex: "color",
          key: "color",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Per product Price",
          dataIndex: "prod_price",
          key: "prod_price",
          render: (prod_price) => {
            return `${`Rs ${prod_price}`}`;
          },
        },
        {
          title: "Extra Charge",
          dataIndex: "extraCharge",
          key: "extraCharge",
          render: (extraCharge) => {
            return `${`Rs ${extraCharge}`}`;
          },
        },
        {
          title: "Order Status",
          key: "Order Status",
          render: (text, record) => {
            if(record.per_order_status == 0 && record.cancel_order == 0){
              return 'Order Canceled'
            }else if(record.per_order_status == 0 && record.return_order == 0){
              return 'Order Returned'
            }else{
              return record.status_name;
            }
          },
        },
     
      ];
  return (
    <>
        <Spin spinning={loading}>
        <Table columns={columns} dataSource={orders} rowKey="order_id" />
      </Spin>

   
    </>
  );
};
export default Order_detail;
