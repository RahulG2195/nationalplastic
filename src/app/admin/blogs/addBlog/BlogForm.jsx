'use client';

import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Upload,
    message,
    Switch,
    InputNumber
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const BlogForm = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await onSubmit(values);
            message.success('Blog saved successfully');
        } catch (error) {
            message.error('Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues || {
                status: 1,
                is_popular: 0,
                is_featured: 0,
                reading_time: 5
            }}
            onFinish={handleSubmit}
        >
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input blog title' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="short_description"
                label="Short Description"
            >
                <TextArea rows={3} />
            </Form.Item>

            <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: 'Please input blog content' }]}
            >
                <TextArea rows={6} />
            </Form.Item>

            <Form.Item name="featured_image" label="Featured Image">
                <Upload
                    name="featured_image"
                    listType="picture"
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="author"
                label="Author"
                rules={[{ required: true, message: 'Please input author name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select>
                    <Option value="Technology">Technology</Option>
                    <Option value="Business">Business</Option>
                    <Option value="Lifestyle">Lifestyle</Option>
                </Select>
            </Form.Item>

            <Form.Item name="is_popular" label="Popular Blog" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="is_featured" label="Featured Blog" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="reading_time" label="Reading Time (minutes)">
                <InputNumber min={1} max={30} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Save Blog
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BlogForm;