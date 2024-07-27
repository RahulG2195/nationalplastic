"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Upload, message, Spin, Popconfirm } from 'antd';
import { UploadOutlined, LoadingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";

const { Option } = Select;

export default function FinancialResults() {
  const [selectedReportType, setSelectedReportType] = useState("unaudited");
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchFinancialData(selectedReportType);
  }, [selectedReportType]);

  const fetchFinancialData = async (reportType) => {
    setLoading(true);
    try {
      // Simulating API call with dummy data
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Finance/Unaudited`);
    //   const filteredData = dummyData.filter(item => item.reportType === reportType);
    const OrderCount = response.data.UnauditedData;
      setFinancialData(OrderCount);
    } catch (error) {
      console.error("Error fetching financial data:", error);
      message.error("Failed to fetch financial data");
    } finally {
      setLoading(false);
    }
  };

  const handleReportTypeChange = (value) => {
    setSelectedReportType(value);
  };

  const handleDelete = (id) => {
    const updatedData = financialData.filter(item => item.id !== id);
    setFinancialData(updatedData);
    message.success("Record deleted successfully");
  };

  const showModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
        console.log('record', record);

      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {

        console.log('editingRecord', editingRecord);
        const updatedData = financialData.map(item => 
            item.id === editingRecord.id ? { ...item, ...values } : item
          );
          setFinancialData(updatedData);
        message.success("Record updated successfully");
      } else {
        // Add new record
        const newRecord = {
          ...values,
          reportType: selectedReportType,
          fileName: values.file_name ? values.file_name[0].name : ''
        };
        
        const response = await fetch('/api/Finance/Unaudited', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRecord),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save record');
        }
  
        // const result = await response.json();
        // newRecord.id = result.id;
        // setFinancialData([...financialData, newRecord]);
        message.success("Record added successfully");
      }
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving record:", error);
      message.error("Failed to save record");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'Index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    { title: 'Year', dataIndex: 'years', key: 'years' },
    { title: 'Quarter', dataIndex: 'quarter', key: 'quarter' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'File Name', dataIndex: 'file_name', key: 'file_name' },
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
            onConfirm={() => handleDelete(record.id)}
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
      <h1>Financial Results</h1>

      <div style={{ marginBottom: 16 }}>
        {/* <Select
          style={{ width: 200, marginRight: 16 }}
          value={selectedReportType}
          onChange={handleReportTypeChange}
        >
          <Option value="unaudited">Unaudited</Option>
          <Option value="Annual Report">Annual</Option>
          <Option value="Audited">Audited</Option>
          <Option value="Annual Returns">Annual Return</Option>
        </Select> */}
        <Button onClick={() => showModal()} type="primary">Add New Record</Button>
      </div>

      <Table
        dataSource={financialData}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title={editingRecord ? "Edit Record" : "Add New Record"}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="years"
            label="Year"
            rules={[{ required: true, message: 'Please input the year!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quarter"
            label="Quarter"
            rules={[{ required: true, message: 'Please select the quarter!' }]}
          >
            <Select>
              <Option value="Q1">Q1</Option>
              <Option value="Q2">Q2</Option>
              <Option value="Q3">Q3</Option>
              <Option value="Q4">Q4</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="file_name"
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
            <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx,.xls,.xlsx">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}