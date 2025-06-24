import { query } from "@/lib/db";
import { NextResponse } from 'next/server';
import { uploadFile } from "@/utils/fileUploader";

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const file = formData.get('file_name');

  if (!name || !file) {
    return NextResponse.json({ message: "Name and file are required." }, { status: 400 });
  }

  try {
    const uploadedFileName = await uploadFile(file); // Save the file
    await query({
      query: "INSERT INTO csr_pdfs (name, file_name) VALUES (?, ?)",
      values: [name, uploadedFileName],
    });

    return NextResponse.json({ message: "PDF added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const results = await query({ query: "SELECT * FROM csr_pdfs ORDER BY id DESC" });
    return NextResponse.json({ data: results });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

  try {
    await query({ query: "DELETE FROM csr_pdfs WHERE id = ?", values: [id] });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
// -combining frontend and backend code for Teams automation - 4
// 
export async function PUT(request) {
  const formData = await request.formData();
  const id = formData.get('id');
  const name = formData.get('name');
  const file = formData.get('file_name'); // May be null

  if (!id || !name) {
    return NextResponse.json({ message: "ID and name are required." }, { status: 400 });
  }

  try {
    let queryStr = "UPDATE csr_pdfs SET name = ?";
    const values = [name];

    if (file && file.name) {
      const uploadedFileName = await uploadFile(file);
      queryStr += ", file_name = ?";
      values.push(uploadedFileName);
    }

    queryStr += " WHERE id = ?";
    values.push(id);

    await query({
      query: queryStr,
      values,
    });

    return NextResponse.json({ message: "PDF updated successfully" });
  } catch (error) {
    console.error("Error updating PDF:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
