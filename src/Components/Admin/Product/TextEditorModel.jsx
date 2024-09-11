"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { Modal, Form } from 'antd';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function ModalEditor({ isOpen, onClose, onSave, initialValue }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave(values.content);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Add Description"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      width={800}
    >
      <Form form={form} initialValues={{ content: initialValue }}>
        <Form.Item 
          name="content" 
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalEditor;