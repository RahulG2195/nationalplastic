import { query } from "@/lib/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const isNumeric = /^\d+$/.test(id);
  
    let sqlQuery;
    let param;
    
    if (isNumeric) {
        sqlQuery = `
            SELECT meta_title, meta_description, product_name
            FROM products 
            WHERE product_id = ? 
            LIMIT 1
        `;
        param = id;
    } else {
        sqlQuery = `
            SELECT meta_title, meta_description, product_name FROM products
            WHERE LOWER(seo_url) = LOWER(?) AND prod_status = 1
            LIMIT 1
        `;
        param = id;
    }
    try {
  
  
      const [product] = await query({
        query: sqlQuery,
        values: [param],
    });
   
  
      if (!product) {
        return new Response(JSON.stringify({ status: 404, message: "Product not found" }), { status: 404 });
      }
  
      return new Response(
        JSON.stringify({
          status: 200,
          meta_title: product.meta_title,
          meta_description: product.meta_description,
          product_name: product.product_name,
        }),
        { status: 200 }
      );
      
    } catch (error) {
      return new Response(JSON.stringify({
        status: 500,
        message: error.message,
      }), { status: 500 });
    }
  }