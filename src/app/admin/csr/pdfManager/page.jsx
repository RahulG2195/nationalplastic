"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Upload,
  message,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import CSRCommitteeManager from "./CSRCommitteeManage";

const CSRPDFManager = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("/api/admin/csr");
    setData(res.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingRecord(null);
    form.resetFields();
    setFileList([]);
    setModalVisible(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({ name: record.name });
    setFileList([]);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);

      if (fileList[0]) {
        formData.append("file_name", fileList[0].originFileObj);
      }

      if (editingRecord) {
        formData.append("id", editingRecord.id);
        await axios.put("/api/admin/csr", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("PDF updated successfully");
      } else {
        await axios.post("/api/admin/csr", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("PDF uploaded successfully");
      }

      setModalVisible(false);
      setFileList([]);
      form.resetFields();
      setEditingRecord(null);
      fetchData();
    } catch (error) {
      console.error(error);
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete("/api/admin/csr", {
      data: { id },
    });
    message.success("Deleted successfully");
    fetchData();
  };

  const columns = [
    {
      title: "Sr No",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "File",
      dataIndex: "file_name",
      render: (text) => (
        <a
          href={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${text}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View PDF
        </a>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={openAddModal}
        style={{ marginBottom: 16 }}
      >
        Add PDF
      </Button>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <CSRCommitteeManager />

      <Modal
        title={editingRecord ? "Edit CSR PDF" : "Add CSR PDF"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingRecord(null);
          setFileList([]);
          form.resetFields();
        }}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="PDF Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="PDF File"
            name="file_name"
            rules={
              editingRecord
                ? [] // optional in edit mode
                : [{ required: true, message: "Please select a PDF file" }]
            }
          >
            <Upload
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              fileList={fileList}
              accept=".pdf"
            >
              <Button icon={<UploadOutlined />}>Select PDF</Button>
            </Upload>
            {editingRecord && (
              <small style={{ color: "#888" }}>
                Leave blank to keep existing file.
              </small>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CSRPDFManager;
