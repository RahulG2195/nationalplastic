import { query } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request){
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    try{
        const results = await query({
            query: "SELECT * FROM terms_and_conditions where page = ?",
            values: [page],
        })

        return NextResponse.json({
            results,
            status: 200
        })
    }catch(err){
        return NextResponse.json({
            error: "Failed to fetch data",
            status: 500,
            errorMessage: err.message
        })
    }
}