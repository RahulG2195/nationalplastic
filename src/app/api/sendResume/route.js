import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import upload from "@/utils/multer.middleware";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  try {
    // Parse form data using NextRequest.formData()
    const data = await req.formData();

    // Extract file and other form data
    const file = data.get("file");
    upload.single(file);

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_UPLOAD_PATH_DIR}/${file.name}`;
    await writeFile(path, buffer);

    // Extract other form fields
    const { FullName, email, JobProfile, MobileNumber } = Object.fromEntries(
      data.entries()
    );

    // Create HTML email content dynamically for personalization
    const HtmlFormat = `
      <p>Hello ${FullName},</p>
      <p>You have contacted us with the following details:</p>
      <p>Reason for Contact: JOB </p> 
      <p>Message: JOB CANDIDATE </p>
      <p>Contact Number: ${MobileNumber}</p>
      <p>Regards,</p>
      <p>${FullName}</p>
    `;

    // Read the file content
    const fileContent = await readFile(path);

    // Send email with attachment using Resend
    const info = await resend.emails.send({
      from: 'Your Company <onboarding@resend.dev>', // Replace with your verified domain
      to: email,
      subject: JobProfile,
      html: HtmlFormat,
      attachments: [
        {
          filename: file.name,
          content: fileContent,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}