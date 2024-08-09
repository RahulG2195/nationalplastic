"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AuditedPage = () => {
  const [Audited, setAudited] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchAudited();
  }, []);

  const fetchAudited = async () => {
    try {
      const response = await axios.get('/api/admin/Investors/Finance/Audited');
  
      if (response.data && response.data.auditedData) {
        const formattedData = formatDataForTable(response.data.auditedData);
        setAudited(formattedData);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected data structure received from server');
      }
    } catch (error) {
      console.error('Error fetching Audited data:', error);
      message.error('Failed to fetch Audited data: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDataForTable = (data) => {
    return data.map(item => ({
      key: item.aud_id,
      years: item.years,
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
        
        console.log('editingId', editingId);
        if (editingId) {

          formData.append('editingId', editingId);
          await axios.put(`/api/admin/Investors/Finance/Audited`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Audited updated successfully');
        } else {
          await axios.post('/api/admin/Investors/Finance/Audited', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          message.success('Audited added successfully');
        }
        setIsModalVisible(false);
        fetchAudited();
      } catch (error) {
        message.error('Failed to save Audited');
      }
    });
  };

  const handleDelete = async (record) => {
    try {
      const id = record.key;
      console.log('id', record);
      await axios.delete('/api/admin/Investors/Finance/Audited',{ 
        data: { id: id } 
      });
      message.success('Audited deleted successfully');
      fetchAudited();
    } catch (error) {
      message.error('Failed to delete Audited');
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
      title: 'aud_id',
      dataIndex: 'aud_id',
      key: 'aud_id',
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
        Add Audited
      </Button>
      <Table columns={columns} dataSource={Audited} />
      <Modal
        title={editingId ? 'Edit Audited' : 'Add Audited'}
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

export default AuditedPage;