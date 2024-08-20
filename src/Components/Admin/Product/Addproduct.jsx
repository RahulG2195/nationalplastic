"use client"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber, Select, message, Space } from 'antd';
import "./EditProduct.css";
import axios from 'axios';
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const { Option } = Select;
export default function App() {
  const router = useRouter();

  const { control, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [calculatedDiscountPrice, setCalculatedDiscountPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, name: '' });

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/admin/product', { replace: true });
    window.location.reload();
  };
  const handleCancel = () => {
    router.push("/admin/product");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adminValidationP`);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);
  const calculateDiscountPrice = (price, discountPercentage) => {
    const discountAmount = price * (discountPercentage / 100);
    return price - discountAmount;
  };

  const onSubmit = async (data) => {
    const submitLoader = async () => {
      try {
        // Validate category name and get category_id


        // Prepare the form data
        const formData = new FormData();
        Object.keys(data).forEach(key => {
          if (key === 'images') {
            data[key].forEach((file, index) => {
              formData.append(`image${index}`, file);
            });
          } else {
            formData.append(key, data[key]);
          }
        });
        formData.append('discount_price', calculatedDiscountPrice);
        formData.append('category_id', selectedCategory.id);
        let formDataString = '';
        formData.forEach((value, key) => {
          formDataString += `${key}: ${value}\n`;
        });

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProducts`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        reset();
        handleNavigation();
        return 'Product created successfully';

      } catch (error) {

        throw new Error(error.response ? error.response.data.error : 'Failed to create product');

      }
    };

    toast.promise(
      submitLoader(),
      {
        pending: "Creating product...",
        success: "Product created successfully!",
        error: {
          render({ data }) {
            return data.message || "Failed to create product";
          },
        },
      },
      {
        position: "top-center",
        transition: Bounce,
      }
    );
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setValue('images', files);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className='Form'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Product Name"
        validateStatus={errors.product_name ? 'error' : ''}
        help={errors.product_name ? 'Please input the product name!' : ''}
      >
        <Controller
          name="product_name"
          control={control}
          rules={{ required: true, minLength: 1, maxLength: 65 }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Meta Title">
        <Controller
          name="meta_title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Meta Description">
        <Controller
          name="meta_description"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Short Description">
        <Controller
          name="short_description"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Long Description">
        <Controller
          name="long_description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Form.Item label="SEO Title">
        <Controller
          name="seo_title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="SEO URL"
        validateStatus={errors.seo_url ? 'error' : ''}
        help={errors.seo_url ? 'Please input the SEO URL!' : ''}
      >
        <Controller
          name="seo_url"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Category"
        validateStatus={errors.category_name ? 'error' : ''}
        help={errors.category_name ? 'Please select a category!' : ''}
      >
        <Controller
          name="category_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select a category"
              onChange={(value, option) => {
                setSelectedCategory({ id: option.key, name: value });
                field.onChange(value);
              }}
            >
              {categories.map((category) => (
                <Option key={category.category_id} value={category.category_name}>
                  {category.category_name}
                </Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>


      <Form.Item
        label="Images"
        validateStatus={errors.images ? 'error' : ''}
        help={errors.images ? 'Please upload at least one image!' : ''}
      >
        <input
          type="file"
          onChange={handleFileChange}
          multiple
        />
        <div style={{ marginTop: '10px' }}>
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
            />
          ))}
        </div>
      </Form.Item>

      <Form.Item
        label="Price"
        validateStatus={errors.price ? 'error' : ''}
        help={errors.price ? 'Please input the price!' : ''}
      >
        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputNumber
              {...field}
              style={{ width: '100%' }}
              onChange={(value) => {
                field.onChange(value);
                const discountPercentage = getValues('discount_percentage') || 0;
                setCalculatedDiscountPrice(calculateDiscountPrice(value, discountPercentage));
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Discount Percentage"
        validateStatus={errors.discount_percentage ? 'error' : ''}
        help={errors.discount_percentage?.message || ''}
      >
        <Controller
          name="discount_percentage"
          control={control}
          rules={{
            required: 'Please input the discount percentage!',
            min: {
              value: 1,
              message: 'Discount percentage must be at least 1%',
            },
            max: {
              value: 100,
              message: 'Discount percentage cannot exceed 100%',
            },
          }}
          render={({ field }) => (
            <InputNumber
              {...field}
              style={{ width: '100%' }}
              min={1}
              max={100}
              precision={0}
              onChange={(value) => {
                field.onChange(value);
                const price = getValues('price') || 0;
                setCalculatedDiscountPrice(calculateDiscountPrice(price, value));
              }}
            />
          )}
        />
      </Form.Item>
      <Form.Item label="Discount Price">
        <InputNumber
          value={calculatedDiscountPrice}
          readOnly
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Installation Charges">
        <Controller
          name="InstallationCharges"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <InputNumber
              {...field}
              style={{ width: '100%' }}
              min={0}
              max={999}
              precision={2}
              step={1}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Color"
        validateStatus={errors.color ? 'error' : ''}
        help={errors.color ? 'Please input the color!' : ''}
      >
        <Controller
          name="color"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Arm Type"
        validateStatus={errors.armType ? 'error' : ''}
        help={errors.armType ? 'Please select the arm type!' : ''}
      >
        <Controller
          name="armType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select {...field} style={{ width: '100%' }}>
              <Option value="with_arm_tent">With Arm Tent</Option>
              <Option value="without_arm_tent">Without Arm Tent</Option>
            </Select>
          )}
        />
      </Form.Item>



      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}