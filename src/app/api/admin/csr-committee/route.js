import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await query({ query: "SELECT * FROM csr_committee ORDER BY id ASC" });
    return NextResponse.json({ data: results });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  const { full_name, position, member_type } = await request.json();
  if (!full_name || !position || !member_type) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    await query({
      query: "INSERT INTO csr_committee (full_name, position, member_type) VALUES (?, ?, ?)",
      values: [full_name, position, member_type],
    });

    return NextResponse.json({ message: "Committee member added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  const { id, full_name, position, member_type } = await request.json();
  if (!id || !full_name || !position || !member_type) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    await query({
      query: "UPDATE csr_committee SET full_name = ?, position = ?, member_type = ? WHERE id = ?",
      values: [full_name, position, member_type, id],
    });

    return NextResponse.json({ message: "Committee member updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

  try {
    await query({ query: "DELETE FROM csr_committee WHERE id = ?", values: [id] });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
