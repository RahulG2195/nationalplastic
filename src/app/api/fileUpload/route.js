import { NextRequest, NextResponse } from "next/server";
export async function POST(NextRequest) {
  const data = await NextRequest.formData();

  return NextResponse.json({ success: true });
}
