"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CorporateGov = () => {
  const [Corporate, setCorp] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchUnaudited();
  }, []);

  const fetchUnaudited = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/CorporateGov');
  
      if (response.data && response.data.SharedData) {
        
        const formattedData = formatDataForTable(response.data.SharedData);
        setCorp(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching Corporate data:', error);
      message.error('Failed to fetch Corporate data: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(item => ({
      key: item.cop2_id,
      years: item.years,
      quarter: item.quarter,
      title: item.title,
      file_name: item.file_name
    }));
  };

  const showModal = (record = null) => {
      // console.log('record', record);
      if (record) {
      console.log('record1', record.key);

      form.setFieldsValue(record);
      setEditingId(record.key);
      console.log('key', record.key);
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
        formData.append('years', "Year" + values.years);
        formData.append('title', values.title);
        formData.append('quarter', values.quarter);
        if (fileList[0]) {
          formData.append('file_name', fileList[0].originFileObj);
        }
        
        console.log('editingId', editingId);
        if (editingId) {

          formData.append('editingId', editingId);
          await axios.put(`/api/admin/Investors/CorporateGov`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Corporate updated successfully');
        } else {
          await axios.post('/api/admin/Investors/CorporateGov', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Corporate added successfully');
        }
        setIsModalVisible(false);
        fetchUnaudited();
      } catch (error) {
        message.error('Failed to save Corporate');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;

      await axios.delete('/api/admin/Investors/CorporateGov',{ 
        data: { id: id } 
      });
      message.success('Corporate deleted successfully');
      fetchUnaudited();
    } catch (error) {
      message.error('Failed to delete Corporate');
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
      title: 'quarter',
      dataIndex: 'quarter',
      key: 'quarter',
    },
    {
      title: 'id',
      dataIndex: 'cop2_id',
      key: 'cop2_id',
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
       <h1>Corporate Report</h1>
      <Button icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: '20px' }}>
        Add Corporate
      </Button>
      <Table columns={columns} dataSource={Corporate} />
      <Modal
        title={editingId ? 'Edit Corporate' : 'Add Corporate'}
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
          <Form.Item name="quarter" label="Quarter" rules={[{ required: true }]}>
            <Select>
              <Option value="Q1">Q1</Option>
              <Option value="Q2">Q2</Option>
              <Option value="Q3">Q3</Option>
              <Option value="Q4">Q4</Option>
            </Select>
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

export default CorporateGov;