"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const Shareholding = () => {
  const [Shareholding, setAnnualReports] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [fileList4, setFileList4] = useState([]);

  useEffect(() => {
    fetchShareholding();
  }, []);

  const fetchShareholding = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/Shareholding');
  
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
      key: item.sc_id,
      years: item.years,
      q1: item.q1,
      file_name1: item.file_name1
    }));
  };

  const showModal = (record = null) => {
      if (record) {
      form.setFieldsValue(record);
      setEditingId(record.key);
      setFileList1([]);
      setFileList2([]);
      setFileList3([]);
      setFileList4([]);
    } else {
      form.resetFields();
      setEditingId(null);
      setFileList1([]);
      setFileList2([]);
      setFileList3([]);
      setFileList4([]);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        formData.append('years', values.years);
        formData.append('q1', values.q1);
        formData.append('q2', values.q2);
        formData.append('q3', values.q3);
        formData.append('q4', values.q4);
        if (fileList1[0]) {
          formData.append('file_name1', fileList1[0].originFileObj);
        }
        if (fileList2[0]) {
          formData.append('file_name2', fileList2[0].originFileObj);
        }
        if (fileList3[0]) {
          formData.append('file_name3', fileList3[0].originFileObj);
        }
        if (fileList4[0]) {
          formData.append('file_name4', fileList4[0].originFileObj);
        }

        
        if (editingId) {

          formData.append('editingId', editingId);
          await axios.put(`/api/admin/Investors/Shareholding`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Shareholding updated successfully');
        } else {
          await axios.post('/api/admin/Investors/Shareholding', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Shareholding added successfully');
        }
        setIsModalVisible(false);
        fetchShareholding();
      } catch (error) {
        message.error('Failed to save Shareholding');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;

      await axios.delete('/api/admin/Investors/Shareholding',{ 
        data: { id: id } 
      });
      message.success('Shareholding deleted successfully');
      fetchShareholding();
    } catch (error) {
      message.error('Failed to delete Shareholding');
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
      title: 'q1',
      dataIndex: 'q1',
      key: 'q1',
    },
    {
      title: 'id',
      dataIndex: 'sc_id',
      key: 'sc_id',
      hidden: true
    },
    {
      title: 'file_name1',
      dataIndex: 'file_name1',
      key: 'file_name1',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">View File</a>,
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

  const handleFileChange1 = ({ fileList }) => setFileList1(fileList);
  const handleFileChange2 = ({ fileList }) => setFileList2(fileList);
  const handleFileChange3 = ({ fileList }) => setFileList3(fileList);
  const handleFileChange4 = ({ fileList }) => setFileList4(fileList);

  return (
    <div style={{ padding: '20px' }}>
      <Button icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: '20px' }}>
        Add Annual Reports & Returns
      </Button>
      <Table columns={columns} dataSource={Shareholding} />
      <Modal
        title={editingId ? 'Edit Shareholding' : 'Add Shareholding'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="years" label="Years" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          
          {/* <Form.Item name="q1" label="q1" rules={[{ required: true }]}>
            <Select>
              <Option value="Annual Return">Annual Return</Option>
              <Option value="Annual Report">Annual Report</Option>
            </Select>
          </Form.Item> */}
          <Form.Item name="q1" label="Title 1" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file_name1" label="Pdf File 1" rules={[{ required: !editingId }]}>
            <Upload 
              beforeUpload={() => false}
              onChange={handleFileChange1}
              fileList={fileList1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="q2" label="Title 2" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file_name2" label="Pdf File 2" rules={[{ required: !editingId }]}>
            <Upload 
              beforeUpload={() => false}
              onChange={handleFileChange2}
              fileList={fileList1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="q3" label="Title 3" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file_name3" label="Pdf File 3" rules={[{ required: !editingId }]}>
            <Upload 
              beforeUpload={() => false}
              onChange={handleFileChange3}
              fileList={fileList1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="q4" label="Title 4" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file_name4" label="Pdf File 4" rules={[{ required: !editingId }]}>
            <Upload 
              beforeUpload={() => false}
              onChange={handleFileChange4}
              fileList={fileList1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Shareholding;