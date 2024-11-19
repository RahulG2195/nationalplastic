import { query } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const results = await query({
            query: `SELECT id, email FROM newsletter group by email; `,
            values: [],
        });
        const justEmails = results.map(results => results.email);
        return NextResponse.json({
            justEmails,
            results,
            status: 200
        })
    } catch (err) {
        return NextResponse.json({
            error: "Failed to fetch data",
            status: 500,
            errorMessage: err.message
        })
    }
}


export async function POST(req) {
    try {
        const body = await req.json();
        const {email} = body;

        // Construct the SQL query to insert the new coupon
        const insertQuery = `
            INSERT INTO newsletter (email)
            VALUES (?)
        `;

        // Execute the insert query
        const result = await query({
            query: insertQuery,
            values: [email],
        });

        return NextResponse.json({
            result,
            status: 200,
            success: true,
        })
    } catch (err) {
        return NextResponse.json({
            error: "Failed to fetch data",
            success: false,
            response: result,
            status: 500,
            errorMessage: err.message
        })
    }
}



export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing ID" }),
                { status: 400 }
            );
        }
        const deleteQuery = "DELETE FROM newsletter WHERE id = ?";
        const result = await query({
            query: deleteQuery,
            values: [id],
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Email deleted successfully",
                response: result
            }),
            { status: 200 }
        );
    } catch (e) {
        console.error(e.message);
        return new Response(
            JSON.stringify({ success: false, message: e.message, response: result }),
            { status: 500 }
        );
    }
}