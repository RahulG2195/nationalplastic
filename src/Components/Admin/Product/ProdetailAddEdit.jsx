import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';

const ProdetailAddEdit = ({ visible, onCancel, initialValues, pd_id }) => {
  const [form] = Form.useForm();
  const isEditMode = !!pd_id;
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (isEditMode && initialValues) {
        form.setFieldsValue(initialValues);
        setImageFile(initialValues.image);
      }
    }
  }, [visible, initialValues, isEditMode, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Append each key-value pair to the formData object
      if (imageFile) {
        formData.append("image", imageFile); // file itself
      }
      formData.append("features", values.features);
      formData.append("description", values.description);
      formData.append("careInstructions", values.careInstructions);
      formData.append("deliveryInstructions", values.deliveryInstructions);
      formData.append("manufacturing", values.manufacturing);
      formData.append("warranty", values.warranty);
      formData.append("pd_id", pd_id);

      // Make the POST request to the API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/bulkOrderEmail`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle the response as needed
      console.log("Response:", response.data);
      onCancel(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <Modal
      open={visible}
      title={isEditMode ? "Edit Product Detail" : "Add Product Detail"}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {isEditMode ? "Update" : "Add"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Image"
          name="image"
        >
          <input
            type="file"
            onChange={handleFileChange}
          />
          {imageFile && <p>Selected file: {imageFile.name}</p>}
        </Form.Item>

        <Form.Item name="features" label="Features">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="careInstructions" label="Care Instructions">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="deliveryInstructions" label="Delivery Instructions">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="manufacturing" label="Manufacturing">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="warranty" label="Warranty">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProdetailAddEdit;
