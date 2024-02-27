// Import the required modules
import { query } from "@/lib/db"; // Assuming 'your-database-module' is the correct path to your database module
// import { Response } from 'your-response-library'; // Assuming 'your-response-library' is the correct library for handling responses

// Define your API endpoint handler for GET request


export async function GET(request) {
    try {
        const users = await query({
            query: "SELECT * FROM customer_detail",
            values: [],
        });

        let data = JSON.stringify(users);
        return new Response(data, {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message,
        }));
    }
}

// Define your API endpoint handler for registration POST request
export async function POST(request) {
    try {
        const { firstName, lastName, email, phone, password, confirmPassword } = await request.json();

        // Check if the email already exists in the database
        const existingUser = await query({
            query: "SELECT * FROM customer_detail WHERE email = ?",
            values: [email],
        });

        if (existingUser.length > 0) {
            return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });
            // alert("no no no  !");
        }

        // Execute database query to insert new user
        const result = await query({
            query: "INSERT INTO customer_detail (firstName, lastName, email, phone, password, confirmPassword) VALUES (?, ?, ?, ?, ?, ?)",
            values: [firstName, lastName, email, phone, password, confirmPassword],
        });

        // Handle successful registration
        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ message: "Registration successful" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "Failed to register user" }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message,
        }));
    }
}


// export async function POST(request , response) {


    
//     try {
//         console.log("INside ROutes++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
//         console.log("INside ROutes"+request)
//         console.log("INside ROutes"+JSON.stringify(request.body))
//         console.log("INside ROutes"+JSON.stringify(request.data))

//         const userEmail = request
//         const query = `SELECT * FROM email WHERE email = $1`;
//         const values = [userEmail];

//         const users = await query({
//             query,
//             values,
            
//         });

//         let data = JSON.stringify(users);
//         return new Response(data, {
//             status: 200,
//         });
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             message: error.message,
//         }));
//     }
// }

// Define your API endpoint handler for registration POST request
export async function PUT(request) {
    try {
        const { email} = await request.json();
        console.log("putttttttttp request");

        console.log(email);
        // Check if the email already exists in the database
        const existingUser = await query({
            query: "SELECT * FROM customer_detail WHERE email = ?",
            values: [email],
        });
        console.log("existing user")
        console.log("existing user"+existingUser)
        console.log("existing user"+typeof(existingUser))
        console.log("existing :"+JSON.stringify(existingUser))
        console.log("existing :"+JSON.stringify(existingUser[0].Email))


        if (existingUser.length > 0) {
            return new Response(JSON.stringify({ existingUser }), { status: 200 });
            // alert("no no no  !");
        }
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message,
        }));
    }
}
