import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button, message } from 'antd';

const { TextArea } = Input;

const ReturnProductModal = ({ productId, customerId, orderId, visible, onClose }) => {
  const [form] = Form.useForm();
  const [productImage, setProductImage] = useState(null);
  const [damageImage, setDamageImage] = useState(null);

  const handleSubmit = async (values) => {
    if (!productImage || !damageImage) {
      message.error('Please upload both product and damage images');
      return;
    }

    const formData = new FormData();
    formData.append('reason', values.reason);
    formData.append('productImage', productImage);
    formData.append('damageImage', damageImage);
    formData.append('productId', productId);
    formData.append('customerId', customerId);
    formData.append('orderId', orderId);

    try {
      console.log("resendFile before calling the api ");
      const response = await axios.post('/api/resendFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        message.success('Return request submitted successfully');
        onClose();
        form.resetFields();
        setProductImage(null);
        setDamageImage(null);
      } else {
        message.error('Failed to submit return request');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while submitting the return request');
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'product') {
      setProductImage(file);
    } else {
      setDamageImage(file);
    }
  };

  return (
    <Modal
      title="Return Product Request"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="reason"
          label="Reason for Return"
          rules={[{ required: true, message: 'Please enter the reason for return' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="productImage"
          label="Image of the Product"
          rules={[{ required: true, message: 'Please upload an image of the product' }]}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'product')}
          />
        </Form.Item>

        <Form.Item
          name="damageImage"
          label="Image of the Damaged Part"
          rules={[{ required: true, message: 'Please upload an image of the damaged part' }]}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'damage')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Return Request
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReturnProductModal;