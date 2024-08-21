import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request, res) {
  try {
    const data = await request.formData();
    const email = data.get("email");
    const resetToken = data.get("resetToken");
    const url = "https://nationalplastic.com/new-password/1?resetToken=" + resetToken;

    // Create HTML email content dynamically for personalization
    const HtmlFormat = `
    <p>Hello,</p>
    <p>You have requested to reset your password.</p>
    <p>Please follow the link below to reset your password:</p>
    <p><a href="${url}">Reset Password</a></p>
    <p>If you didn't request a password reset, you can ignore this email.</p>
    <p>Regards,</p>
    <p>Your Team</p>
    `;

    const info = await resend.emails.send({
      from: 'nationalplastic.com', // Replace with your verified domain
      to: email,
      subject: "Reset - Password",
      html: HtmlFormat,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}