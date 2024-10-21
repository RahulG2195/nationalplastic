import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const results = await query({
            query: "SELECT * FROM faqs ",
            values: [],
        })

        return new Response(
            JSON.stringify({
                faqs: results
            })
        )
    } catch (err) {
        return NextResponse.json({ success: false, error: "Failed  To fetch faq's", message: err.message });
    }
}