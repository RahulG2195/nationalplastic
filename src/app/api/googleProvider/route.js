import { query } from "@/lib/db";

export async function POST(request) {
    try {
        const { email, name, id } = await request.json();

        console.log("Email:", email);
        console.log("username:", name);
        console.log("google_id:", id);

        // Check if the email already exists in the database
        const existingUser = await query({
            query: "SELECT * FROM customer WHERE Email = ?",
            values: [email],
        });

        if (existingUser.length > 0) {
            const user = existingUser[0];

            if (user.google_id) {
                // Email and Google ID are both present
                return new Response(
                    JSON.stringify({ message: "User Data", email: email, customer_id: user.customer_id }),
                    { status: 200 }
                );
            } else {
                // Email is present but Google ID is not, update Google ID
                const updateResult = await query({
                    query: "UPDATE customer SET google_id = ? WHERE Email = ?",
                    values: [id, email],
                });

                if (updateResult.affectedRows > 0) {
                    return new Response(
                        JSON.stringify({ message: "User Data Updated", email: email, customer_id: user.customer_id }),
                        { status: 200 }
                    );
                } else {
                    return new Response(
                        JSON.stringify({ message: "Failed to update user data" }),
                        { status: 500 }
                    );
                }
            }
        } else {
            // If the email does not exist, insert the new user into the database
            const insertResult = await query({
                query: "INSERT INTO customer (Email, FirstName, google_id) VALUES (?, ?, ?)",
                values: [email, name, id],
            });

            if (insertResult.affectedRows > 0) {
                const newUser = await query({
                    query: "SELECT customer_id FROM customer WHERE Email = ?",
                    values: [email],
                });

                return new Response(
                    JSON.stringify({ message: "Registration successful", email: email, customer_id: newUser[0].customer_id }),
                    { status: 201 }
                );
            } else {
                return new Response(
                    JSON.stringify({ message: "Failed to register user" }),
                    { status: 500 }
                );
            }
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: 500,
                message: error.message,
            })
        );
    }
}
