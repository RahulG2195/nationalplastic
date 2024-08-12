import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const allHeroSections = await query({
      query: "SELECT * FROM herosection",
      values: [],
    });
    return new Response(
      JSON.stringify({
        status: 200,
        allHeroSections: allHeroSections,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching hero sections:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateFields } = body;
    
    const setClause = Object.keys(updateFields)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = [...Object.values(updateFields), id];
    
    const result = await query({
      query: `UPDATE herosection SET ${setClause} WHERE id = ?`,
      values: values,
    });
    
    return new Response(
      JSON.stringify({
        status: 200,
        message: "Hero section updated successfully",
        result: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating hero section:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { redirect_url, image_name,  seo } = body;
    
    const result = await query({
      query: "INSERT INTO herosection (redirect_url, image_name,  seo) VALUES (?, ?, ?)",
      values: [redirect_url, image_name,  seo],
    });
    
    return new Response(
      JSON.stringify({
        status: 201,
        message: "Hero section added successfully",
        result: result,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding hero section:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const image_name = searchParams.get('image_name');
    
    if (!image_name) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "image_name is required",
        }),
        { status: 400 }
      );
    }
    
    const result = await query({
      query: "DELETE FROM herosection WHERE image_name = ?",
      values: [image_name],
    });
    
    return new Response(
      JSON.stringify({
        status: 200,
        message: "Hero section deleted successfully",
        result: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hero section:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}