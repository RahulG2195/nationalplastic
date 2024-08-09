"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const AwardsCMS = () => {
  const [pageContent, setPageContent] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('action', 'GET');
      const response = await axios.post('/api/admin/Aboutus/awardsCMS', formData);
      setPageContent(response.data.pageContent[0]);
      setCertificates(response.data.certificates);
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (type, record = null) => {
    setEditingType(type);
    setEditingId(record ? record.id : null);
    
    if (type === 'page_content') {
      form.setFieldsValue({
        title: pageContent.title || '',
        description: pageContent.description || '',
      });
    } else {
      form.setFieldsValue({
        image: record ? [{ url: record.image_url }] : [],
        display_order: record ? record.display_order : null,
      });
    }
    
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('action', editingId ? 'UPDATE' : 'ADD');
      if (editingId) formData.append('id', editingId);
      Object.keys(values).forEach(key => {
        if (key === 'image' && values[key] && values[key][0]) {
          formData.append('image', values[key][0].originFileObjnot)
        } else {
          formData.append(key, values[key]);
        }
      });
      if (image) {
        formData.append('image', image);
      }
      formData.append('content_type', editingType);

      await axios.post('/api/admin/Aboutus/awardsCMS', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success(`Item ${editingId ? 'updated' : 'added'} successfully`);
      setModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('Failed to save data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const formData = new FormData();
      formData.append('action', 'DELETE');
      formData.append('id', id);
      await axios.post('/api/admin/Aboutus/awardsCMS', formData);
      message.success('Item deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete item');
    }
  };


    const columns = [
      {
        title: 'Image',
        dataIndex: 'image_url',
        key: 'image_url',
        render: (text) => text ? <img src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${text}`} alt="certificate" style={{ width: 50 }} /> : 'No image',
      },
      {
        title: 'Display Order',
        dataIndex: 'display_order',
        key: 'display_order',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <>
            <Button icon={<EditOutlined />} onClick={() => showModal(record.content_type, record)} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
          </>
        ),
      },
    ];
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
  
  return (
    <div style={{ padding: 24 }}>
      <h1>Awards & Certificates CMS</h1>
      
      <h2>Page Content</h2>
      <Button onClick={() => showModal('page_content', pageContent)} style={{ marginBottom: 16 }}>
        Edit Page Content
      </Button>

      <h2>Certificates</h2>
      <Button onClick={() => showModal('certificate')} style={{ marginBottom: 16 }}>
        Add Certificate
      </Button>
      <Table columns={columns} dataSource={certificates} rowKey="id" loading={loading} />

      <Modal
        title={editingId ? 'Edit Item' : 'Add Item'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          {editingType === 'page_content' ? (
            <>
              <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Image">
            <input type="file" onChange={handleFileChange} />
          </Form.Item>
              <Form.Item name="display_order" label="Display Order" rules={[{ required: true }]}>
                <InputNumber min={1} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AwardsCMS;