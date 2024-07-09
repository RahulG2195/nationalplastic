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
      query: "SELECT * FROM products WHERE seo_url = ? AND color = ?",
      values: [name, color],
    });
  }
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

export async function PUT(request) {
  try {
    const { name, colors } = await request.json();

    if (!name || colors === undefined) {
      throw new Error("Invalid input. Please provide a name and color(s).");
    }

    let querys;
    let values;

    if (Array.isArray(colors)) {
      // Handle multiple colors
      const colorPlaceholders = colors.map(() => '?').join(',');
      querys = `SELECT color, image_name FROM products WHERE seo_url = ? AND color IN (${colorPlaceholders})`;
      values = [name, ...colors];
    } else {
      // Handle single color
      querys = "SELECT color, image_name FROM products WHERE seo_url = ? AND color = ?";
      values = [name, colors];
    }

    const getProducts = await query({
      query: querys,
      values: values,
    });

    // Process the results to get only the first image
    const processedProducts = getProducts.map(product => ({
      color: product.color,
      image_name: product.image_name.split(', ')[0] // Get only the first image
    }));

    return new Response(
      JSON.stringify({
        status: 200,
        data: processedProducts,
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