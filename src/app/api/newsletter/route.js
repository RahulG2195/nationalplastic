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
        const { email } = body;

        // Check if email already exists
        const checkQuery = `SELECT 1 FROM newsletter WHERE email = ? LIMIT 1`;
        const checkResult = await query({
            query: checkQuery,
            values: [email],
        });

        if (checkResult.length > 0) {
            return NextResponse.json({
                message: "Email already subscribed",
                success: false,
                status: 409,
            });
        }

        // Insert if it doesn't exist
        const insertQuery = `INSERT INTO newsletter (email) VALUES (?)`;
        const insertResult = await query({
            query: insertQuery,
            values: [email],
        });

        return NextResponse.json({
            result: insertResult,
            success: true,
            status: 200,
        });

    } catch (err) {
        return NextResponse.json({
            error: "Failed to subscribe",
            success: false,
            status: 500,
            errorMessage: err.message
        });
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