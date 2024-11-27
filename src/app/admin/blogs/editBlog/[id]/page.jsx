'use client';

import { useState, useEffect } from 'react';
import { Layout, Typography, message } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import BlogForm from '@/app/admin/blogs/addBlog/BlogForm';
const { Content } = Layout;
const { Title } = Typography;

export default function EditBlogPage() {
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        async function fetchBlogDetails() {
            try {
                const response = await fetch('/api/blog', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'get_blog',
                        id: params.id
                    }),
                });

                const data = await response.json();

                if (data.status === 200 && data.blog.length > 0) {
                    // Ensure we're passing the first (and typically only) blog from the result
                    setInitialValues(data.blog[0]);
                    setLoading(false);
                } else {
                    message.error('Blog not found');
                    router.push('/blogs');
                }
            } catch (error) {
                message.error('Failed to fetch blog details');
                router.push('/blogs');
            }
        }

        if (params.id) {
            fetchBlogDetails();
        }
    }, [params.id, router]);

    const handleUpdateBlog = async (blogData) => {
        try {
            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update_blog',
                    id: params.id,
                    ...blogData
                }),
            });

            const result = await response.json();

            if (result.status === 200) {
                message.success('Blog updated successfully');
                router.push('/blogs');
            } else {
                message.error(result.message || 'Failed to update blog');
            }
        } catch (error) {
            message.error('An error occurred while updating the blog');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Title level={2}>Edit Blog</Title>
                <BlogForm
                    initialValues={initialValues}
                    onSubmit={handleUpdateBlog}
                />
            </Content>
        </Layout>
    );
}
