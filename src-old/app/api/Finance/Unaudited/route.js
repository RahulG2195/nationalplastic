import { query } from "@/lib/db";
// const router = useRouter();
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
export async function GET(request) {
  try {
    const UnauditedData = await query({
      query: `SELECT * FROM unaudited`,
    });

    return new Response(
      JSON.stringify({
        status: 200,
        UnauditedData: UnauditedData,
        message: "All Orders Retrieved",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { years, title, quarter, fileName } = body;

    const InsertData = await query({
      query: `INSERT INTO unaudited (years, title, quarter, file_name) VALUES (?, ?, ?, ?)`,
      values: [years, title, quarter, fileName],
    });
    return new Response(
      JSON.stringify({
        status: 200,
        message: "Data Inserted Successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
