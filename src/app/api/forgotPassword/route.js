import { query } from "@/lib/db"; // Assuming 'your-database-module' is the correct path to your database module
// const router = useRouter();
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const data = await request.formData();
  const email = data.get("email");
  const existingUser = await query({
    query: "SELECT * FROM customer WHERE email = ?",
    values: [email],
  });
  if (existingUser.length > 0) {
    return NextResponse.json({ success: true, message: "Valid Email" });
  } else {
    return NextResponse.json({
      success: false,
      message: "Email Not registered",
    });
  }
}
export async function PUT(request) {
  const data = await request.formData();
  const Password = data.get("password");
  const resetEmail = data.get("resetEmail" || "email");
  const hashedPassword = await bcrypt.hash(Password, 12);

  try {
    const result = await query({
      query: "UPDATE customer SET Password = ?  WHERE Email = ?;",
      values: [hashedPassword, resetEmail],
    });

    if (result.affectedRows > 0) {
      return new Response(JSON.stringify({ message: "Changed Password" }), {
        status: 200,
      });
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
