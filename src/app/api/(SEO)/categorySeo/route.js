import { query } from "@/lib/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const isNumeric = /^\d+$/.test(id);
  
    let sqlQuery;
    let param;
    try{
    if (isNumeric) {
        sqlQuery = `
            SELECT meta_title, meta_description,category_name FROM categories
            WHERE category_id = ?
        `;
        param = id;
    } else {
        sqlQuery = `
            SELECT meta_title, meta_description,category_name FROM categories
            WHERE LOWER(seo_url) = LOWER(?)
        `;
        param = id;
    }
  }catch(e){
    return new Response(JSON.stringify({ status: 500, message: e.message }), { status: 500 });
  }


    try {
  
  
      const [data] = await query({
        query: sqlQuery,
        values: [param],
    });
    console.log("jaons: " + JSON.stringify(data));
  
      if (!data) {
        return new Response(JSON.stringify({ status: 404, message: "Product not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify({
        status: 200,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        category_name: data.category_name,
      }));
    } catch (error) {
      return new Response(JSON.stringify({
        status: 500,
        message: error.message,
      }), { status: 500 });
    }
  }