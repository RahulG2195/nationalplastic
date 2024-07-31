'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Layout, Menu, Button, Form, Input, Table, Modal, Upload, message 
} from 'antd';
import { 
  EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined 
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { TextArea } = Input;

const IEPFCMS = () => {
  const [nodalOfficerData, setNodalOfficerData] = useState(null);
  const [unclaimedDividendContent, setUnclaimedDividendContent] = useState('');
  const [shareTransferData, setShareTransferData] = useState([]);
  const [unclaimedDividendData, setUnclaimedDividendData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editingSection, setEditingSection] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [nodalResponse, shareResponse, dividendResponse] = await Promise.all([
        axios.get('/api/admin/Investors/iepfCMS?section=NodalOfficerDetails'),
        axios.get('/api/admin/Investors/iepfCMS?section=ShareTransfer'),
        axios.get('/api/admin/Investors/iepfCMS?section=UnclaimedDividend')
      ]);

      setNodalOfficerData(nodalResponse.data.pageData[0]);
      setShareTransferData(shareResponse.data.pageData);
      setUnclaimedDividendContent(dividendResponse.data.pageData[0].content);
      setUnclaimedDividendData(dividendResponse.data.pageData[0].reports);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data');
    }
  };

  const handleEdit = (record, section) => {
    console.log("record ", record);
    console.log("section ", section);
    if (section === 'UnclaimedDividendContent') {
        setEditingRecord({ content: unclaimedDividendContent });
      } else {
        setEditingRecord(record);
      }
    // setEditingRecord(record);
    setEditingSection(section);
    setEditModalVisible(true);
  };

  const handleDelete = async (id, section) => {
    try {
      await axios.delete(`/api/admin/Investors/iepfCMS?section=${section}&id=${id}`);
      message.success('Record deleted successfully');
      fetchAllData();
    } catch (error) {
      console.error('Error deleting record:', error);
      message.error('Failed to delete record');
    }
  };

  const handleSave = async (values) => {
    try {
      if (editingSection === 'NodalOfficerDetails') {
        await axios.put('/api/admin/Investors/iepfCMS?section=NodalOfficerDetails', values);
      } else if (editingSection === 'UnclaimedDividendContent') {
        await axios.put('/api/admin/Investors/iepfCMS?section=UnclaimedDividendContent', { content: values.content });
      } else {
        await axios.put(`/api/admin/Investors/iepfCMS?section=${editingSection}`, { ...values, id: editingRecord.id });
      }
      message.success('Record updated successfully');
      setEditModalVisible(false);
      fetchAllData();
    } catch (error) {
      console.error('Error updating record:', error);
      message.error('Failed to update record');
    }
  };

  const handleAdd = async (values, section) => {
    try {
      await axios.post(`/api/admin/Investors/iepfCMS?section=${section}`, values);
      message.success('Record added successfully');
      fetchAllData();
    } catch (error) {
      console.error('Error adding record:', error);
      message.error('Failed to add record');
    }
  };

  const handleFileUpload = async (file, section, id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('section', section);
    formData.append('id', id);

    try {
      await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('File uploaded successfully');
      fetchAllData();
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Failed to upload file');
    }
  };

  const columns = {
    shareTransfer: [
      { title: 'Year', dataIndex: 'year', key: 'year' },
      { title: 'Document Name', dataIndex: 'document_name', key: 'document_name' },
      { 
        title: 'Document', 
        dataIndex: 'document_link', 
        key: 'document_link',
        render: (text) => <Button href={text} target="_blank">View File</Button>
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record, 'ShareTransfer')} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, 'ShareTransfer')} />
            <Upload 
              beforeUpload={(file) => handleFileUpload(file, 'ShareTransfer', record.id)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </>
        ),
      },
    ],
    unclaimedDividend: [
      { title: 'Year', dataIndex: 'year', key: 'year' },
      { title: 'Report Title', dataIndex: 'report_title', key: 'report_title' },
      { 
        title: 'Report', 
        dataIndex: 'report_link', 
        key: 'report_link',
        render: (text) => <Button href={text} target="_blank">View File</Button>
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record, 'UnclaimedDividend')} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id, 'UnclaimedDividend')} />
            <Upload 
              beforeUpload={(file) => handleFileUpload(file, 'UnclaimedDividend', record.id)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </>
        ),
      },
    ],
  };

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">IEPF CMS</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <h2>Nodal Officer Details</h2>
          {nodalOfficerData && (
            <div>
              <p><strong>Name:</strong> {nodalOfficerData.name}</p>
              <p><strong>Email:</strong> {nodalOfficerData.email}</p>
              <Button onClick={() => handleEdit(nodalOfficerData, 'NodalOfficerDetails')}>
                Edit
              </Button>
            </div>
          )}

          <h2>Unclaimed Dividend Content</h2>
          <div>
            <p>{unclaimedDividendContent}</p>
            <Button onClick={() => handleEdit({ content: unclaimedDividendContent }, 'UnclaimedDividendContent')}>
              Edit
            </Button>
          </div>

          <h2>Share Transfer</h2>
          <Button onClick={() => handleEdit({}, 'ShareTransfer')} icon={<PlusOutlined />}>
            Add New
          </Button>
          <Table columns={columns.shareTransfer} dataSource={shareTransferData} />

          <h2>Unclaimed Dividend</h2>
          <Button onClick={() => handleEdit({}, 'UnclaimedDividend')} icon={<PlusOutlined />}>
            Add New
          </Button>
          <Table columns={columns.unclaimedDividend} dataSource={unclaimedDividendData} />
        </div>
      </Content>

      <Modal
        title={`Edit ${editingSection}`}
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingRecord}
          onFinish={handleSave}
        >
          {editingSection === 'NodalOfficerDetails' && (
            <>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
            </>
          )}
          {editingSection === 'UnclaimedDividendContent' && (
            <Form.Item name="content" label="Content" rules={[{ required: true }]}>
              <TextArea rows={9} />
            </Form.Item>
          )}
          {(editingSection === 'ShareTransfer' || editingSection === 'UnclaimedDividend') && (
            <>
              <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item 
                name={editingSection === 'ShareTransfer' ? 'document_name' : 'report_title'} 
                label={editingSection === 'ShareTransfer' ? 'Document Name' : 'Report Title'} 
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default IEPFCMS;