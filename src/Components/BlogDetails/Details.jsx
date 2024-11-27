"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin, Alert, Space, Tag } from 'antd';
import Image from 'next/image';
import axios from 'axios';
import { ClockCircleOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text } = Typography;

const BlogDetails = ({ blogId }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/blog', {
          action: 'get_blog',
          id: blogId,
        });
        console.log("Blog Data (response):", response.data.blog);
        setBlog(response.data.blog[0]);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog details');
        setLoading(false);
        console.error('Blog fetch error:', err);
      }
    };

    if (blogId) {
      fetchBlogDetails();
    }
  }, [blogId]);

  // Log when `blog` is updated
  useEffect(() => {
    if (blog) {
      console.log("Blog Data (state):", blog);
      console.log("Blog Short Description:", blog.short_description);
    }
  }, [blog]);


  // Render loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spin size="large" tip="Loading blog details..." />
      </div>
    );
  }

  // Render error state
  if (error || !blog) {
    return (
      <div className="container py-5">
        <Alert
          message="Blog Not Found"
          description={error || "The requested blog could not be found."}
          type="error"
        />
      </div>
    );
  }

  // Sanitize and parse HTML content
  const sanitizedContent = blog.content;

  return (
    <div className="container-fluid py-5 px-md-5">
      <Row gutter={[24, 24]}>
        {/* Main Blog Content */}
        <Col xs={24} md={16}>
          {/* Category and Title Section */}
          <div className="mb-4">
            <Tag color="processing" className="mb-2">
              {blog.category}
            </Tag>
            <Title level={1} className="mb-3">
              {blog.title}
            </Title>

            {/* Short Description */}
            <Paragraph
              type="secondary"
              className="lead mb-4"
            >
              {blog.short_description}
            </Paragraph>
          </div>

          {/* Featured Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            marginBottom: '24px'
          }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${blog.featured_image}` || "/path/to/default/image.jpg"}
              alt={blog.title}
              fill
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Blog Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Metadata */}
          <div className="mt-5 pt-3 border-top">
            <Row gutter={[16, 16]} align="middle">
              <Col>
                <Space>
                  <UserOutlined />
                  <Text strong>Author:</Text>
                  <Text>{blog.author}</Text>
                </Space>
              </Col>
              <Col>
                <Space>
                  <ClockCircleOutlined />
                  <Text strong>Reading Time:</Text>
                  <Text>{blog.reading_time} min read</Text>
                </Space>
              </Col>
              <Col>
                <Space>
                  <EyeOutlined />
                  <Text strong>Views:</Text>
                  <Text>{blog.view_count}</Text>
                </Space>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Sidebar */}
        <Col xs={24} md={8}>
          <div className="sticky-top" style={{ top: '20px' }}>
            {/* Author Card */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body text-center">
                <Image
                  src="/default-avatar.jpg"
                  alt={blog.author}
                  width={120}
                  height={120}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '15px'
                  }}
                />
                <Title level={4} className="mb-2">
                  {blog.author}
                </Title>
                <Text type="secondary">
                  Technology Writer
                </Text>
              </div>
            </div>

            {/* Related Content */}
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                Related Topics
              </div>
              <ul className="list-group list-group-flush">
                {[
                  'Artificial Intelligence',
                  'Machine Learning',
                  'Future Tech Trends',
                  'Innovation'
                ].map((topic, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {topic}
                    <span className="badge bg-primary rounded-pill">→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BlogDetails;