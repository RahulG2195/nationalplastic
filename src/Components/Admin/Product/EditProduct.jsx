"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, InputNumber, Spin, Select } from 'antd';
import "./EditProduct.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from "react-toastify";
const { Option } = Select;

export default function App() {
  const { control, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [calculatedDiscountPrice, setCalculatedDiscountPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, name: '' });
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/admin/product', { replace: true });
    window.location.reload();
  };

  const updateProduct = async (formData) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/adminProducts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update Error:', error.message);
      throw error;
    }
  };
  const calculateDiscountPrice = (price, discountPercentage) => {
    if (!price || !discountPercentage) return 0;
    const discountAmount = price * (discountPercentage / 100);
    return Number((price - discountAmount).toFixed(2));
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    const submitLoader = async () => {
      try {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
          if (key === 'image') {
            data[key].forEach(file => {
              formData.append('image', file);
            });
          } else {
            formData.append(key, data[key]);
          }
        });
        formData.append('discount_price', calculatedDiscountPrice);
        formData.append('category_id_edited', selectedCategory.id);

        let formDataString = '';
        formData.forEach((value, key) => {
          formDataString += `${key}: ${value}\n`;
        });

        console.log("formData:\n" + formDataString);
        await updateProduct(formData);

        reset();
        setImagePreviews([]);
        handleNavigation();

        return 'Product updated successfully';
      } catch (error) {
        console.error('Submission Error:', error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(
      submitLoader(),
      {
        pending: "Updating product...",
        success: "Product updated successfully!",
        error: "Failed to update product",
      },
      {
        position: "top-center",
        transition: Bounce,
      }
    );
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setValue('image', files);
    setValue('image_name', files.map(file => file.name).join(','));

    const newPreviews = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then(setImagePreviews);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productToEdit"));
    if (data) {
      Object.keys(data).forEach(key => {
        setValue(key, data[key]);
      });
      if (data.image_name) {
        const images = data.image_name.split(',');
        const previews = images.map(img => `/Assets/uploads/products/${img.trim()}`);
        setImagePreviews(previews);
      }
      // Calculate initial discount price
      setCalculatedDiscountPrice(calculateDiscountPrice(data.price || 0, data.discount_percentage || 0));
    }
  }, [setValue]);
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

  return (
    <Spin spinning={isLoading} tip="Updating product...">
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
            rules={{ required: true,minLength: 1, maxLength: 65, pattern: /^[a-zA-Z0-9\s-]+$/i }}
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
          validateStatus={errors.image ? 'error' : ''}
          help={errors.image ? 'Please upload at least one image!' : ''}
        >
          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Product image ${index + 1}`}
                title={`Product Image ${index + 1}`}
                style={{ maxWidth: '40px', marginRight: '10px', marginBottom: '10px' }}
              />
            ))}
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
          />
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
                  setCalculatedDiscountPrice(calculateDiscountPrice(value || 0, discountPercentage));
                }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Discount Percentage"
          validateStatus={errors.discount_percentage ? 'error' : ''}
          help={errors.discount_percentage ? 'Please input the discount percentage!' : ''}
        >
          <Controller
            name="discount_percentage"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: '100%' }}
                onChange={(value) => {
                  field.onChange(value);
                  const price = getValues('price') || 0;
                  setCalculatedDiscountPrice(calculateDiscountPrice(price, value || 0));
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

        <Form.Item
          label="Product Status"
          validateStatus={errors.prod_status ? 'error' : ''}
          help={errors.prod_status ? 'Please input the product status!' : ''}
        >
          <Controller
            name="prod_status"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}