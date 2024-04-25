import { query } from "@/lib/db"; // Assuming 'your-database-module' is the correct path to your database module
import "../../../../envConfig.js";

export async function GET(request) {
  try {
    const users = await query({
      query: "SELECT * FROM customer",
      values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}

export async function POST(request) {
  try {
    const { Id, Phone, Address } = await request.json();
    let result;
    if (Phone && Address) {
      result = await query({
        query:
          "UPDATE customer SET Phone = ?, Address = ? WHERE customer_id = ?;",
        values: [Phone, Address, Id],
      });
    } else if (Phone) {
      result = await query({
        query: "UPDATE customer SET Phone = ?  WHERE customer_id = ?;",
        values: [Phone, Id],
      });
    } else if (Address) {
      result = await query({
        query: "UPDATE customer SET Address = ?  WHERE customer_id = ?;",
        values: [Address, Id],
      });
    } else {
      return new Response(JSON.stringify({ message: "No Data To update" }), {
        status: 500,
      });
    }

    if (result.affectedRows > 0) {
      return new Response(JSON.stringify({ message: result }), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to register user" }),
        { status: 500 }
      );
    }
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
    //Address Spelling is wrong but it works properly
    const { Adress2, Id } = await request.json();
    const result = await query({
      query: "UPDATE customer SET Adress2 = ? WHERE customer_id = ?;",
      values: [Adress2, Id],
    });
    const daata = process.env.RAZORPAY_KEY_ID;
    const ds = process.env.RAZORPAY_SUBCRIPTION_ID;

    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ message: "Added Address successfullu" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to Add Address" }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}
