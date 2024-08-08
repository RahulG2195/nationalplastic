import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

const AddContentModal = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onAdd(values);
      form.resetFields();
    }).catch((info) => {
      notifyError(info);
    });
  };

  return (
    <Modal
      open={open}
      title="Add New Content"
      onCancel={onCancel}
      width={600}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add Content
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="add_content_form"
      >
        <Form.Item
          name="section_name"
          label="Section Name"
          rules={[{ required: true, message: 'Please input the section name!' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <TextArea rows={8} size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddContentModal;