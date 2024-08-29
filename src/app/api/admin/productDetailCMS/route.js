import { query } from "@/lib/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const p_id = searchParams.get('p_id');

    if (!p_id) {
        return new Response(
            JSON.stringify({
                status: 400,
                message: "Missing p_id parameter"
            }),
            { status: 400 }
        );
    }

    try {
        const prod_details = await query({
            query: "SELECT * FROM product_detail WHERE prod_id = ?",
            values: [p_id],
        });

        return new Response(
            JSON.stringify({
                status: 200,
                product_details: prod_details
            }),
            { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                status: 500,
                message: e.message
            }),
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}