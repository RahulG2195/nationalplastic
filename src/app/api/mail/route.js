// WOKRS perfect;y from postman

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request, res) {
  try {
    const data = await request.formData();
    const email = data.get("email");
    const resetToken = data.get("resetToken");
    console.log("Inside MAil ResetToken: ", resetToken);
    const url = "`http://localhost:3000/new-password?resetToken=${resetToken}`";
    console.log("Inside MAil URL: ", url);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "webDevs2024@gmail.com",
        pass: "kppr tbup pqne eirr", // Replace with your Gmail App Password (not account password)
      },
    });

    // Create HTML email content dynamically for personalization
    const HtmlFormat = `
    <p>Hello,</p>
    <p>You have requested to reset your password.</p>
    <p>Please follow the link below to reset your password:</p>
    <p><a href="${url}">${url}</a></p>
    <p>If you didn't request a password reset, you can ignore this email.</p>
    <p>Regards,</p>
    <p>Your Team</p>
  `;

    // Attach the file content as base64 encoded string if file exists
    // Send email with attachment (if a file was uploaded)
    const info = await transporter.sendMail({
      from: "webDevs2024@gmail.com", // Consider using a more descriptive sender address
      to: email,
      subject: "Reset - Password", // Using the reason as the subject
      html: HtmlFormat,
    });

    console.log("Email sent successfully!", info);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}
