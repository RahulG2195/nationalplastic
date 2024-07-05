"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Select, Input, message, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/UserOrder');
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch orders');
    //   }
      const data = await response.json();
      if (data.status === 200) {
        setOrders(data.orderData);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
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
      message.error('Failed to update order status');
    }
  };

  const cancelOrder = async () => {
    try {
      // Here you would call your API to cancel the order
      // For now, we'll just log it and show a success message
      // console.log(`Cancelling order ${selectedOrder.order_id}. Reason: ${cancelReason}`);
      message.success('Order cancelled successfully');
      setIsCancelModalVisible(false);
      // After successful cancellation, refetch the orders
      await fetchOrders();
    } catch (error) {
      message.error('Failed to cancel order');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
    {
      title: 'Actions',
      key: 'actions',
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
        visible={isStatusModalVisible}
        onOk={updateOrderStatus}
        onCancel={() => setIsStatusModalVisible(false)}
      >
        <Select
          style={{ width: '100%' }}
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
        visible={isCancelModalVisible}
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