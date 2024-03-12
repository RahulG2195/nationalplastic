import { query } from "@/lib/db"; // Assuming 'your-database-module' is the correct path to your database module
// const router = useRouter();
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const email = data.get("email");
  const existingUser = await query({
    query: "SELECT * FROM Customer WHERE email = ?",
    values: [email],
  });
  if (existingUser.length > 0) {
    console.log("Email");

    return NextResponse.json({ success: true, message: "Valid Email" });
  } else {
    return NextResponse.json({
      success: false,
      message: "Email Not registered",
    });
  }
}
