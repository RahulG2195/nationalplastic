"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AdvertisementCMS = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/Advertisements');
      const formattedData = formatDataForTable(response.data);
      setAdvertisements(formattedData);
    } catch (error) {
      message.error('Failed to fetch advertisements');
    }
  };

  const formatDataForTable = (data) => {
    return Object.entries(data).flatMap(([year, quarters]) =>
      Object.entries(quarters).flatMap(([quarter, ads]) =>
        ads.map((ad) => ({
          key: ad.id,
          fiscalYear: year,
          quarter,
          newspaper: ad.newspaper,
          pdf: ad.pdf,
        }))
      )
    );
  };

  const showModal = (record = null) => {
    if (record) {
      form.setFieldsValue(record);
      setEditingId(record.id);
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
        formData.append('fiscalYear', values.fiscalYear);
        formData.append('quarter', values.quarter);
        formData.append('newspaper', values.newspaper);
        if (fileList[0]) {
          formData.append('pdf', fileList[0].originFileObj);
        }

        if (editingId) {
          formData.append('editingId', editingId);
          await axios.put(`/api/admin/Investors/Advertisements`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Advertisement updated successfully');
        } else {
          await axios.post('/api/admin/Investors/Advertisements', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Advertisement added successfully');
        }
        setIsModalVisible(false);
        fetchAdvertisements();
      } catch (error) {
        message.error('Failed to save advertisement');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;

      await axios.delete('/api/admin/Investors/Advertisements',{ 
        data: { id: id } 
      });
      message.success('Advertisement deleted successfully');
      fetchAdvertisements();
    } catch (error) {
      message.error('Failed to delete advertisement');
    }
  };

  const columns = [
    {
      title: 'Fiscal Year',
      dataIndex: 'fiscalYear',
      key: 'fiscalYear',
    },
    {
      title: 'Quarter',
      dataIndex: 'quarter',
      key: 'quarter',
    },
    {
      title: 'Newspaper',
      dataIndex: 'newspaper',
      key: 'newspaper',
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      hidden: true
    },
    {
      title: 'PDF',
      dataIndex: 'pdf',
      key: 'pdf',
      render: (text) => <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${text}`} target="_blank" rel="noopener noreferrer">View PDF</a>,
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
        Add Advertisement
      </Button>
      <Table columns={columns} dataSource={advertisements} />
      <Modal
        title={editingId ? 'Edit Advertisement' : 'Add Advertisement'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fiscalYear" label="Fiscal Year" rules={[{ required: true }]}>
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
          <Form.Item name="newspaper" label="Newspaper" rules={[{ required: true }]}>
          <Select>
              <Option value="Business Standard">Business Standard</Option>
              <Option value="Mumbai Lakshdeep">Mumbai Lakshdeep</Option>
            </Select>
          </Form.Item>
          <Form.Item name="pdf" label="PDF File" rules={[{ required: !editingId }]}>
            <Upload 
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Select PDF</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdvertisementCMS;