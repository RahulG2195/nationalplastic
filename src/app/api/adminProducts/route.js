import { query } from '@/lib/db';
import colorNameList from 'color-name-list';

function convertColorToCode(color) {
  const colorEntry = colorNameList.find(entry => entry.name.toLowerCase() === color.toLowerCase());
  if (!colorEntry) {
    throw new Error(`Invalid color name: ${color}`);
  }
  return colorEntry.hex;
}

export async function POST(request) {
  try {
    const data = await request.json(); // Parse incoming JSON data
    const {
      product_name,
      seo_url,
      category_id,
      image_name,
      price,
      discount_price,
      color,
      armType,
      prod_status,
    } = data;

    // Manual validation
    const requiredFields = {
      product_name,
      seo_url,
      category_id,
      image_name,
      price,
      discount_price,
      color,
      armType,
      prod_status,
    };

    const missingFields = Object.entries(requiredFields).filter(([key, value]) => !value).map(([key]) => key);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `The following fields are required: ${missingFields.join(', ')}` }),
        { status: 400 }
      );
    }

    // Convert color name to color code
    let color_code;
    try {
      color_code = convertColorToCode(color);
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400 }
      );
    }


    // Insert the new product
    const result = await query({
      query: `
        INSERT INTO products (product_name, seo_url, category_id, image_name, price, discount_price, color, color_code, armType, prod_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      values: [product_name, seo_url, category_id, image_name, price, discount_price, color, color_code, armType, prod_status],
    });

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating product:', error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const data = await request.json(); // Parse incoming JSON data
    const {
      product_name,
      seo_url,
      category_id,
      image_name,
      price,
      discount_price,
      color,
      armType,
      prod_status,
    } = data;

    // Manual validation
    const requiredFields = {
      product_name,
      seo_url,
      category_id,
      image_name,
      price,
      discount_price,
      color,
      armType,
      prod_status,
    };

    const missingFields = Object.entries(requiredFields).filter(([key, value]) => !value).map(([key]) => key);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `The following fields are required: ${missingFields.join(', ')}` }),
        { status: 400 }
      );
    }

    // Convert color name to color code
    let color_code;
    try {
      color_code = convertColorToCode(color);
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400 }
      );
    }


    // Updating the new product
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
      values: [product_name, seo_url, category_id, image_name, price, discount_price, color, color_code, armType, prod_status, product_id],
    });
    

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating product:', error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
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
    console.log(e.message);
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
    console.log("Received DELETE request"); // Log receipt of the request

    const requestBody = await request.json();
    console.log("Request body:", requestBody); 
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
    console.log("result ", result);
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
