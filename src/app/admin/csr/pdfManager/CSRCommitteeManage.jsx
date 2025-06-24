import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Button, message, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const CSRCommitteeManager = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("/api/admin/csr-committee");
    setData(res.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (record = null) => {
    setEditingRecord(record);
    form.setFieldsValue(record || {});
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        await axios.put("/api/admin/csr-committee", { ...values, id: editingRecord.id });
        message.success("Updated successfully");
      } else {
        await axios.post("/api/admin/csr-committee", values);
        message.success("Added successfully");
      }
      setModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
      fetchData();
    } catch (err) {
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete("/api/admin/csr-committee", { data: { id } });
    message.success("Deleted successfully");
    fetchData();
  };

  const columns = [
    {
      title: "Sr No",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Member Type",
      dataIndex: "member_type",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 8 }}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 40 }}>
      <h2>CSR Committee</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        Add Committee Member
      </Button>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingRecord ? "Edit Member" : "Add Member"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Full Name" name="full_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Position" name="position" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Member Type" name="member_type" rules={[{ required: true }]}>
            <Select options={[{ value: "Executive" }, { value: "Independent" }]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CSRCommitteeManager;
