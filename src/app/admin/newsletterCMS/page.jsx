"use client";

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { DeleteOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';

const NewsletterCMS = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock data for subscribed users
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' },
    { id: 3, email: 'user3@example.com' },
  ]);
  const [justMail, setJustMail] = useState('');

  useEffect(() => {
    fetchSubscribedUsers();
  }, []);

  const fetchSubscribedUsers = async () => {
    const response = await axios.get('/api/newsletter');
    setUsers(response.data.results);
    setJustMail(response.data.justEmails);
  }

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
          danger
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try{
    const response = await axios.delete(`/api/newsletter?id=${id}`)
      if (!response.data.success ) {
        throw new Error('Failed to Delete');
      }
     message.success('Deleted successfully');
    fetchSubscribedUsers();

    }catch(e){
        message.error('Failed To delete');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSendEmail = async (values) => {
    const response = await axios.post('/api/send-newsletter', { data: values , email: justMail})
    message.success('Email sent successfully');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-6">
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={showModal}
        className="mb-4"
      >
        Send Email
      </Button>

      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title="Send Email"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSendEmail} layout="vertical">
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please input the subject!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewsletterCMS;