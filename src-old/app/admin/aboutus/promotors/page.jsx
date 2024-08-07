"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message, InputNumber, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const TeamMembersCMS = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/promotors');
      if (response.data.status === 200) {
        setTeamMembers(response.data.teamMembers);
      } else {
        message.error('Failed to fetch team members');
      }
    } catch (error) {
      message.error('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (record = null) => {
    setEditingId(record ? record.id : null);
    form.setFieldsValue(record || {});
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
          formData.append('image', values[key][0].originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      });

      await axios.post('/api/admin/promotors', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success(`Team member ${editingId ? 'updated' : 'added'} successfully`);
      setModalVisible(false);
      fetchTeamMembers();
    } catch (error) {
      message.error('Failed to save team member');
    }
  };

  const handleDelete = async (id) => {
    try {
      const formData = new FormData();
      formData.append('action', 'DELETE');
      formData.append('id', id);
      await axios.post('/api/admin/promotors', formData);
      message.success('Team member deleted successfully');
      fetchTeamMembers();
    } catch (error) {
      message.error('Failed to delete team member');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => text ? <img src={text} alt="team member" style={{ width: 50 }} /> : 'No image',
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
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Team Members CMS</h1>
      
      <Button onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Team Member
      </Button>
      <Table columns={columns} dataSource={teamMembers} rowKey="id" loading={loading} />

      <Modal
        title={editingId ? 'Edit Team Member' : 'Add Team Member'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Image" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="display_order" label="Display Order" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamMembersCMS;