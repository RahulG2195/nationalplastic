import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const disclosures = await query({
      query: "SELECT * FROM disclosures ORDER BY year DESC, quarter ASC",
      values: [],
    });

    const groupedDisclosures = disclosures.reduce((acc, disclosure) => {
      const key = disclosure.year;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(disclosure);
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
