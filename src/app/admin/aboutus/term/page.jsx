"use client";
import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function CMS() {
  const [form] = Form.useForm();
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const response = await fetch('/api/content?page=company');
    const data = await response.json();
    setContent(data);
  }

  async function onFinish(values) {
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      message.success('Content saved successfully');
      form.resetFields();
      fetchContent();
    } else {
      message.error('Failed to save content');
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Content Management System</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="page_name" label="Page Name" rules={[{ required: true }]}>
          <Select>
            <Option value="company">Company</Option>
            <Option value="terms">Terms and Conditions</Option>
          </Select>
        </Form.Item>
        <Form.Item name="section_name" label="Section Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Save Content</Button>
        </Form.Item>
      </Form>

      <h2>Existing Content</h2>
      {content.map(item => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <h3>{item.section_name}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}