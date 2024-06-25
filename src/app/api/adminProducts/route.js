import { query } from '@/lib/db';
import colorNameList from 'color-name-list';
import { NextResponse } from 'next/server';
import { writeFile } from "fs/promises";
import upload from "@/utils/multer.middleware";

function convertColorToCode(color) {
  const colorEntry = colorNameList.find(entry => entry.name.toLowerCase() === color.toLowerCase());
  if (!colorEntry) {
    throw new Error(`Invalid color name: ${color}`);
  }
  return colorEntry.hex;
}
const uploadImage = async (file)=>{
  try{
    await upload.single(file);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `./uploads/${file.name}`;
    await writeFile(path, buffer);
  }catch(error){
    console.log('error: ', error.message);
  }
}

const convertCategoryID = async (category_name) => {
  try {
    const category = await query({
      query: "SELECT category_id FROM categories WHERE category_name = ?",
      values: [category_name],
    });
    
    if (category.length > 0) {
      return category[0].category_id;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return false;
  }
};


export async function POST(request) {
  try {
    const formData = await request.formData();
   
    const requiredFields = [
      'product_name',
      'seo_url',
      'category_name',
      'price',
      'discount_price',
      'color',
      'armType',
      'prod_status'
    ];
    const data = {};
    const missingFields = [];
   
    requiredFields.forEach(field => {
      const value = formData.get(field);
      if (!value) {
        missingFields.push(field);
      } else {
        data[field] = value;
      }
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `The following fields are required: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Handle multiple image uploads
    const imageNames = [];
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('image')) {
        try {
          const imageName = await uploadImage(value);
          imageNames.push(imageName);
        } catch (error) {
          console.error('Error uploading image:', error);
          return NextResponse.json(
            { success: false, error: 'Failed to upload image' },
            { status: 500 }
          );
        }
      }
    }
    data.image_name = imageNames.join(',');

    const category_id = await convertCategoryID(data.category_name);
    data.category_id = category_id;

    // Convert color name to color code
    let color_code;
    try {
      color_code = convertColorToCode(data.color);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // Insert the new product
    const result = await query({
      query: `
        INSERT INTO products (product_name, seo_url, category_id, image_name, price, discount_price, color, color_code, armType, prod_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      values: [
        data.product_name,
        data.seo_url,
        data.category_id,
        data.image_name,
        data.price,
        data.discount_price,
        data.color,
        color_code,
        data.armType,
        data.prod_status
      ],
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const images = formData.getAll('image');
    let imageNames = [];

    // Handle multiple image uploads
    if (images && images.length > 0) {
      for (const image of images) {
        const imageName = await uploadImage(image);  // Ensure this function handles image upload and returns the image name
        imageNames.push(imageName);
      }
    }

    const requiredFields = [
      'product_name',
      'seo_url',
      'category_id',
      'price',
      'discount_price',
      'color',
      'armType',
      'prod_status',
      'product_id'
    ];
    const data = {};
    const missingFields = [];
   
    requiredFields.forEach(field => {
      const value = formData.get(field);
      if (!value) {
        missingFields.push(field);
      } else {
        data[field] = value;
      }
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `The following fields are required: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Set image_name to the new image names if uploaded, otherwise keep the existing ones
    data.image_name = imageNames.length > 0 ? imageNames.join(',') : formData.get('image_name');

    // Convert color name to color code
    let color_code;
    try {
      color_code = convertColorToCode(data.color);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // Updating the product
    const result = await query({
      query: `
        UPDATE products 
        SET 
          product_name = ?,
          seo_url = ?,
          category_id = ?,
          image_name = ?,
          price = ?,
          discount_price = ?,
          color = ?,
          color_code = ?,
          armType = ?,
          prod_status = ?
        WHERE 
          product_id = ?
      `,
      values: [
        data.product_name,
        data.seo_url,
        data.category_id,
        data.image_name,
        data.price,
        data.discount_price,
        data.color,
        color_code,
        data.armType,
        data.prod_status,
        data.product_id
      ],
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(request){
  try{
    const allProducts = await query({
      query:"SELECT p.*,c.category_id,c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id",
      values:[],
    })

    return new Response(
      JSON.stringify({
        status: 200,
        allProducts: allProducts,
      })
    );

  }catch(e){
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error:e.message,
      })
    );

  }
}

export async function DELETE(request) {
  try {

    const requestBody = await request.json();
    const { product_id } = requestBody;
    if (!product_id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Product ID is required",
        }),
        { status: 400 }
      );
    }

    const result = await query({
      query: "DELETE FROM products WHERE product_id = ?",
      values: [product_id],
    });
    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({
          status: 204,
          message: `Product with ID ${product_id} deleted successfully`,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 404,
          message: `Product with ID ${product_id} not found`,
        }),
        { status: 404 }
      );
    }
  } catch (e) {
    console.error("Error processing DELETE request:", e.message);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: e.message,
      }),
      { status: 500 }
    );
  }
}
