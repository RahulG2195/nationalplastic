"use client";
import React, { useState, useEffect } from 'react';
import { Table, Input, Switch, Button, Modal, Rate, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const ReviewList = () => {
  const [review, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`);
      const { review } = response.data;
      setReviews(review);
      setFilteredReviews(review);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to fetch review',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = review.filter(review =>
      review.username?.toLowerCase().includes(value) ||
      review.review_message?.toLowerCase().includes(value)
    );
    setFilteredReviews(filtered);
  };

  const handleStatusChange = async (checked, reviewId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
        review_id: reviewId,
        review_status: checked ? 1 : 0
      });
      
      const updatedReviews = review.map(review => 
        review.review_id === reviewId 
          ? { ...review, review_status: checked ? 1 : 0 }
          : review
      );
      
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews);

      Modal.success({
        content: `Review ${checked ? 'approved' : 'disapproved'} successfully`,
      });
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to update review status',
      });
    }
  };

  const showDeleteConfirm = (review) => {
    setCurrentReview(review);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (currentReview) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
          data: { review_id: currentReview.review_id }
        });
        
        const updatedReviews = review.filter(
          review => review.review_id !== currentReview.review_id
        );
        setReviews(updatedReviews);
        setFilteredReviews(updatedReviews);
        
        Modal.success({
          content: 'Review deleted successfully',
        });
      } catch (error) {
        Modal.error({
          title: 'Error',
          content: 'Failed to delete review',
        });
      }
    }
    setDeleteModalOpen(false);
    setCurrentReview(null);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'review_id',
      key: 'review_id',
      width: 80,
      fixed: 'left',
    },
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id',
      width: 100,
    },
    {
      title: 'Rating',
      dataIndex: 'review_rate',
      key: 'review_rate',
      width: 150,
      render: (rate) => (
        <Rate disabled defaultValue={rate} />
      ),
    },
    {
      title: 'Review',
      dataIndex: 'review_message',
      key: 'review_message',
    },
    {
      title: 'Date',
      dataIndex: 'added_on',
      key: 'added_on',
      width: 150,
      render: (date) => moment(date).format('DD-MM-YYYY HH:mm'),
    },
    {
      title: 'Status',
      key: 'status',
      width: 100,
      render: (_, record) => (
        <Space>
          <Switch
            checked={record.review_status === 1}
            onChange={(checked) => handleStatusChange(checked, record.review_id)}
          />
          <Tag color={record.review_status === 1 ? 'green' : 'red'}>
            {record.review_status === 1 ? 'Approved' : 'Pending'}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button danger onClick={() => showDeleteConfirm(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Review Management</h1>
      
      <div className="mb-4">
        <Input
          placeholder="Search by username or review content"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredReviews}
        rowKey="review_id"
        scroll={{ x: 'max-content' }}
        loading={loading}
        pagination={{
          total: filteredReviews.length,
          pageSize: 10,
          showTotal: (total) => `Total ${total} review`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title="Confirm Delete"
        open={deleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this review?</p>
        <p>Review:{currentReview?.review_message}</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ReviewList;