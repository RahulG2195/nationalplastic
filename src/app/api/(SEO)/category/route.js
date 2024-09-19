import { query } from "@/lib/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const isNumeric = /^\d+$/.test(id);
  
    let sqlQuery;
    let param;
    
    if (isNumeric) {
        sqlQuery = `
            SELECT p.*, c.category_name, c.seo_url AS cat_seo_url
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id 
            WHERE p.product_id = ? AND prod_status = 1
            LIMIT 1
        `;
        param = id;
    } else {
        sqlQuery = `
            SELECT meta_title, meta_description FROM products
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
  
      return new Response(JSON.stringify({
        status: 200,
        product,
      }));
    } catch (error) {
      return new Response(JSON.stringify({
        status: 500,
        message: error.message,
      }), { status: 500 });
    }
  }