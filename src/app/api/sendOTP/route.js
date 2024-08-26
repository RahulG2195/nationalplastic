import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEMail = process.env.ADMIN_EMAIL;
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // OTP valid for 15 minutes

    // Create HTML email content
    const htmlContent = `
    <p>Hello,</p>
    <p>Your OTP is <strong>${otp}</strong>.</p>
    <p>It is valid for the next 15 minutes.</p>
    <p>If you didn't request this OTP, please ignore this email.</p>
    <p>Regards,</p>
    <p>Your Team</p>
    `;

    const info = await resend.emails.send({
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: email,
      subject: "Your OTP Code",
      html: htmlContent,
    });
    console.log("info", JSON.stringify(info));
    return NextResponse.json({
      success: true,
      otp,
      otpExpiry,
      message: 'OTP sent successfully'
    }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      error: "Email sending failed"
    }, { status: 500 });
  }
}