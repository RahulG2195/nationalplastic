"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const Notice = () => {
  const [Notice, setout] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchOutcome();
  }, []);

  const fetchOutcome = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/Notice');
  
      if (response.data && response.data.noticeData) {
        
        const formattedData = formatDataForTable(response.data.noticeData);
        setout(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching Notice data:', error);
      message.error('Failed to fetch Notice data: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(item => ({
      key: item.ad_id,
      years: item.years,
      title: item.title,
      file_name: item.file_name
    }));
  };

  const showModal = (record = null) => {
      if (record) {

      form.setFieldsValue(record);
      setEditingId(record.key);
      setFileList([]);
    } else {
      form.resetFields();
      setEditingId(null);
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        formData.append('years', values.years);
        formData.append('title', values.title);
        if (fileList[0]) {
          formData.append('file_name', fileList[0].originFileObj);
        }
        if (editingId) {

          formData.append('editingId', editingId);
          await axios.put(`/api/admin/Investors/Notice`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Notice updated successfully');
        } else {
          await axios.post('/api/admin/Investors/Notice', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Notice added successfully');
        }
        setIsModalVisible(false);
        fetchOutcome();
      } catch (error) {
        message.error('Failed to save Notice');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;

      await axios.delete('/api/admin/Investors/Notice',{ 
        data: { id: id } 
      });
      message.success('Notice deleted successfully');
      fetchOutcome();
    } catch (error) {
      message.error('Failed to delete Notice');
    }
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Years',
      dataIndex: 'years',
      key: 'years',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'id',
      dataIndex: 'ad_id',
      key: 'ad_id',
      hidden: true
    },
    {
      title: 'file_name',
      dataIndex: 'file_name',
      key: 'file_name',
      render: (text) => <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${text}`} target="_blank" rel="noopener noreferrer">View File</a>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} danger />
        </>
      ),
    },
  ];

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <div style={{ padding: '20px' }}>
      <Button icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: '20px' }}>
        Add Notice
      </Button>
      <Table columns={columns} dataSource={Notice} />
      <Modal
        title={editingId ? 'Edit Notice' : 'Add Notice'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="years" label="Years" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file_name" label="Pdf File" rules={[{ required: !editingId }]}>
            <Upload 
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Notice;