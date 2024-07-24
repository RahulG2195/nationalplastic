"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, Upload, message, Spin, Popconfirm } from 'antd';
import { UploadOutlined, LoadingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function AGMCompliances() {
  const [complianceData, setComplianceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [selectedPage, setSelectedPage] = useState("OutcomeAGM");

  useEffect(() => {
    fetchComplianceData(selectedPage);
  }, [selectedPage]);

  const fetchComplianceData = async (page) => {
    setLoading(true);
    try {
      // In a real scenario, you would make an API call here
      // For this example, we'll simulate an API response
      const response = await new Promise(resolve => setTimeout(() => resolve({ data: sampleData }), 1000));
      const formattedData = Object.entries(response.data).flatMap(([year, items]) =>
        items.map(item => ({ ...item, year, fileName: item.file_path.split('/').pop() }))
      );
      setComplianceData(formattedData);
    } catch (error) {
      console.error("Error fetching compliance data:", error);
      message.error("Failed to fetch compliance data");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (value) => {
    setSelectedPage(value);
  };

  const showModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Implementation for saving/updating record
      message.success(editingRecord ? "Record updated successfully" : "Record added successfully");
      setModalVisible(false);
      fetchComplianceData(selectedPage);
    } catch (error) {
      console.error("Error saving record:", error);
      message.error("Failed to save record");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDelete = (record) => {
    // In a real scenario, you would make an API call to delete the record
    const updatedData = complianceData.filter(item => item !== record);
    setComplianceData(updatedData);
    message.success("Record deleted successfully");
  };

  const columns = [
    {
      title: 'Index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Title', dataIndex: 'notice_title', key: 'notice_title' },
    { title: 'File Name', dataIndex: 'fileName', key: 'fileName' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            onClick={() => showModal(record)}
            type="link"
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  }

  return (
    <div className="container">
      <h1>AGM Compliances</h1>

      <div style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 200, marginRight: 16 }}
          value={selectedPage}
          onChange={handlePageChange}
        >
          <Option value="OutcomeAGM">Outcome of AGM</Option>
          <Option value="Notice">Notice</Option>
        </Select>
        <Button onClick={() => showModal()} type="primary">Add New Record</Button>
      </div>

      <Table
        dataSource={complianceData}
        columns={columns}
        rowKey={(record) => `${record.year}-${record.notice_title}`}
      />

      <Modal
        title={editingRecord ? "Edit Record" : "Add New Record"}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="notice_title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: 'Please input the year!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="file"
            label="File"
            rules={[{ required: true, message: 'Please upload a file!' }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

// Sample data structure based on the provided JSON
const sampleData = {
  "2022-2023": [
    {
      "notice_title": "Outcome of AGM 21.08.2023.pdf",
      "file_path": "/Assets/pdf/AGM%20proceeding_signed.pdf"
    },
    // ... other items
  ],
  "2021-2022": [
    {
      "notice_title": "Outcome of AGM 26.08.2022.pdf",
      "file_path": "/Assets/pdf/Outcome%20of%20AGM%2026.08.2022.pdf"
    },
    // ... other items
  ],
  // ... other years
};