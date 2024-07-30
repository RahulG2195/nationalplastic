import { query } from "@/lib/db";

export async function DELETE(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    
    await query({
      query: "DELETE FROM disclosures WHERE id = ?",
      values: [id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Disclosure deleted successfully",
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


export async function POST(request) {
  try {
    const formData = await request.formData();
    const year = formData.get('year');
    const quarter = formData.get('quarter');
    const document_type = formData.get('document_type');
    const document_url = formData.get('document_url');

    const result = await query({
      query: "INSERT INTO disclosures (year, quarter, document_type, document_url) VALUES (?, ?, ?, ?)",
      values: [year, quarter, document_type, document_url],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Disclosure added successfully",
        id: result.insertId,
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

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const year = formData.get('year');
    const quarter = formData.get('quarter');
    const document_type = formData.get('document_type');
    const document_url = formData.get('document_url');

    await query({
      query: "UPDATE disclosures SET year = ?, quarter = ?, document_type = ?, document_url = ? WHERE id = ?",
      values: [year, quarter, document_type, document_url, id],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        message: "Disclosure updated successfully",
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
