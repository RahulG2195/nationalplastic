import { query } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
/* SELECT p.*, c.category_name, pd.descp, c.seo_url AS cat_seo_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      RIGHT JOIN product_detail pd ON p.product_id = pd.prod_id
      WHERE p.product_id = ? OR LOWER(p.seo_url) = LOWER(?)
      LIMIT 1 */
  try {
    const [product] = await query({
      
      query: `
        SELECT p.*, c.category_name, c.seo_url AS cat_seo_url
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.category_id 
        WHERE p.product_id = ? OR LOWER(p.seo_url) = LOWER(?) AND prod_status = 1
        LIMIT 1
      `,
      values: [id, id],
    });

    if (!product) {
      return new Response(JSON.stringify({ status: 404, message: "Product not found" }), { status: 404 });
    }

    const [productDetails] = await query({
      query: "SELECT * FROM product_detail WHERE prod_id = ?",
      values: [product.product_id],
    });

    const colors = await query({
      query: "SELECT color, color_code FROM products WHERE product_name = ? AND prod_status = 1",
      values: [product.product_name],
    });

    return new Response(JSON.stringify({
      status: 200,
      product,
      productDetails,
      colors,
      category: product.category_id,
    }));
  } catch (error) {
    return new Response(JSON.stringify({
      status: 500,
      message: error.message,
    }), { status: 500 });
  }
}