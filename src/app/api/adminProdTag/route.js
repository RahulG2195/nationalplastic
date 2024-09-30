import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await query({
      query: `SELECT * FROM tags_cat WHERE visible = 1 LIMIT 6`,
      value: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        AllTagY: tags,
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

export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, tagId } = body;

    if (!productId || !tagId) {
      return NextResponse.json(
        { error: "Product ID and tag ID are required" },
        { status: 400 }
      );
    }

    // First, get the current tags for the product
    const currentTagsResult = await query({
      query: "SELECT tag_cat FROM products WHERE product_id = ?",
      values: [productId],
    });

    if (currentTagsResult.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let currentTags = currentTagsResult[0].tag_cat
      ? currentTagsResult[0].tag_cat.split(",")
      : [];

    // Add the new tag if it doesn't exist
    if (!currentTags.includes(tagId.toString())) {
      currentTags.push(tagId.toString());
    }

    // Join the tags back into a comma-separated string
    const updatedTags = currentTags.join(",");

    // Update the product with the new tags
    const updateResult = await query({
      query: "UPDATE products SET tag_cat = ? WHERE product_id = ?",
      values: [updatedTags, productId],
    });

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "Failed to update product tags" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Product tags updated successfully", tags: updatedTags },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error while updating tags: ${error}`);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { productId, tags } = body;

    if (!productId || tags === undefined) {
      return NextResponse.json(
        { error: "Product ID and tags are required" },
        { status: 400 }
      );
    }

    // Update the product with the new tags
    const updateResult = await query({
      query: "UPDATE products SET tag_cat = ? WHERE product_id = ?",
      values: [tags, productId],
    });

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "Failed to update product tags" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Product tags updated successfully", tags: tags },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error while updating tags: ${error}`);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
