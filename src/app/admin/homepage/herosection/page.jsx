"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, message, Space } from 'antd';
import axios from 'axios';

const HeroSectionPage = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);

  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/adminHomePage/heroSections`);
      setHeroSections(response.data.allHeroSections);
    } catch (error) {
      message.error('Failed to fetch hero sections');
    }
  };

  const showModal = (record = null) => {
    setEditingId(record ? record.id : null);
    form.setFieldsValue(record || {});
    setIsModalVisible(true);
    setSelectedFile(null);
    setMobileImage(null);
  };

  const handleFileChange = (e, type) => {
    if (type === 'desktop') {
      setSelectedFile(e.target.files[0]);
    } else if (type === 'mobile') {
      setMobileImage(e.target.files[0]);
    }
  };

  const handleOk = () => {
    form.validateFields().then(async () => {
      try {
        const formData = new FormData();
        if (selectedFile) {
          formData.append('image', selectedFile);
        }
        if (mobileImage) {
          formData.append('mobile_image', mobileImage);
        }
        if (editingId) {
          formData.append('id', editingId);
          await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/adminHomePage/heroSections/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          message.success('Hero section updated successfully');
        } else {
          await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adminHomePage/heroSections`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/adminHomePage/heroSections?id=${id}`);
      message.success('Hero section deleted successfully');
      fetchHeroSections();
    } catch (error) {
      message.error('Delete operation failed');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image_name',
      key: 'image',
      render: (imageName) => (
        <img
          src={`/${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}/${imageName}`}
          alt={imageName}
          style={{ width: 100, height: 100, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Mobile Image',
      dataIndex: 'mobile_image_name',
      key: 'mobile_image',
      render: (imageName) => (
        <img
          src={`/${process.env.NEXT_PUBLIC_BANNERS_PATH_DIR}/${imageName}`}
          alt={imageName}
          style={{ width: 100, height: 100, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Hero Section
      </Button>
      <Table columns={columns} dataSource={heroSections} rowKey="id" />
      <Modal
        title={editingId ? 'Edit Hero Section' : 'Add Hero Section'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="image" label="Image">
            <input type="file" onChange={(e) => handleFileChange(e, 'desktop')} />
          </Form.Item>
          <Form.Item name="mobile_image" label="Mobile Image">
            <input type="file" onChange={(e) => handleFileChange(e, 'mobile')} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HeroSectionPage;
