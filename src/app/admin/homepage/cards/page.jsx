"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Card, Switch } from 'antd';
import axios from 'axios';
import Image from "next/image";
const CardDectionPage = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    try {
      const data = await axios.get(`${process.env.BASE_URL}/adminHomePage/heroSections`);
      console.log("data", data.data.allHeroSections);
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
        }
        setIsModalVisible(false);
        form.resetFields();
        fetchHeroSections();
      } catch (error) {
        message.error('Operation failed');
      }
    });
  };

  const handleToggleActive = async (imageName, currentStatus) => {
    try {
      await updateHeroSection(imageName, { active: !currentStatus });
      message.success('Hero section status updated successfully');
      fetchHeroSections();
    } catch (error) {
      message.error('Status update failed');
    }
  };

  const columns = [
    { title: 'Redirect URL', dataIndex: 'redirect_url', key: 'redirect_url' },
    { title: 'Image Name', dataIndex: 'image_name', key: 'image_name' },
    { title: 'Image Location', dataIndex: 'image_location', key: 'image_location' },
    {
        title: 'Image',
        dataIndex: 'image_name',
        key: 'image_name',
        render: (text) => (
          <Image
            src={`/Assets/images/circular/Storm-Chair/Stro-Chair.png`}
            className='admin-product-img'
            alt={text}
            // style={{ width: '100px', height: '50px' }}
            // preview={false} // Disables the preview feature of Ant Design Image
            width={3}
                height={3}
                layout="responsive"
                objectFit="cover"
          />
        ),
      },
    { title: 'SEO', dataIndex: 'seo', key: 'seo' },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Switch
          checked={record.active}
          onChange={() => handleToggleActive(record.image_name, record.active)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => showModal(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <Card title="Card Section Page" style={{ margin: 24 }}>
      <Table 
        columns={columns} 
        dataSource={heroSections} 
        rowKey="id" 
        pagination={false}
      />
      <Modal
        title="Edit Hero Section"
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
          <Form.Item name="image_location" label="Image Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="seo" label="SEO" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CardDectionPage;