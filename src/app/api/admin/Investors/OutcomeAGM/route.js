import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import { uploadFile } from "@/utils/fileUploader";
const path = require("path");

export async function POST(request) {
  const formData = await request.formData();
  const financial_year = formData.get("financial_year");
  const notice_type = formData.get("notice_type");
  const notice_title = formData.get("notice_title");
  const file = formData.get("file");

  let filePath = "";
  if (file) {
    try {
      const toLowerCase = await uploadFile(file);
      filePath = toLowerCase;
    } catch (error) {
      console.error("File upload error:", error);
      return NextResponse.json(
        { message: "Error saving file" },
        { status: 500 }
      );
    }
  }

  try {
    await query({
      query: `INSERT INTO OutcomeAGM (financial_year, notice_type, notice_title, file_path) VALUES (?, ?, ?, ?)`,
      values: [financial_year, notice_type, notice_title, filePath],
    });

    return NextResponse.json(
      { message: "OutcomeAGM added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const financial_year = formData.get("financial_year");
  const notice_type = formData.get("notice_type");
  const notice_title = formData.get("notice_title");
  const file = formData.get("file");

  let filePath = "";
  if (file) {
    try {
      const toLowerCase = await uploadFile(file);
      filePath = toLowerCase;
    } catch (error) {
      console.error("File upload error:", error);
      return NextResponse.json(
        { message: "Error saving file" },
        { status: 500 }
      );
    }
  }

  try {
    let updateQuery = `
      UPDATE OutcomeAGM 
      SET financial_year = ?, notice_type = ?, notice_title = ?
    `;
    let values = [financial_year, notice_type, notice_title];

    if (filePath) {
      updateQuery += `, file_path = ?`;
      values.push(filePath);
    }

    updateQuery += ` WHERE id = ?`;
    values.push(id);

    await query({
      query: updateQuery,
      values: values,
    });

    return NextResponse.json(
      { message: "OutcomeAGM updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const outcomeAGMData = await query({
      query: `SELECT * FROM OutcomeAGM ORDER BY CAST(SUBSTRING(financial_year, 1, 4) AS SIGNED) DESC,
         CAST(SUBSTRING(financial_year, 6, 4) AS SIGNED) DESC,
         id DESC`,
    });

    return NextResponse.json({ outcomeAGMData: outcomeAGMData });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "ID is required.",
        })
      );
    }

    const deleteOutcomeAGM = await query({
      query: "DELETE FROM OutcomeAGM WHERE id = ?",
      values: [id],
    });

    const result = deleteOutcomeAGM.affectedRows;
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
