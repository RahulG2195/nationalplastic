import { query } from "@/lib/db";

export async function request) {
  try {
    const pageContentQuery = "SELECT * FROM awards_page WHERE content_type = 'page_content' LIMIT 1";
    const certificatesQuery = "SELECT * FROM awards_page WHERE content_type = 'certificate' ORDER BY display_order";

    const pageContent = await query({
      query: pageContentQuery,
      values: [],
    });

    const certificates = await query({
      query: certificatesQuery,
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        pageContent: pageContent,
        certificates: certificates,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message
      })
    );
  }
}