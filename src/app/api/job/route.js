import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Function to fetch all jobs
export async function GET(req, res) {
    try {
        const results = await query({
            query: "SELECT * FROM jobs WHERE status = 1", // Assuming you have a table named 'jobs'
            values: [],
        });

        return new Response(
            JSON.stringify({
                jobs: results,
            })
        );
    } catch (err) {
        return NextResponse.json({ success: false, error: "Failed to fetch jobs", message: err.message });
    }
}
