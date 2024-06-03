import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const { name, color,product_id } = await request.json();
    let getProducts;
    if(product_id) {
       getProducts = await query({
        query: "SELECT * FROM products WHERE product_id = ?",
        values: [product_id],
      });
    }else{
     getProducts = await query({
      query: "SELECT * FROM products WHERE product_name = ? AND color = ?",
      values: [name, color],
    });
  }
  console.log("getproducts", getProducts);
    return new Response(
      JSON.stringify({
        status: 200,
        data: getProducts,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
