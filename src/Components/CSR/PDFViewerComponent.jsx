"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { FilePdfOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PDFViewerComponent = () => {
  const [pdfData, setPdfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchpdf = async () => {
      try {
        const response = await fetch("/api/csr-committee");
        const result = await response.json();
        if (result.success) {
          setPdfData(result.pdfs);
        } else {
          setError(result.message || "Unknown error");
        }
      } catch (err) {
        setError("Failed to fetch committee data");
      } finally {
        setLoading(false);
      }
    };

    fetchpdf();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-4">
      <Title level={2} className="text-center mb-4">
        <FilePdfOutlined className="me-2" />
        Corporate Reports & Disclosures
      </Title>

      <Row gutter={[24, 24]} justify="center">
        {pdfData.map((pdf) => (
          <Col key={pdf.id} xs={24} sm={24} md={12} lg={8} xl={6}>
            <Card
              hoverable
              className="text-center"
              bodyStyle={{ padding: '24px' }}
            >
              <FilePdfOutlined style={{ fontSize: '48px' }} className="text-danger mb-2" />
              <Text strong className="d-block mb-3 text-truncate">{pdf.name}</Text>
              <Button 
                type="primary" 
                icon={<EyeOutlined />} 
                onClick={() => window.open(`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}${pdf.file_name}`, '_blank')}
              >
                View PDF
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PDFViewerComponent;
