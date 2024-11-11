"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Card, Row, Col, Typography, Spin, message } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const { Meta } = Card;

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Category`
        );
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        message.error("Error fetching categories");
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 py-md-5">
      <div className="text-center">
        <Title level={1} style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
            <div className="fs-1 lh-small fw-bolder manuf_head">
            Categories For You
            </div>
        </Title>
      </div>

      <Row gutter={[16, 16]} justify="center">
        {categories.map((category) => (
          <Col
            key={category.category_id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="flex justify-center"
          >
            <Link href={`/product-catalogue/${category.seo_url}`}>
              <Card
                hoverable
                className="w-full max-w-xs"
                cover={
                  <img
                    alt={category.category_name}
                    src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${category.image_name}`}
                    className="object-cover h-48"
                  />
                }
                actions={[
                  <div key="view" className="flex items-center justify-center gap-2">
                    <ShoppingOutlined /> View Products
                  </div>
                ]}
              >
                <Meta
                  title={
                    <Text strong className="text-lg">
                      {category.category_name}
                    </Text>
                  }
                  className="text-center"
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllCategory;