'use client';

import { Layout, Typography } from 'antd';
import BlogForm from './BlogForm.jsx';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { Title } = Typography;

export default function CreateBlogPage() {
    const router = useRouter();

    const handleCreateBlog = async (blogData) => {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'create_blog',
                ...blogData,
                published_at: new Date().toISOString(),
                status: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create blog');
        }

        router.push('/blogs');
    };

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Title level={2}>Create New Blog</Title>
                <BlogForm onSubmit={handleCreateBlog} />
            </Content>
        </Layout>
    );
}