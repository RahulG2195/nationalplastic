import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const bulkOrderForm = await query({
      query: "SELECT * FROM bulkorderform",
      values: [],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        BulkOrderForm: bulkOrderForm,
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
  //console.log("first")
  try {
    const { fullName, Email, ProductName, Mobile, Requirements, city } =
      await request.json();
    console.log("FROM FORM DATA ", request);
    console.log("FROM FORM DATA ", JSON.stringify(request));
    console.log("FROM FORM DATA ", fullName);

    // Validate required fields
    if (
      !fullName ||
      !Email ||
      !ProductName ||
      !Mobile ||
      !Requirements ||
      !city
    ) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "All fields are required.",
        })
      );
    }

    // Execute database query
    const updateBulkOrderForm = await query({
      query:
        "INSERT INTO bulkorderform (fullName, Email, ProductName, Mobile, Requirements, City) VALUES (?, ?, ?, ?, ?, ?)",
      values: [fullName, Email, ProductName, Mobile, Requirements, city],
    });

    // Handle response
    const result = updateBulkOrderForm.affectedRows;
    const message = result ? "success" : "error";
    const bulkOrderForm = {
      fullName,
      Email,
      ProductName,
      Mobile,
      Requirements,
      city,
    };
    return new Response(
      JSON.stringify({
        BulkOrderForm: bulkOrderForm,
        status: 200,
        message: message,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}

export async function PUT(request) {
  try {
    const { id, fullName, Email, ProductName, Mobile, Requirements, city } =
      await request.json();

    // Validate required fields
    if (
      !id ||
      !fullName ||
      !Email ||
      !ProductName ||
      !Mobile ||
      !Requirements ||
      !city
    ) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "All fields are required.",
        })
      );
    }

    // Execute database query
    const updateBulkOrderForm = await query({
      query:
        "UPDATE bulkorderform SET fullName = ?, Email = ?, ProductName = ?, Mobile = ?, Requirements = ?, City = ? WHERE id = ?",
      values: [fullName, Email, ProductName, Mobile, Requirements, city, id],
    });

    // Handle response
    const result = updateBulkOrderForm.affectedRows;
    const message = result ? "success" : "error";

    return new Response(
      JSON.stringify({
        status: 200,
        message: message,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Validate required fields
    if (!id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "ID is required.",
        })
      );
    }

    // Execute database query
    const deleteBulkOrderForm = await query({
      query: "DELETE FROM bulkorderform WHERE id = ?",
      values: [id],
    });

    // Handle response
    const result = deleteBulkOrderForm.affectedRows;
    const message = result ? "success" : "error";

    return new Response(
      JSON.stringify({
        status: 200,
        message: message,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}
