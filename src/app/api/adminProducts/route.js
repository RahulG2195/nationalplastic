import { query } from '@/lib/db';




export async function POST(request) {
  try {
    const data = await request.json(); // Parse incoming JSON data
    const {
      product_id,
      product_name,
      seo_url,
      category_id,
      image_name,
      price,
      discount_price,
      color,
      color_code,
      armType,
      prod_status,
    } = data;

    // Manual validation
    if (!product_id || !product_name || !seo_url || !category_id ||
        !image_name || !price || !discount_price || !color || !color_code || !armType || !prod_status) {
      return new Response(
        JSON.stringify({ success: false, error: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Check if product_id already exists
    const existingProduct = await query({
      query: 'SELECT product_id FROM products WHERE product_id = ?',
      values: [product_id],
    });
    if (existingProduct.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Product ID already exists' }),
        { status: 400 }
      );
    }

    // Validate category_id
    const validCategory = await query({
      query: 'SELECT id FROM categories WHERE id = ?',
      values: [category_id],
    });
    if (validCategory.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid category ID' }),
        { status: 400 }
      );
    }

    // Insert the new product
    const result = await query({
      query: `
        INSERT INTO products (product_id, product_name, seo_url, category_id, image_name, price, discount_price, color, color_code, armType, prod_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      values: [product_id, product_name, seo_url, category_id, image_name, price, discount_price, color, color_code, armType, prod_status],
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
      query:"select * from products",
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