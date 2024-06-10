"use client"
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "./EditProduct.css";

export default function App() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productToEdit"));
    if (data) {
      // Set form values with data from localStorage
      Object.keys(data).forEach(key => {
        setValue(key, data[key]);
      });
    }
  }, [setValue]);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='Form'>
      <input type="text" placeholder="product_name" {...register("product_name", {required: true, min: 1, maxLength: 65, pattern: /^[a-zA-Z-]+$/i})} />
      <input type="text" label htmlFor="name" placeholder="meta_title" {...register("meta_title")} />
      <input type="text" placeholder="meta_description" {...register("meta_description")} />
      <input type="text" placeholder="short_description" {...register("short_description")} />
      <textarea  placeholder="long description" {...register("long_description")} />
      <input type="text" placeholder="seo_title" {...register("seo_title")} />
      <input type="text" placeholder="seo_url" {...register("seo_url")} />
      <input type="text" placeholder="category_name" {...register("category_name")} />
      <textarea {...register("image_name")} />
      <input type="number" placeholder="price" {...register("price")} />
      <input type="number" placeholder="discount_price" {...register("discount_price")} />
      <input type="number" placeholder="discount_percentage" {...register("discount_percentage")} />
      <input type="number" placeholder="duration" {...register("duration")} />
      <input type="text" placeholder="InstallationCharges" {...register("InstallationCharges")} />
      <input type="text" placeholder="color" {...register("color")} />
      <input type="text" placeholder="armType" {...register("armType")} />
      <input type="text" placeholder="prod_status" {...register("prod_status")} />

      <input type="submit" />
    </form>
  );
}
