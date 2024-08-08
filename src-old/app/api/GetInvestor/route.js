import { query } from "@/lib/db";

export async function POST(request) {
  try {
    let { type } = await request.json();
    let results = "";

    if (type == "unaudited") {
      results = await query({
        query: `SELECT 
                years,
                MAX(CASE WHEN quarter = 'Q1' THEN JSON_OBJECT('title', title, 'file_name', file_name) END) as Q1,
                MAX(CASE WHEN quarter = 'Q2' THEN JSON_OBJECT('title', title, 'file_name', file_name) END) as Q2,
                MAX(CASE WHEN quarter = 'Q3' THEN JSON_OBJECT('title', title, 'file_name', file_name) END) as Q3
            FROM 
                unaudited
            WHERE 
                status = 1
            GROUP BY 
                years
            ORDER BY 
                years DESC;`,
      });
    } else if (type == "audited") {
      results = await query({
        query: `SELECT * FROM audited where status = 1`,
      });
    } else if (type == "report") {
      results = await query({
        query: `SELECT * FROM annual_report_return where cat_name = 'Annual Report' AND status = 1`,
      });
    } else if (type == "returns") {
      results = await query({
        query: `SELECT * FROM annual_report_return where cat_name = 'Annual Return' AND status = 1`,
      });
    } else if (type == "outcome") {
      results = await query({
        query: `SELECT years, GROUP_CONCAT( JSON_OBJECT( 'title', title, 'file_name', file_name ) ) AS documents FROM outcomes GROUP BY years ORDER BY years DESC;`,
      });
    }else if (type == "notice") {
      results = await query({
        query: `SELECT years, GROUP_CONCAT( JSON_OBJECT( 'title', title, 'file_name', file_name ) ) AS documents FROM notice GROUP BY years ORDER BY years DESC;`,
      });
    }else if (type == "transfer") {
      results = await query({
        query: `SELECT years, GROUP_CONCAT( JSON_OBJECT( 'title', title, 'file_name', file_name ) ) AS documents FROM transfer GROUP BY years ORDER BY years DESC;`,
      });
    }

    return new Response(
      JSON.stringify(
        {
          results: results,
        },
        { status: 200 }
      )
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, message: e.message }),
      { status: 500 }
    );
  }
}
