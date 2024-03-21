import { query } from "@/lib/db";
import { parse } from 'url';

export async function GET(request) {
    const parsedUrl = parse(request.url, true);
    const queryParams = parsedUrl.query.query;

    // queryValue = evaluatedQuery.toString(); // Convert the evaluated result to a string

    // console.log("44444444444444444444444444444444444444444444",queryParams)

    try {
        const products = await query({
            query: "SELECT * FROM products where LOWER(categoryType) = LOWER(?)",
            values: [`${queryParams}`],
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