"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AnnualReport = () => {
  const [AnnualReports, setAnnualReports] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchAnnualReports();
  }, []);

  const fetchAnnualReports = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/Finance/AnnualReport');
  
      if (response.data && response.data.annual_report_returnData) {
        
        const formattedData = formatDataForTable(response.data.annual_report_returnData);
        setAnnualReports(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching Annual Reports data:', error);
      message.error('Failed to fetch Annual Reports data: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(item => ({
      key: item.arr_id,
      years: item.years,
      cat_name: item.cat_name,
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
        formData.append('years', values.years);
        formData.append('title', values.title);
        formData.append('cat_name', values.cat_name);
        if (fileList[0]) {
          formData.append('file_name', fileList[0].originFileObj);
        }
        
        console.log('editingId', editingId);
        if (editingId) {

          formData.append('editingId', editingId);
          await axios.put(`/api/admin/Investors/Finance/AnnualReport`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('AnnualReports updated successfully');
        } else {
          await axios.post('/api/admin/Investors/Finance/AnnualReport', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('AnnualReports added successfully');
        }
        setIsModalVisible(false);
        fetchAnnualReports();
      } catch (error) {
        message.error('Failed to save AnnualReports');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;

      await axios.delete('/api/admin/Investors/Finance/AnnualReport',{ 
        data: { id: id } 
      });
      message.success('AnnualReports deleted successfully');
      fetchAnnualReports();
    } catch (error) {
      message.error('Failed to delete AnnualReports');
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
      title: 'cat_name',
      dataIndex: 'cat_name',
      key: 'cat_name',
    },
    {
      title: 'id',
      dataIndex: 'arr_id',
      key: 'arr_id',
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
        Add Annual Reports & Returns
      </Button>
      <Table columns={columns} dataSource={AnnualReports} />
      <Modal
        title={editingId ? 'Edit AnnualReports' : 'Add AnnualReports'}
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
          <Form.Item name="cat_name" label="cat_name" rules={[{ required: true }]}>
            <Select>
              <Option value="Annual Return">Annual Return</Option>
              <Option value="Annual Report">Annual Report</Option>
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

export default AnnualReport;