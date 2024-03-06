import { query } from "@/lib/db";
import { parse } from 'url';

export async function GET(request) {
    try {
        
        const parsedUrl = parse(request.url, true);
        const queryParams = parsedUrl.query;

        // console.log("Query parameters:", queryParams);
        
        const searchTerm = queryParams.query.toLocaleLowerCase();
        
        console.log("Searched string:", searchTerm);


        // const products = await query({
        //     query: "SELECT * FROM products WHERE product_name LIKE ?",
        //     values: [`%${searchTerm}%`],  
        // });

        // const products = await query({
        //     query: "SELECT * FROM products WHERE product_name LIKE ? OR categoryType LIKE ? OR short_description LIKE ?",
        //     values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],
        //   });

        const products = await query({
            query: "SELECT * FROM products WHERE LOWER(product_name) REGEXP ? OR LOWER(categoryType) REGEXP ? OR LOWER(short_description) REGEXP ?",
            values: [`${searchTerm}`, `${searchTerm}`, `${searchTerm}`],
        });


        // Return the search results
        return new Response(JSON.stringify({
            status: 200,
            products: products
        }));

    } catch (error) {
        console.error("Error searching products:", error);

        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error in getting"
        }));
    }
}



