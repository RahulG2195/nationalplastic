import { query } from "@/lib/db"; // Assuming 'your-database-module' is the correct path to your database module

export async function GET(request) {

    try {
        const users = await query({
            query: "SELECT * FROM Customer",
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

export async function POST(request) {
    try {
    const {Id, Phone, Address} = await request.json();
    const result = await query({
        query: "UPDATE Customer SET Phone = ?, Address = ? WHERE customer_id = ?;",
        values: [Phone, Address, Id]
    });

        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ message: "Registration successful2" }), { status: 200 });
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
