'use client';

import { useState, useEffect } from 'react';
import { Table, Layout, Typography, Button, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
const { Content } = Layout;
const { Title } = Typography;

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            const response = await axios.post('/api/blog', {
                action: 'get_blogs',
            });

            setBlogs(response.data.blogs);
            setLoading(false);
        }
        fetchBlogs();
    }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => (
                <Tag color="blue">{category}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 1 ? 'green' : 'red'}>
                    {status === 1 ? 'Published' : 'Draft'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Link href={`/admin/blogs/editBlog/${record.id}`}>
                        <Button icon={<EditOutlined />} type="primary" ghost>
                            Edit
                        </Button>
                    </Link>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDelete = async (id) => {
        const response = await fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete_blog',
                id
            }),
        });

        if (response.ok) {
            setBlogs(blogs.filter(blog => blog.id !== id));
        }
    };

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Title level={2}>Blog Management</Title>
                <Link href="/admin/blogs/addBlog">
                    <Button type="primary" style={{ marginBottom: 16 }}>
                        Create New Blog
                    </Button>
                </Link>
                <Table
                    columns={columns}
                    dataSource={blogs}
                    loading={loading}
                    rowKey="id"
                />
            </Content>
        </Layout>
    );
}