import { query } from "@/lib/db";
import colorNameList from "color-name-list";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import upload from "@/utils/multer.middleware";

const fs = require("fs").promises;
const path = require("path");



function convertColorToCode(color) {
  const colorEntry = colorNameList.find(
    (entry) => entry.name.toLowerCase() === color.toLowerCase()
  );
  if (!colorEntry) {
    throw new Error(`Invalid color name: ${color}`);
  }
  return colorEntry.hex;
}

const uploadImage = async (file) => {
  try {
    if (!file || typeof file.arrayBuffer !== "function") {
      throw new Error("Invalid file object");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_PRODUCTS_PATH_DIR}`;

    // Check if the directory exists, if not, create it
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);
    return file.name;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export async function POST(request) {
  try {
    const formData = await request.formData();

    const requiredFields = [
      "product_name",
      "seo_url",
      "category_id",
      "price",
      "discount_price",
      "discount_percentage",
      "InstallationCharges",
      "color",
      "armType",
    ];
    const data = {};
    const missingFields = [];

    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (!value) {
        missingFields.push(field);
      } else {
        data[field] = value;
      }
    });

    // Add non-required fields
    const optionalFields = [
      "meta_title",
      "meta_description",
      "short_description",
      "long_description",
      "duration",
      "prod_status",
    ];

    optionalFields.forEach((field) => {
      let value = formData.get(field);
      if (value && value !== "undefined") {
        data[field] = value;
      } else {
        data[field] = null;
      }
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `The following fields are required: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Create seo_url_clr
    data.seo_url_clr = `${data.seo_url}-${data.color}`.toUpperCase();

    // Handle multiple image uploads
    //    const imageNames = [];

    // Handle multiple image uploads
    const imageNames = [];
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("image")) {
        try {
          if (!value || !value.name) {
            throw new Error("Invalid file object");
          }
          const imageName = await uploadImage(value);
          imageNames.push(imageName);
        } catch (error) {
          return NextResponse.json(
            {
              success: false,
              error: `Failed to upload image ${value.name}: ${error.message}`,
            },
            { status: 500 }
          );
        }
      }
    }
    data.image_name = imageNames.join(", ");

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
        INSERT INTO products (
          product_name, meta_title, meta_description, short_description, long_description,
          seo_url, seo_url_clr, category_id, image_name, price, discount_price, discount_percentage,
          duration, InstallationCharges, color, color_code, armType, prod_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      values: [
        data.product_name,
        data.meta_title || null,
        data.meta_description || null,
        data.short_description || null,
        data.long_description || null,
        data.seo_url,
        data.seo_url_clr,
        data.category_id,
        data.image_name,
        data.price,
        data.discount_price,
        data.discount_percentage,
        data.duration || null,
        data.InstallationCharges,
        data.color,
        color_code,
        data.armType,
        data.prod_status || 1,
      ],
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const images = formData.getAll("image");
    const imageNames = [];
    if (images && images.length > 0) {
      for (let image of images) {
        try {
          if (!image || !image.name) {
            throw new Error("Invalid file object");
          }
          const imageName = await uploadImage(image);
          imageNames.push(imageName);
        } catch (error) {
          return NextResponse.json(
            { 
              success: false, 
              error: `Failed to upload image ${image.name}: ${error.message}`,
              step: "Image upload"
            },
            { status: 500 }
          );
        }
      }
    }

    const requiredFields = [
      "product_name",
      "seo_url",
      "category_id",
      "price",
      "discount_percentage",
      "color",
      "armType",
      "product_id",
    ];
    const data = {};
    const missingFields = [];

    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (!value) {
        missingFields.push(field);
      } else {
        data[field] = value;
      }
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `The following fields are required: ${missingFields.join(", ")}`,
          step: "Field validation"
        },
        { status: 400 }
      );
    }

    data.image_name = imageNames.length > 0 ? imageNames.join(", ") : formData.get("image_name");

    data.category_id = formData.get('category_id');

    let color_code;
    try {
      color_code = convertColorToCode(data.color);
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          step: "Color conversion"
        },
        { status: 400 }
      );
    }

    const result = await query({
      query: `
        UPDATE products 
        SET 
          product_name = ?,
          seo_url = ?,
          category_id = ?,
          image_name = ?,
          price = ?,
          discount_percentage = ?,
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
        data.discount_percentage,
        data.color,
        color_code,
        data.armType,
        data.prod_status || 1,
        data.product_id,
      ],
    });
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: "Product updated successfully",
      updatedFields: Object.keys(data),
      imageNames: imageNames
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        stack: error.stack,
        step: "General error"
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const allProducts = await query({
      query:
        "SELECT p.*,c.category_id,c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        allProducts: allProducts,
      })
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: e.message,
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
