// components/EditContentModal.js
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

const EditContentModal = ({ visible, onCancel, onUpdate, initialValues }) => {
  const [form] = Form.useForm();

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  return (
    <Modal
      visible={visible}
      title="Edit Content"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="section_name"
          label="Section Name"
          rules={[{ required: true, message: 'Please input the section name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <TextArea rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditContentModal;