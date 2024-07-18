"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Select, Input, message, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const { Option } = Select;

const OrderTable = () => {
  
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
      const response = await axios.get("/api/UserOrder");
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch orders');
      //   }
      const orderData = response.data.orderData;
      console.log("orderData", orderData);
      // const data = await response.json();
      if (response.data.status === 200) {
        setOrders(orderData);
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
      // console.log(`Updating order ${selectedOrder.order_id} status to ${newStatus}`);
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
      // Here you would call your API to cancel the order
      // For now, we'll just log it and show a success message
      // console.log(`Cancelling order ${selectedOrder.order_id}. Reason: ${cancelReason}`);
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
      title: "Name",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "Mobile No",
      dataIndex: "Phone",
      key: "mobile",
    },
    {
      title: "Order Date",
      dataIndex: "added_on",
      key: "added_on",
      render: (added_on) => {
        if (!added_on) return "-";
        const date = new Date(added_on);
        return date.toDateString(); // You can change the format as needed
      },
    },
    {
      title: "Total Amount",
      dataIndex: "order_amount",
      key: "order_amount",
      render: (order_amount) => {
        return `${`Rs ${order_amount}`}`;
      },
    },
    {
      title: "Status",
      dataIndex: "status_name",
      key: "payment_status",
    },
    {
      title: "View Detail",
      key: "View Detail",
      render: (text, record) => {
        const router = useRouter();

        const ShowOrderDetail = () => {
          router.push(`/admin/Order_detail/${record.order_id}`);
        };
        return (
            <Button
              icon={<EditOutlined />}
              style={{ marginRight: 8 }}
              onClick={ShowOrderDetail}
            >
              View Detail
            </Button>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleStatusUpdate(record)}
            style={{ marginRight: 8 }}
          >
            Update Status
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleCancelOrder(record)}
            danger
          >
            Cancel Order
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={orders} rowKey="order_id" />
      </Spin>

      <Modal
        title="Update Order Status"
        open={isStatusModalVisible}
        onOk={updateOrderStatus}
        onCancel={() => setIsStatusModalVisible(false)}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select new status"
          onChange={(value) => setNewStatus(value)}
        >
          <Option value="order_confirmed">Order Confirmed</Option>
          <Option value="order_delivered">Order Delivered</Option>
          <Option value="delivered">Delivered</Option>
        </Select>
      </Modal>

      <Modal
        title="Cancel Order"
        open={isCancelModalVisible}
        onOk={cancelOrder}
        onCancel={() => setIsCancelModalVisible(false)}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter reason for cancellation"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default OrderTable;
