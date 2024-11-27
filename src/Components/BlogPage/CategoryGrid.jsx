"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Tag, Spin, Empty } from 'antd';
import DiningTableCard from '../DiningTableCard/DiningTableCard';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const CategoryGrid = () => {
    // State management
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch blogs on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/blog');
                setBlogs(data.blogs);
                setCategories(data.categories)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs based on selected category
    const filteredBlogs = selectedCategory
        ? blogs.filter(blog => blog.category === selectedCategory)
        : blogs;

    return (
        <div className="container-fluid px-md-5 py-4">
            {/* Page Header */}
            <Title
                level={1}
                className="text-center mb-4"
                style={{ color: '#ff4d4f' }}
            >
                Blog Categories
            </Title>

            {/* Category Filter Tags */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                {/* All Categories Tag */}
                <Tag.CheckableTag
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                    style={{
                        fontSize: '16px',
                        padding: '5px 15px',
                        backgroundColor: selectedCategory === null ? '#1890ff' : 'transparent',
                        color: selectedCategory === null ? 'white' : 'black'
                    }}
                >
                    All Categories
                </Tag.CheckableTag>

                {/* Dynamic Category Tags */}
                {categories.map(cat => (
                    <Tag.CheckableTag
                        key={cat}
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        style={{
                            fontSize: '16px',
                            padding: '5px 15px',
                            backgroundColor: selectedCategory === cat ? '#1890ff' : 'transparent',
                            color: selectedCategory === cat ? 'white' : 'black'
                        }}
                    >
                        {cat}
                    </Tag.CheckableTag>
                ))}
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-5">
                    <Spin size="large" tip="Loading blogs..." />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {/* Blog Posts Column */}
                    <Col xs={24} md={16}>
                        <Row gutter={[16, 16]}>
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map(blog => (
                                    <Col key={blog.id} xs={24} sm={12} md={12} lg={8}>
                                        <Card
                                            hoverable
                                            cover={
                                                <DiningTableCard
                                                    content={blog.content}
                                                    imageUrl={blog.featured_image}
                                                />
                                            }
                                            onClick={() => router.push(`/BlogDetails/${blog.id}`)}
                                        >
                                            <Card.Meta
                                                title={
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>{blog.title}</span>
                                                        <Tag color="processing">{blog.category}</Tag>
                                                    </div>
                                                }
                                                description={
                                                    <div>
                                                        <Paragraph ellipsis={{ rows: 2 }}>
                                                            {blog.short_description}
                                                        </Paragraph>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="text-muted">
                                                                {new Date(blog.published_at).toLocaleDateString()}
                                                            </small>
                                                            <small className="text-muted">
                                                                {blog.reading_time} min read
                                                            </small>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col span={24}>
                                    <Empty
                                        description="No blogs found in this category"
                                        className="py-5"
                                    />
                                </Col>
                            )}
                        </Row>
                    </Col>

                    {/* Sidebar Column */}
                    <Col xs={24} md={8}>
                        <Card
                            title="Recent Posts"
                            extra={<a href="#" className="text-primary">View All</a>}
                            bodyStyle={{ padding: 0 }}
                        >
                            {blogs.slice(0, 5).map(blog => (
                                <Card.Grid
                                    key={blog.id}
                                    hoverable
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '12px'
                                    }}
                                >
                                    {/* Small Thumbnail Image */}
                                    <div style={{
                                        width: 80,
                                        height: 80,
                                        marginRight: 12,
                                        flexShrink: 0
                                    }}>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_ABOUT_PATH_DIR}${blog.featured_image}` || "/path/to/default/image.jpg"}
                                            alt={blog.title}
                                            width={80}
                                            height={80}
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: 8
                                            }}
                                        />
                                    </div>

                                    {/* Post Details */}
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <Typography.Text strong>
                                            <Link href="/BlogDetails">
                                                {blog.title}
                                            </Link>
                                        </Typography.Text>
                                        <Typography.Paragraph
                                            ellipsis={{ rows: 1 }}
                                            type="secondary"
                                            style={{ marginBottom: 0 }}
                                        >
                                            {blog.short_description}
                                        </Typography.Paragraph>
                                        <small className="text-muted">
                                            {new Date(blog.published_at).toLocaleDateString()}
                                        </small>
                                    </div>
                                </Card.Grid>
                            ))}
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default CategoryGrid;




