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
    //     const result = await query({
    //         query: "INSERT INTO Customer (FirstName, LasttName, Email, Phone, Address, Password) VALUES (?, ?, ?, ?, ?, ?)",
    // values: ['Dinesh', 'nadar', 'd@gmail.com', '7779997777', "kalyan", "passwordd@123"],
    //     });
    const result = await query({
        query: "UPDATE Customer SET Phone = '00000000', Address = 'absc', Email = 'asd@gmail.com' WHERE customer_id = 1;"
    })

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
