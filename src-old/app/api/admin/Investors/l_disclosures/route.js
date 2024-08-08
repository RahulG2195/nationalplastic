import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const disclosures = await query({
      query: "SELECT * FROM disclosures ORDER BY year DESC, quarter ASC",
      values: [],
    });

    // Group disclosures by year
    const groupedDisclosures = disclosures.reduce((acc, disclosure) => {
      if (!acc[disclosure.year]) {
        acc[disclosure.year] = {
          year: disclosure.year,
          quarter1: [],
          quarter2: [],
          quarter3: [],
          quarter4: [],
        };
      }
      acc[disclosure.year][`quarter${disclosure.quarter}`].push({
        text: disclosure.document_type,
        url: disclosure.document_url,
      });
      return acc;
    }, {});

    return new Response(
      JSON.stringify({
        status: 200,
        disclosures: Object.values(groupedDisclosures),
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
}