"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space  } from 'antd';
// import { getAllHeroSections, addHeroSection, updateHeroSection, deleteHeroSection } from './api'; // Import your API functions
import axios from 'axios';

const HeroSectionPage = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    try {
      const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/adminHomePage/heroSections`);

      setHeroSections(data.data.allHeroSections);
    } catch (error) {
      message.error('Failed to fetch hero sections');
    }
  };

  const showModal = (record = null) => {
    setEditingId(record ? record.id : null);
    form.setFieldsValue(record || {});
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingId) {
          await updateHeroSection(editingId, values);
          message.success('Hero section updated successfully');
        } else {
          await addHeroSection(values);
          message.success('Hero section added successfully');
        }
        setIsModalVisible(false);
        form.resetFields();
        fetchHeroSections();
      } catch (error) {
        message.error('Operation failed');
      }
    });
  };

  const handleDelete = async (imageName) => {
    try {
      await deleteHeroSection(imageName);
      message.success('Hero section deleted successfully');
      fetchHeroSections();
    } catch (error) {
      message.error('Delete operation failed');
    }
  };

  const columns = [
    { title: 'Redirect URL', dataIndex: 'redirect_url', key: 'redirect_url' },
    { title: 'Image Name', dataIndex: 'image_name', key: 'image_name' },
    { title: 'SEO', dataIndex: 'seo', key: 'seo' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
        <Button onClick={() => showModal(record)}>Edit</Button>
        <Button danger onClick={() => handleDelete(record.image_name)}>Delete</Button>
      </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Hero Section
      </Button>
      <Table columns={columns} dataSource={heroSections} rowKey="id" />
      <Modal
        title={editingId ? "Edit Hero Section" : "Add Hero Section"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="redirect_url" label="Redirect URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image_name" label="Image Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="seo" label="SEO" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HeroSectionPage;