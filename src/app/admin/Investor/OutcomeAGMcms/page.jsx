"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const OutcomeAGMCMS = () => {
  const [outcomeAGM, setOutcomeAGM] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchOutcomeAGM();
  }, []);

  const fetchOutcomeAGM = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/OutcomeAGM');
  
      if (response.data && response.data.outcomeAGMData) {
        const formattedData = formatDataForTable(response.data.outcomeAGMData);
        setOutcomeAGM(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching OutcomeAGM data:', error);
      message.error('Failed to fetch OutcomeAGM data: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(item => ({
      key: item.id,
      financial_year: item.financial_year,
      notice_type: item.notice_type,
      notice_title: item.notice_title,
      file_path: item.file_path
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
        formData.append('financial_year', values.financial_year);
        formData.append('notice_type', values.notice_type);
        formData.append('notice_title', values.notice_title);
        if (fileList[0]) {
          formData.append('file', fileList[0].originFileObj);
        }
        
        if (editingId) {
          formData.append('id', editingId);
          await axios.put(`/api/admin/Investors/OutcomeAGM`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('OutcomeAGM updated successfully');
        } else {
          await axios.post('/api/admin/Investors/OutcomeAGM', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('OutcomeAGM added successfully');
        }
        setIsModalVisible(false);
        fetchOutcomeAGM();
      } catch (error) {
        message.error('Failed to save OutcomeAGM');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;
      await axios.delete('/api/admin/Investors/OutcomeAGM', { 
        data: { id: id } 
      });
      message.success('OutcomeAGM deleted successfully');
      fetchOutcomeAGM();
    } catch (error) {
      message.error('Failed to delete OutcomeAGM');
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
      title: 'Financial Year',
      dataIndex: 'financial_year',
      key: 'financial_year',
    },
    {
      title: 'Notice Type',
      dataIndex: 'notice_type',
      key: 'notice_type',
    },
    {
      title: 'Notice Title',
      dataIndex: 'notice_title',
      key: 'notice_title',
    },
    {
      title: 'File',
      dataIndex: 'file_path',
      key: 'file_path',
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
        Add OutcomeAGM
      </Button>
      <Table columns={columns} dataSource={outcomeAGM} />
      <Modal
        title={editingId ? 'Edit OutcomeAGM' : 'Add OutcomeAGM'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="financial_year" label="Financial Year" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="notice_type" label="Notice Type" rules={[{ required: true }]}>
            <Select>
              <Option value="Outcome of AGM">Outcome of AGM</Option>
              <Option value="Scrutinizer Report">Scrutinizer Report</Option>
              <Option value="Voting Results">Voting Results</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notice_title" label="Notice Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file_path" label="PDF File" rules={[{ required: !editingId }]}>
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

export default OutcomeAGMCMS;