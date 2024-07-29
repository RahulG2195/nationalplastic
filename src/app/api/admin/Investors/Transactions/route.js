import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const transactions = await query({
      query: "SELECT * FROM rp_transaction",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        transactions: transactions,
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching related party transactions:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}