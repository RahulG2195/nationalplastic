"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CorpReport = () => {
  const [CorpReport, setCReport] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchCorpReport();
  }, []);

  const fetchCorpReport = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/CorpReport');
  
      if (response.data && response.data.SharedData) {
        
        const formattedData = formatDataForTable(response.data.SharedData);
        setCReport(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching CorpReport data:', error);
      message.error('Failed to fetch CorpReport data: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(item => ({
      key: item.cat1_id,
      cor_type: item.cor_type,
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
        formData.append('title', values.title);
        formData.append('cor_type', values.cor_type);
        if (fileList[0]) {
          formData.append('file_name', fileList[0].originFileObj);
        }
        
        if (editingId) {

          formData.append('editingId', editingId);
          await axios.put(`/api/admin/Investors/CorpReport`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('CorpReport updated successfully');
        } else {
          await axios.post('/api/admin/Investors/CorpReport', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('CorpReport added successfully');
        }
        setIsModalVisible(false);
        fetchCorpReport();
      } catch (error) {
        message.error('Failed to save Corp Report');
        console.log('error', error);
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;

      await axios.delete('/api/admin/Investors/CorpReport',{ 
        data: { id: id } 
      });
      message.success('CorpReport deleted successfully');
      fetchCorpReport();
    } catch (error) {
      message.error('Failed to delete CorpReport');
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
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'cor_type',
      dataIndex: 'cor_type',
      key: 'cor_type',
    },
    {
      title: 'id',
      dataIndex: 'cat1_id',
      key: 'cat1_id',
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
        Add CorpReport
      </Button>
      <Table columns={columns} dataSource={CorpReport} />
      <Modal
        title={editingId ? 'Edit CorpReport' : 'Add CorpReport'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cor_type" label="cor_type" rules={[{ required: true }]}>
            <Select>
              <Option value="Corporate Governance">Corporate Governance</Option>
              <Option value="Corporate Report">Corporate Report</Option>
              <Option value="Policy">Policy</Option>

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

export default CorpReport;