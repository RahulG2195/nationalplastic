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
  const [ordersDetail, setordersDetail] = useState([]);
  const [AllOrderData, setAllOrderData] = useState([]);
  const [OrderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`);
      
      const orderData = response.data.orderData;
      const UserOrderListDetail = response.data.orderDetailData;
      const OrderStatusApi = response.data.OrderStatus;

      // const data = await response.json();
      if (response.data.status === 200) {
        setOrders(orderData);
        setOrderStatus(OrderStatusApi)
        // setordersDetail(UserOrderListDetail);
        
            
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
    // console.log('order', order);
    setSelectedOrder(order);
    setIsStatusModalVisible(true);
  };


  const updateOrderStatus = async () => {
    try {
      const data = {newStatus: newStatus, order_id: selectedOrder}
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`, data);
      // console.log('response', response);

      message.success(`Order status has been updated`);
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
        // render: (FirstName, LasttName) => {
        //   const fullName = FirstName + ' ' + LasttName;
        //   return fullName;
        // },
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
      title: "Payment Type",
      dataIndex: "order_payment_type",
      key: "order_payment_type",
    },
    {
      title: "View Detail",
      key: "View Detail",
      render: (text, record) => {

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
            onClick={() => handleStatusUpdate(record.order_id)}
            style={{ marginRight: 8 }}
          >
            Update Status
          </Button>
          {/* <Button
            icon={<DeleteOutlined />}
            onClick={() => handleCancelOrder(record)}
            danger
          >
            Cancel Order
          </Button> */}
        </>
      ),
    },
  ];

  // console.log('AllOrderData', AllOrderData);
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
          placeholder="Update Status"
          onChange={(value) => setNewStatus(value)}
        >
          {
            OrderStatus.map(data => {
              return  <Option value={data.status_id}>{data.status_name}</Option>
            })
          }
        </Select>
      </Modal>

      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default OrderTable;
