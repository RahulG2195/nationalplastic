import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const csr_committee = await query({
      query: "SELECT * FROM csr_committee",
      values: [],
    });

    const csr_pdfs = await query({
      query: "SELECT * FROM csr_pdfs",
      values: [],
    });
    return new Response(
      JSON.stringify({
        success: true,
        members: csr_committee,
        pdfs: csr_pdfs,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
