
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Input, Select, Button, message, Popconfirm , Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const CommitteesManagement = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.post('/api/admin/committees-and-management', { action: 'GET' });
      if (response.data.status === 200) {
        setData(response.data.data.flatMap(item => 
          item.members.map(member => {
            const [name, position] = member.split(', ');
            return {
              id: `${item.category}-${name}`,
              category: item.category,
              type: item.type,
              name: name,
              position: position,
            };
          })
        ));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (values) => {
    try {
      const response = await axios.post('/api/admin/committees-and-management', { action: 'ADD', ...values });
      if (response.data.status === 201) {
        message.success('Item added successfully');
        fetchData();
        form.resetFields();
      } else {
        message.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      message.error('Failed to add item');
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
    setIsModalVisible(true);
  };

const handleSave = async () => {
  try {
    const row = await form.validateFields();
    const response = await axios.post('/api/admin/committees-and-management', { 
      action: 'UPDATE', 
      ...row, 
      id: editingKey.split('-')[1] 
    });
    if (response.data.status === 200) {
      message.success('Item updated successfully');
      setEditingKey('');
      setIsModalVisible(false);
      form.resetFields();
      fetchData();
    } else {
      message.error('Failed to update item');
    }
  } catch (error) {
    console.error('Error updating item:', error);
    message.error('Failed to update item');
  }
};

const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingKey('');
    form.resetFields();
  };
  
  const handleModalOk = () => {
    handleSave();
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
        console.log("id" + id);
      const response = await axios.post('/api/admin/committees-and-management', { 
        action: 'DELETE', 
        id: id.split('-')[1] 
      });
      if (response.data.status === 200) {
        message.success('Item deleted successfully');
        fetchData();
      } else {
        message.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      message.error('Failed to delete item');
    }
  };

  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
          <Popconfirm title="Are you sure you want to delete this item?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Commite and Management Section</h1>
      <Form form={form} onFinish={handleAdd} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="category" rules={[{ required: true }]}>
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item name="type" rules={[{ required: true }]}>
          <Select style={{ width: 120 }} placeholder="Type">
            <Option value="committee">Committee</Option>
            <Option value="management">Management</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="position" rules={[{ required: true }]}>
          <Input placeholder="Position" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add
          </Button>
        </Form.Item>
      </Form>
      {editingKey && (
        <Button onClick={handleSave} style={{ marginBottom: 16 }}>
          Save
        </Button>
      )}
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal
  title="Edit Item"
  visible={isModalVisible}
  onOk={handleModalOk}
  onCancel={handleModalCancel}
>
  <Form form={form} layout="vertical">
    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="type" label="Type" rules={[{ required: true }]}>
      <Select>
        <Option value="committee">Committee</Option>
        <Option value="management">Management</Option>
      </Select>
    </Form.Item>
    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="position" label="Position" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </Form>
</Modal>
    </div>
  );
};

export default CommitteesManagement;