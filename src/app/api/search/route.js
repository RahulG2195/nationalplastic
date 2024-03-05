import { query } from "@/lib/db";
import { parse } from 'url';

export async function GET(request) {
    try {
        // console.log("first",parse(request.url,true))
        // console.log("first gsgs",(request.url.hostname))
        // console.log("Request method:", request.method);
        // console.log("Request URL:", request.url);
        // console.log("Request headers:", request.headers);
        // console.log("Request body:", request.body);
        
        const parsedUrl = parse(request.url, true);
        const queryParams = parsedUrl.query;

        // console.log("Query parameters:", queryParams);
        
        const searchTerm = queryParams.query;
        console.log("Searched string:", searchTerm);


        const products = await query({
            query: "SELECT * FROM products WHERE product_name LIKE ?",
            values: [`%${searchTerm}%`], 
            
        });

        // Return the search results
        return new Response(JSON.stringify({
            status: 200,
            products: products
        }));

    } catch (error) {
        console.error("Error searching products:", error);

        // Handle any errors and return an appropriate response
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error in getting"
        }));
    }
}

// export async function GET(request) {
//     try {
//         const products = await query({
//             query: "SELECT * FROM products",
//             values: [],
//         });

//         return new Response(JSON.stringify({
//             status: 200,
//             products: products
//         }));

//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             message: "Internal Server Error"
//         }));
//     }
// }


