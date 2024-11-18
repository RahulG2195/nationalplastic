import { query } from '@/lib/db';

export async function GET(req) {
    try {
        const customer = await query({
            query: "SELECT * FROM customer ORDER BY customer_id ASC",
            values: [],
        });
        
        return new Response(
            JSON.stringify({
                success: true,
                customer: customer
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { customer_id, status } = body;

        if (!customer_id) {
            return new Response(
                JSON.stringify({ success: false, message: "Customer ID is required" }),
                { status: 400 }
            );
        }

        const updateQuery = `
            UPDATE customer 
            SET status = ?
            WHERE customer_id = ?
        `;

        await query({
            query: updateQuery,
            values: [status, customer_id],
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Customer status updated successfully"
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        const { customer_id } = body;

        if (!customer_id) {
            return new Response(
                JSON.stringify({ success: false, message: "Customer ID is required" }),
                { status: 400 }
            );
        }

        const deleteQuery = "DELETE FROM customer WHERE customer_id = ?";

        const result = await query({
            query: deleteQuery,
            values: [customer_id],
        });

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ success: false, message: "Customer not found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Customer deleted successfully"
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}