"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Image from "next/image";

const HiringProcessManagement = () => {
  const [processSteps, setProcessSteps] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProcessStep, setEditingProcessStep] = useState(null);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProcessSteps();
  }, []);

  // Fetch the existing process steps
  const fetchProcessSteps = async () => {
    try {
      const response = await axios.get("/api/admin/hiring-process");
      setProcessSteps(response.data.processSteps);
    } catch (error) {
      message.error("Failed to fetch process steps");
    }
  };

  // Open modal for editing an existing process step
  const handleEdit = (step) => {
    setEditingProcessStep(step);
    form.setFieldsValue({
      title: step.title,
      description: step.description,
    });
    setImageFile(null); // Clear the image file if editing
    setIsModalVisible(true);
  };

  // Handle form submission (edit process step)
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("id", editingProcessStep.id);
    formData.append("title", values.title);
    formData.append("description", values.description);

    // If a new image is selected, append it
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post("/api/admin/hiring-process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        message.success("Process step updated successfully");
        fetchProcessSteps(); // Refresh the list
        setIsModalVisible(false); // Close the modal
      } else {
        message.error("Failed to update process step");
      }
    } catch (error) {
      message.error("Error during the update");
    }
  };

  // Handle image upload change
  const handleImageChange = (info) => {
    setImageFile(info.file);
  };

  // Table columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${image}`}
            alt={image}
            width={100}
            height={100}
            style={{ objectFit: "contain" }} // Optional: Maintain aspect ratio
          />
        ) : null,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Hiring Process Management</h1>
      </div>

      <Table
        columns={columns}
        dataSource={processSteps}
        rowKey="id"
      />

      {/* Modal for editing the process step */}
      <Modal
        title="Edit Process Step"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: editingProcessStep?.title,
            description: editingProcessStep?.description,
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          {/* Image Upload */}
          <Form.Item
            name="image"
            label="Upload Image (JPEG, PNG)"
          >
            {editingProcessStep?.image && (
              <div>
                <Image
                
                  src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}${editingProcessStep.image}`} // Path to the image
                  alt="current-image"
                  width={100} // Specify the width
                  height={100} // Specify the height
                  style={{ objectFit: "contain" }} // Optional: Ensure the image maintains aspect ratio
                />
                <p>Current Image</p>
              </div>
            )}
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false} // Prevent default upload behavior
              onChange={handleImageChange}
              showUploadList={{ showRemoveIcon: true }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HiringProcessManagement;
