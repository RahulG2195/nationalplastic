import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEMail = process.env.ADMIN_EMAIL;

export async function POST(req) {
  try {
    // Parse form data using NextRequest.formData()
    const data = await req.formData();

    // Extract form fields
    const { name, email, message, reason, mobile } = Object.fromEntries(
      data.entries()
    );

    // Create HTML email content for the client
    const clientHtmlFormat = `
      <p>Hello ${name},</p>
      <p>You have contacted us with the following details:</p>
      <p>Reason for Contact: ${reason}</p>
      <p>Message: ${message}</p>
      <p>Contact Number: ${mobile}</p>
      <p>Regards,</p>
      <p>National Plastic.</p>
    `;

    // Create HTML email content for the website owner
    const ownerHtmlFormat = `
      <p>New client submission:</p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Reason for Contact: ${reason}</p>
      <p>Message: ${message}</p>
      <p>Contact Number: ${mobile}</p>
    `;

    // Prepare email options for client
    const clientEmailOptions = {
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: email,
      subject: `Re: ${reason}`,
      html: clientHtmlFormat,
    };

    // Prepare email options for website owner
    const ownerEmailOptions = {
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: adminEMail,
      subject: 'General Inquiry',
      html: ownerHtmlFormat,
    };

    // Check if a file was uploaded
    const file = data.get("file");
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Add attachment to client email options if file exists
      clientEmailOptions.attachments = [
        {
          filename: file.name,
          content: buffer,
        },
      ];

      // Add attachment to owner email options
      ownerEmailOptions.attachments = [
        {
          filename: file.name,
          content: buffer,
        },
      ];
    }

    // Send email to client
    await resend.emails.send(clientEmailOptions);

    // Send email to website owner
    await resend.emails.send(ownerEmailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}