"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Upload, message, Spin, Popconfirm } from 'antd';
import { UploadOutlined, LoadingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";

const { Option } = Select;

// Dummy data
const dummyData = [
  {
    id: 1,
    year: '2023',
    quarter: 'Q1',
    reportType: 'unaudited',
    title: 'Q1 Financial Report',
    fileName: 'q1_report.pdf',
  },
  {
    id: 2,
    year: '2023',
    quarter: 'Q2',
    reportType: 'unaudited',
    title: 'Q2 Financial Report',
    fileName: 'q2_report.pdf',
  },
  {
    id: 3,
    year: '2023',
    quarter: 'Q3',
    reportType: 'unaudited',
    title: 'Q3 Financial Report',
    fileName: 'q3_report.pdf',
  },
  {
    id: 4,
    year: '2023',
    quarter: 'Q4',
    reportType: 'audited',
    title: 'Annual Audited Report',
    fileName: 'annual_report.pdf',
  },
];

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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/disclosure?year=${year}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/Financial?report=${reportType}`)
      .then((response) =>{console.log("its response from axios" + response);
         console.log("how to tadd mutiple lines")
         console.log("how to tadd mutiple lines")
         console.log("how to tadd mutiple lines")
        
        })
      .catch((error) => console.log("Its Error: " + error))
    //   const filteredData = dummyData.filter(item => item.reportType === reportType);
      setFinancialData(filteredData);
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
        // Update existing record
        const updatedData = financialData.map(item => 
          item.id === editingRecord.id ? { ...item, ...values } : item
        );
        setFinancialData(updatedData);
      } else {
        // Add new record
        const newRecord = {
          id: Math.max(...financialData.map(item => item.id)) + 1,
          ...values,
          reportType: selectedReportType,
          fileName: values.file ? values.file[0].name : ''
        };
        setFinancialData([...financialData, newRecord]);
      }
      message.success(editingRecord ? "Record updated successfully" : "Record added successfully");
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
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Quarter', dataIndex: 'quarter', key: 'quarter' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
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
        <Select
          style={{ width: 200, marginRight: 16 }}
          value={selectedReportType}
          onChange={handleReportTypeChange}
        >
          <Option value="unaudited">Unaudited</Option>
          <Option value="Annual Report">Annual</Option>
          <Option value="Audited">Audited</Option>
          <Option value="Annual Returns">Annual Return</Option>
        </Select>
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
            name="year"
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
            <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx,.xls,.xlsx">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}