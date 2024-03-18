import { query } from "@/lib/db";
import { parse } from 'url';

export async function GET(request) {
    const parsedUrl = parse(request.url, true);
    const queryParams = parsedUrl.query;
    // const category = queryParams.query.toLowerCase();
    // console.log("44444444444444444444444444444444444444444444",queryParams.query)

    try {
        const products = await query({
            query: "SELECT * FROM products",
            values: [],
        });

        return new Response(JSON.stringify({
            status: 200,
            products: products
        }));

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error"
        }));
    }
}