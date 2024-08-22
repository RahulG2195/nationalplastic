"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Spin,
} from "antd";
import { UploadOutlined, LoadingOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function MyComponent() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [yearData, setYearData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [newYearModalVisible, setNewYearModalVisible] = useState(false);
  const [newYearForm] = Form.useForm();

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Investor/disclosure`
      );
      const data = response.data.yearsList;
      const yearLabels = data.map((item) => item.label);
      setYears(yearLabels);
      if (yearLabels.length > 0) {
        setSelectedYear(yearLabels[0]);
        fetchYearData(yearLabels[0]);
      }
    } catch (error) {
      console.error("Error fetching years:", error);
      message.error("Failed to fetch years");
    } finally {
      setLoading(false);
    }
  };

  const fetchYearData = async (year) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Investor/disclosure?year=${year}`
      );
      setYearData(response.data.results);
    } catch (error) {
      console.error("Error fetching year data:", error);
      message.error("Failed to fetch year data");
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    fetchYearData(value);
  };

  const handleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Investor/disclosure`,
        {
          action: "updateStatus",
          Id: id,
          status: newStatus,
        }
      );
      fetchYearData(selectedYear);
      message.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
    }
  };

  const showModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        file: record.file_path ? [
          {
            uid: '-1',
            name: record.file_path.split('/').pop(),
            status: 'done',
            url: `${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${record.file_path}`
          }
        ] : []
      });
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Append all form values to formData
      Object.keys(values).forEach((key) => {
        if (key !== "file") {
          formData.append(key, values[key]);
        }
      });

      if (values.file && values.file.length > 0) {
        if (values.file[0].originFileObj) {
          // New file uploaded
          formData.append("file", values.file[0].originFileObj);
        } else if (editingRecord && values.file[0].url) {
          // Existing file, no change
          formData.append("file_path", editingRecord.file_path);
        }
      }

      formData.append("action", editingRecord ? "editRecord" : "addRecord");
      formData.append("year", selectedYear);

      if (editingRecord) {
        formData.append("id", editingRecord.id);
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Investor/disclosure`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success(
        editingRecord
          ? "Record updated successfully"
          : "Record added successfully"
      );
      setModalVisible(false);
      fetchYearData(selectedYear);
    } catch (error) {
      console.error("Error saving record:", error);
      message.error("Failed to save record");
    }
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: 'file_name',
      dataIndex: 'file_path',
      key: 'file_path',
      render: (text) => <a href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${text}`} target="_blank" rel="noopener noreferrer">View File</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Button
          onClick={() => handleStatus(record.id, status)}
          type={status ? "primary" : "default"}
        >
          {status ? "Active" : "Inactive"}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} type="link">
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} danger />
        </>

      ),
    },
  ];


  // New functions
  const showNewYearModal = () => {
    newYearForm.resetFields();
    setNewYearModalVisible(true);
  };
  const handleDelete = async (record) => {
    try {
      ("record" + JSON.stringify(record));
      const id = record.id;

      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/disclosure`, {
        data: { id: id }
      });
      message.success('CorpReport deleted successfully');
      fetchYearData(selectedYear);
    } catch (error) {
      message.error('Failed to delete CorpReport');
    }
  };

  const handleNewYearOk = async () => {
    try {
      const values = await newYearForm.validateFields();
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/Investor/disclosure`, {
        action: "insertDisclosure",
        label: values.year,
      });
      message.success("New financial year added successfully");
      setNewYearModalVisible(false);
      fetchYears(); // Refresh the years list
    } catch (error) {
      console.error("Error adding new year:", error);
      message.error("Failed to add new financial year");
    }
  };

  const handleNewYearCancel = () => {
    setNewYearModalVisible(false);
  };

  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }

  return (
    <div className="container">
      <h1>General Disclosure Data</h1>

      <div style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 200, marginRight: 16 }}
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
        <Button onClick={() => showModal()} type="primary" style={{ marginRight: 16 }}>
          Add New Record
        </Button>
        <Button onClick={showNewYearModal} type="primary">
          Add New Financial Year
        </Button>
      </div>


      <Table dataSource={yearData} columns={columns} rowKey="id" />

      <Modal
        title={editingRecord ? "Edit Record" : "Add New Record"}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="file"
            label="File"
            rules={[{ required: !editingRecord, message: "Please upload a file!" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            >
              <Button icon={<UploadOutlined />}>
                {editingRecord ? 'Change File' : 'Click to Upload'}
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue={1}>
            <Select>
              <Option value={1}>Active</Option>
              <Option value={0}>Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add New Financial Year"
        visible={newYearModalVisible}
        onOk={handleNewYearOk}
        onCancel={handleNewYearCancel}
      >
        <Form form={newYearForm} layout="vertical">
          <Form.Item
            name="year"
            label="Financial Year"
            rules={[{ required: true, message: "Please input the financial year!" }]}
          >
            <Input placeholder="e.g., 2024-2025" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
