
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query({
      query: "SELECT set_status FROM settings WHERE set_type = 'price_visibility'",
      values: [],
    });

    if (result.length === 0) {
      // If no settings is found, create one with default value 1 (visible)
      await query({
        query: "INSERT INTO settings (set_type, set_status) VALUES ('price_visibility', 1)",
        values: [],
      });
      return NextResponse.json({ set_status: 1 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { set_status } = await request.json();

    await query({
      query: "UPDATE settings SET set_status = ? WHERE set_type = 'price_visibility'",
      values: [set_status],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Price visibility updated successfully",
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
