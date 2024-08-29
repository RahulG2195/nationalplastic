"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Select, Input, message, Spin, Space } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { cancelOrderMail, sendOrderStatusUpdateEmail } from "@/utils/CancelProduct"
const { Option } = Select;

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [OrderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`);

      const orderData = response.data.orderData;
      const OrderStatusApi = response.data.OrderStatus;
      console.log("data")
      console.log("ALl data " + JSON.stringify(orderData));
      console.log("data" + JSON.stringify(OrderStatusApi));
      if (response.data.status === 200) {
        setOrders(orderData);
        setOrderStatus(OrderStatusApi);
      } else {
        throw new Error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const handleStatusUpdate = (order) => {
    setSelectedOrder(order);
    setIsStatusModalVisible(true);
  };

  const updateOrderStatus = async () => {
    try {
      const data = { newStatus: newStatus, order_id: selectedOrder }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`, data);

      message.success(`Order status has been updated`);
      setIsStatusModalVisible(false);
      const order = orders.find(o => o.order_id === selectedOrder);

      if (order) {
        await sendOrderStatusUpdateEmail({
          order_id: order.order_id,
          newStatus: newStatus,
          customer_email: order.customer_email
        });
      }
      await fetchOrders();
    } catch (error) {
      message.error("Failed to update order status");
    }
  };
  const handleCancelOrder = (orderId, customer_email) => {
    setSelectedOrder(orderId);
    setEmail(customer_email);
    setIsCancelModalVisible(true);
  };

  const cancelOrder = async () => {
    try {
      const data = { order_id: selectedOrder, cancelReason: cancelReason, email: email };
      try {
        await cancelOrderMail(data);
      } catch (error) {
        message.error("Failed to cancel order Mail");
        return;
      }

      // New code starts here
      const cancelStatusId = OrderStatus.find(status => status.status_name === "Canceled")?.status_id;
      if (!cancelStatusId) {
        throw new Error("Cancelled status not found");
      }

      const updateData = { newStatus: cancelStatusId, order_id: selectedOrder };
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/UserOrder`, updateData);
      // New code ends here

      message.success("Order cancelled successfully");
      setIsCancelModalVisible(false);
      setCancelReason("");
      await fetchOrders();
    } catch (error) {
      message.error("Failed to cancel order: " + error.message);
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
      title: "customer_email",
      dataIndex: "customer_email",
      key: "customer_email",
      hidden: true,
    },
    {
      title: "Name",
      dataIndex: "FirstName",
      key: "FirstName",
      filteredValue: filteredInfo.FirstName || null,
      onFilter: (value, record) => record.FirstName.includes(value),
      sorter: (a, b) => a.FirstName.localeCompare(b.FirstName),
      sortOrder: sortedInfo.columnKey === 'FirstName' && sortedInfo.order,
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
      render: (added_on) => added_on ? moment(added_on).format('YYYY-MM-DD') : "-",
      filteredValue: filteredInfo.added_on || null,
      onFilter: (value, record) => {
        if (record.added_on) {
          const date = moment(record.added_on);
          return date.isBetween(value[0], value[1], null, '[]');
        }
        return false;
      },
      sorter: (a, b) => moment(a.added_on).unix() - moment(b.added_on).unix(),
      sortOrder: sortedInfo.columnKey === 'added_on' && sortedInfo.order,
    },
    {
      title: "Total Amount",
      dataIndex: "order_amount",
      key: "order_amount",
      render: (order_amount) => `Rs ${order_amount}`,
      sorter: (a, b) => a.order_amount - b.order_amount,
      sortOrder: sortedInfo.columnKey === 'order_amount' && sortedInfo.order,
    },
    {
      title: "Status",
      dataIndex: "status_name",
      key: "status_name",
      filters: OrderStatus.map(status => ({ text: status.status_name, value: status.status_name })),
      filteredValue: filteredInfo.status_name || null,
      onFilter: (value, record) => record.status_name === value,
    },
    {
      title: "Payment Type",
      dataIndex: "order_payment_type",
      key: "order_payment_type",
      filters: [
        { text: "Cash on Delivery", value: "COD" },
        { text: "Online", value: "Online" },
      ],
      filteredValue: filteredInfo.order_payment_type || null,
      onFilter: (value, record) => record.order_payment_type === value,
    },
    {
      title: () => <div style={{ textAlign: 'center' }}>Actions</div>,
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/Order_detail/${record.order_id}`)}
          >
            View Detail
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleStatusUpdate(record.order_id)}
          >
            Update Status
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleCancelOrder(record.order_id, record.customer_email)}
            danger
          >
            Cancel Order
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
        <Select
          style={{ width: 200 }}
          placeholder="Filter by Status"
          onChange={(value) => {
            const filters = { ...filteredInfo, status_name: value ? [value] : null };
            setFilteredInfo(filters);
          }}
          allowClear
        >
          {OrderStatus.map(status => (
            <Option key={status.status_id} value={status.status_name}>{status.status_name}</Option>
          ))}
        </Select>
      </Space>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="order_id"
          onChange={handleChange}
        />
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
          {OrderStatus.map(data => (
            <Option key={data.status_id} value={data.status_id}>{data.status_name}</Option>
          ))}
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