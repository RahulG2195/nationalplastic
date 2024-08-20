import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { fullName, Email, ProductName, Mobile, Requirements, city } = await request.json();

    // HTML content for customer email
    const customerHtmlContent = `
    <h2>Dear ${fullName},</h2>
    <p>Thank you for your bulk order request from ${city}!</p>
    <p>We have received your order details for the following items:</p>
    <ul>
      <li><strong>Product Name:</strong> ${ProductName}</li>
      ${Mobile ? `<li><strong>Mobile Number:</strong> ${Mobile}</li>` : ''}
      <li><strong>Requirements:</strong> ${Requirements}</li>
    </ul>
    <p>Our team will review your order and contact you shortly to confirm details and provide an estimated delivery timeframe.</p>
    <p>In the meantime, you can reach us at (Your Business Phone Number) or reply to this email if you have any questions.</p>
    <p>Thank you for your business!</p>
    <p>Sincerely,</p>
    <p>The National Plastic Team</p>
    `;

    // HTML content for client email
    const clientHtmlContent = `
    <h2>New Bulk Order Request</h2>
    <p>A new bulk order request has been received with the following details:</p>
    <ul>
      <li><strong>Customer Name:</strong> ${fullName}</li>
      <li><strong>Customer Email:</strong> ${Email}</li>
      <li><strong>Product Name:</strong> ${ProductName}</li>
      ${Mobile ? `<li><strong>Mobile Number:</strong> ${Mobile}</li>` : ''}
      <li><strong>Requirements:</strong> ${Requirements}</li>
      <li><strong>City:</strong> ${city}</li>
    </ul>
    <p>Please review this order and follow up with the customer as soon as possible.</p>
    `;

    // Send email to customer
    await resend.emails.send({
      from: 'nationalplastic.com', // Replace with your verified domain
      to: Email,
      subject: "Bulk Order Request Confirmation",
      html: customerHtmlContent,
    });

    // Send email to client (your company)
    await resend.emails.send({
      from: 'nationalplastic.com', // Replace with your verified domain
      to: 'your-company-email@example.com', // Replace with your company's email
      subject: "New Bulk Order Request",
      html: clientHtmlContent,
    });

    return NextResponse.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}