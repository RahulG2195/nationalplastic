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
	const defaultColor = "#000";
  if (!colorEntry) {
 return defaultColor;
   // throw new Error(`Invalid color name: ${color}`);
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
      "features",
      "dimenions",
      "descp",
      "careAndInstruct",
      "deliveryInsct",
      "manufacturing",
      "warranty",
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
    console.log('data', data);
    
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

    // get last insert id 
    const lastInsertedId = result.insertId;

    const dimension_img_file = formData.get('dimension_img');
    if (dimension_img_file) {
      await uploadImage(dimension_img_file);
    }


    if (lastInsertedId) {
      await query({
        query: `
      INSERT INTO product_detail (
        prod_id, features, dimenions, descp, careAndInstruct,
        deliveryInsct, manufacturing, warranty, dimension_img
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
        values: [
          lastInsertedId,
          data.features || '',
          data.dimenions || '',
          data.descp || '',
          data.careAndInstruct || '',
          data.deliveryInsct || '',
          data.manufacturing || '',
          data.warranty || '',
          dimension_img_file.name || ''
        ],
      });
    }

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
    const product_id = formData.get("product_id");

    if (!product_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Product ID is required",
          step: "Field validation",
        },
        { status: 400 }
      );
    }

    const updateData = {};
    const updateFields = [];
    const updateValues = [];

    // Handle image uploads
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
              step: "Image upload",
            },
            { status: 500 }
          );
        }
      }
      updateData.image_name = imageNames.join(", ");
      updateFields.push("image_name = ?");
      updateValues.push(updateData.image_name);
    }

    // Handle other fields
    const fields = [
      "product_name",
      "seo_url",
      "category_id",
      "price",
      "discount_percentage",
      "color",
      "armType",
      "prod_status",
    ];

    fields.forEach((field) => {
      const value = formData.get(field);
      if (value !== null && value !== undefined && value !== "") {
        updateData[field] = value;
        updateFields.push(`${field} = ?`);
        updateValues.push(value);
      }
    });

    // Handle color code
    if (updateData.color) {
      try {
        const color_code = convertColorToCode(updateData.color);
        updateFields.push("color_code = ?");
        updateValues.push(color_code);
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
            step: "Color conversion",
          },
          { status: 400 }
        );
      }
    }

    // Update products table if there are changes
    let result;
    if (updateFields.length > 0) {
      result = await query({
        query: `
          UPDATE products 
          SET ${updateFields.join(", ")}
          WHERE product_id = ?
        `,
        values: [...updateValues, product_id],
      });
    }

    // Handle product_detail fields
    const detailFields = [
      "features",
      "dimenions",
      "descp",
      "careAndInstruct",
      "deliveryInsct",
      "manufacturing",
      "warranty",
    ];
    const detailUpdateFields = [];
    const detailUpdateValues = [];

    detailFields.forEach((field) => {
      const value = formData.get(field);
      if (value && value !== "undefined") {
        detailUpdateFields.push(`${field} = ?`);
        detailUpdateValues.push(value);
      }
    });

    // Handle dimension image
    const dimension_img_file = formData.get('dimension_img');
    if (dimension_img_file) {
      await uploadImage(dimension_img_file);
      detailUpdateFields.push("dimension_img = ?");
      detailUpdateValues.push(dimension_img_file.name);
    }

    // Update product_detail table if there are changes
    if (detailUpdateFields.length > 0) {
      await query({
        query: `
          UPDATE product_detail
          SET ${detailUpdateFields.join(", ")}
          WHERE prod_id = ?
        `,
        values: [...detailUpdateValues, product_id],
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "Product updated successfully",
        updatedFields: Object.keys(updateData),
        imageNames: imageNames,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        step: "General error",
      },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const allProducts = await query({
      query: `SELECT p.*,c.category_id,c.category_name, t.tag_id, t.tag_name, t.tag_status 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.category_id 
        LEFT JOIN tags_cat as t ON p.tag_cat = t.tag_id`,
      values: [],
    });

    const tags = await query({
      query: `SELECT * FROM tags_cat WHERE tag_status = 1`,
      value: [],
    });

    // const product_detail =  await query({
    //   query: `SELECT * FROM product_detail WHERE tag_status = 1`,
    //   value: [],
    // });

    return new Response(
      JSON.stringify({
        status: 200,
        allProducts: allProducts,
        prod_tags_api_data: tags,
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

export async function PATCH(request) {
  try {
    const { product_id, prod_status, collections, type } = await request.json();

    // Validate inputs
    console.log("collections1", collections);
    console.log("type", type);

    if (type == "collection") {
      const result = await query({
        query: `UPDATE products SET categoryType = ? WHERE product_id = ?`,
        values: [collections, product_id],
      });

      if (result.affectedRows === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "Product not found" }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: { product_id, collectionsOutput: collections },
        }),
        { status: 200 }
      );
    } else if (type == "status") {
      if (product_id != undefined && prod_status != undefined) {
        // Ensure prod_status is either 0 or 1
        const validatedStatus = prod_status ? 1 : 0;

        // Update the product status
        const result = await query({
          query: `UPDATE products SET prod_status = ? WHERE product_id = ?`,
          values: [validatedStatus, product_id],
        });

        if (result.affectedRows === 0) {
          return new Response(
            JSON.stringify({ success: false, error: "Product not found" }),
            { status: 404 }
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            data: { product_id, prod_status: validatedStatus },
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "product_id and prod_status are required",
          }),
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error updating product status:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
