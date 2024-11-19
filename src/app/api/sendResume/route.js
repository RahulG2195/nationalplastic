import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

export async function POST(req) {
  try {
    // Parse form data using NextRequest.formData()
    const data = await req.formData();
    
    // Extract file first
    const file = data.get("file");
    if (!file) {
      return NextResponse.json({ success: false, error: "No Resume Found." });
    }

    // Extract other form fields
    const { FullName, email, JobProfile, MobileNumber } = Object.fromEntries(
      data.entries()
    );

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create HTML email content for the candidate
    const candidateHtmlFormat = `
      <p>Hello ${FullName},</p>
      <p>Thank you for applying to National Plastic. We have received your application for the following position:</p>
      <p>Position: ${JobProfile}</p>
      <p>Your Details:</p>
      <ul>
        <li>Name: ${FullName}</li>
        <li>Email: ${email}</li>
        <li>Contact Number: ${MobileNumber}</li>
      </ul>
      <p>We will review your application and get back to you soon.</p>
      <p>Best Regards,</p>
      <p>National Plastic HR Team</p>
    `;

    // Create HTML email content for the admin
    const adminHtmlFormat = `
      <p>New Job Application Received</p>
      <p>Candidate Details:</p>
      <ul>
        <li>Name: ${FullName}</li>
        <li>Email: ${email}</li>
        <li>Position Applied: ${JobProfile}</li>
        <li>Contact Number: ${MobileNumber}</li>
      </ul>
      <p>Please find the candidate's resume attached.</p>
    `;

    // Prepare email options for candidate
    const candidateEmailOptions = {
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: email,
      subject: `Application Received: ${JobProfile} Position`,
      html: candidateHtmlFormat,
    };

    // Prepare email options for admin
    const adminEmailOptions = {
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: adminEmail,
      subject: `New Job Application: ${JobProfile} - ${FullName}`,
      html: adminHtmlFormat,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    };

    // Send confirmation email to candidate
    await resend.emails.send(candidateEmailOptions);
    
    // Send notification email to admin
    await resend.emails.send(adminEmailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Application submitted successfully" 
    });

  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process application" 
    });
  }
}