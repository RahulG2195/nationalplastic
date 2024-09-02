import React from 'react';
import { Modal, Form, Input, Button, Typography, Space, Divider, Image } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductDetailModal = ({ visible, onCancel, onSubmit, initialValues, mode = 'view' }) => {
  const [form] = Form.useForm();
  const data = initialValues && initialValues[0] ? initialValues[0] : {};
  
  const handleSubmit = () => {
    form.validateFields().then(onSubmit);
  };

  const isViewMode = mode === 'view';
  const title = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Product`;

  const fieldMappings = {
    features: 'features',
    descp: 'description',
    careAndInstruct: 'careInstructions',
    deliveryInsct: 'deliveryInstructions',
    manufacturing: 'manufacturing',
    warranty: 'warranty',
  };

  return (
    <Modal
      open={visible}
      title={<Title level={3}>{title}</Title>}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        !isViewMode && (
          <Button key="submit" type="primary" onClick={handleSubmit} icon={<EditOutlined />}>
            Submit
          </Button>
        ),
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Image field */}
          <Form.Item
            name="dimension_img"
            label={<Text strong>Dimension Image</Text>}
            initialValue={data.dimension_img}
          >
            {isViewMode ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}${data.dimension_img}`}
                alt="Dimension Image"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <Input 
                readOnly={isViewMode}
                style={{ 
                  backgroundColor: isViewMode ? '#f5f5f5' : 'white',
                  border: isViewMode ? 'none' : '1px solid #d9d9d9'
                }}
              />
            )}
          </Form.Item>
          <Divider style={{ margin: '12px 0' }} />

          {/* Other fields */}
          {Object.entries(fieldMappings).map(([dataKey, formKey]) => (
            <React.Fragment key={formKey}>
              <Form.Item
                name={formKey}
                label={<Text strong>{capitalizeLabel(formKey)}</Text>}
                initialValue={data[dataKey]}
              >
                <Input.TextArea
                  rows={4}
                  readOnly={isViewMode}
                  style={{ 
                    backgroundColor: isViewMode ? '#f5f5f5' : 'white',
                    border: isViewMode ? 'none' : '1px solid #d9d9d9'
                  }}
                />
              </Form.Item>
              <Divider style={{ margin: '12px 0' }} />
            </React.Fragment>
          ))}
        </Space>
      </Form>
    </Modal>
  );
};

const capitalizeLabel = (string) => {
  return string.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

export default ProductDetailModal;