// WOKRS perfect;y from postman

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request, res) {
  try {
    const { fullName, Email, ProductName, Mobile, Requirements, city } =
      await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "webDevs2024@gmail.com",
        pass: "fkbt nnro yfnk ngmc", // Replace with your Gmail App Password (not account password)
      },
    });

    // Create HTML email content dynamically for personalization
    const HtmlFormat = `
    <h2>Dear ${fullName},</h2>
  <p>Thank you for your bulk order request from ${city}!!</p>
  <p>We have received your order details for the following items:</p>
  <ul>
    <li><strong>Product Name:</strong> ${ProductName}</li>
    <li><strong>Mobile Number:</strong> ${Mobile} (optional: Include only if provided)</li>
    <li><strong>Requirements:</strong> ${Requirements}</li>
  </ul>
  <p>Our team will review your order and contact you shortly to confirm details and provide an estimated delivery timeframe.</p>
  <p>In the meantime, you can reach us at (Your Business Phone Number) or reply to this email if you have any questions.</p>
  <p>Thank you for your business!</p>
  <p>Sincerely,</p>
  <p>The National PLastic Team</p>
  `;

    // Attach the file content as base64 encoded string if file exists
    // Send email with attachment (if a file was uploaded)
    const info = await transporter.sendMail({
      from: "webDevs2024@gmail.com", // Consider using a more descriptive sender address
      to: Email,
      subject: "Bulk Order", // Using the reason as the subject
      html: HtmlFormat,
    });

    // console.log("Email sent successfully!", info);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}
