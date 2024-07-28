"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const InfrastructureCMS = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('action', 'GET');
      const response = await axios.post('/api/admin/Aboutus/infraCMS', formData);
      setData(response.data.data);
    } catch (error) {
      message.error('Failed to fetch data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setImage(null);
    setModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      
      if (image) {
        formData.append('image', image);
      }else if(image_url){
        formData.delete('image_url', image_url);
      }
  
      if (editingId) {
        formData.append('id', editingId);
        formData.append('action', 'UPDATE');
      } else {
        formData.append('action', 'ADD');
      }
  
      try {
        const response = await axios.post('/api/admin/Aboutus/infraCMS', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        // console.log('Server response:', response.data);
        message.success(editingId ? 'Data updated successfully' : 'Data added successfully');
        setModalVisible(false);
        fetchData();
      } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        message.error('Failed to save data');
      }
    });
  };
  
  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setImage(null);
    setModalVisible(true);
  };
  
  const handleDelete = async (id) => {
    try {
      const formData = new FormData();
      formData.append('action', 'DELETE');
      formData.append('id', id);
      await axios.post('/api/admin/Aboutus/infraCMS', formData);
      message.success('Data deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete data');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
    { 
      title: 'Image', 
      dataIndex: 'image_url', 
      key: 'image_url',
      render: (image_url) => image_url ? 
        <Image src={`/Assets/uploads/Aboutus/${image_url}`} alt="Infrastructure" width={100} /> : 
        <span>Not uploaded</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
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
    <div style={{ padding: '20px' }}>
      <h1>Infrastructure CMS</h1>
      <Button icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: '20px' }}>
        Add New
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
      <Modal
        title={editingId ? 'Edit Infrastructure' : 'Add Infrastructure'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Image">
            <input type="file" onChange={handleFileChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InfrastructureCMS;


// http://localhost:3000/Assets/images/aboutIcons/map-image.jpeg

// http://localhost:3000/public/Assets/uploads/Aboutus/amazon_logo.png
// C:\Office\national\public\Assets\uploads\Aboutus
// http://localhost:3000/A
// http://localhost:3000/Assets/uploads/Aboutus/two.jpg

// /Assets/uploads


// http://localhost:3000/admin/aboutus/public/Assets/uploads/Aboutus/box1_image.jpg