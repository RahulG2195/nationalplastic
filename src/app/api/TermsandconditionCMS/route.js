import { query } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request){
    try{
        const results = await query({
            query: "SELECT * FROM terms_and_conditions",
            values: [],
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