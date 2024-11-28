'use client';
import { Layout, Typography, message } from 'antd';
import { useState } from 'react'; // Add this import
import BlogForm from './BlogForm.jsx';
import { useRouter } from 'next/navigation';
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Add state for loading

    const handleSubmit = async (values) => {
        setLoading(true);
       
        // Create FormData
        const formData = new FormData();
       
        // Append all form values
        Object.keys(values).forEach(key => {
            // Handle file upload separately
            if (key === 'featured_image') {
                if (values[key] && values[key].fileList && values[key].fileList.length > 0) {
                    formData.append(key, values[key].fileList[0].originFileObj);
                }
            } else {
                formData.append(key, values[key]);
            }
        });

        // Add additional metadata
        formData.append('action', 'create_blog');
        formData.append('published_at', new Date().toISOString());
        formData.append('status', 1);

        try {
            const response = await axios.put('/api/blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            message.success('Blog saved successfully');
            
            // Redirect to blog list or detail page after successful creation
            router.push('/admin/blogs/blogList'); // Adjust the route as needed
        } catch (error) {
            message.error('Failed to save blog');
            console.error('Blog creation error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Title level={2}>Create New Blog</Title>
                <BlogForm onSubmit={handleSubmit} />
            </Content>
        </Layout>
    );
}