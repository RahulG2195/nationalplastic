
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query({
      query: "SELECT set_status FROM setting WHERE set_type = 'price_visibility'",
      values: [],
    });

    if (result.length === 0) {
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
