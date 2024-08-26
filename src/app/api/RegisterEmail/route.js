import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEMail = process.env.ADMIN_EMAIL;
export async function POST(request, res) {
  try {
    const { firstName, lastName, email, phone } = await request.json();

    // Create HTML email content dynamically for personalization
    const userEmailTemplate = `
    <h2>Dear ${firstName} ${lastName},</h2>
    <p>Congratulations on a successful login to our platform!</p>
    <p>We're excited to have you on board and look forward to providing you with our top-notch services.</p>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
    <p>Thank you for choosing our platform!</p>
    <p>Best regards,</p>
    <p>National Plastic Team</p>
    `;

    const data = await resend.emails.send({
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: email,
      subject: "Registration Successful",
      html: userEmailTemplate,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}



export async function PUT(request, res) {
  try {
    const data = await request.json();
    const {
      id,
      contact,
      email,
      bank,
      description,
      method,
      order_id,
      currency = "INR",
      amount,
      status,
    } = data;

    // Create HTML email content dynamically for personalization
    const userEmailTemplate = `
    <h2>Hello,</h2>
    <p>Thank you for your payment! Your payment for ${description} was successful.</p>
    <p>Amount Paid: ${amount} ${currency}</p>
    <p>Status: ${status}</p>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
    <p>Thank you for choosing our platform!</p>
    <p>Best regards,</p>
    <p>National Plastic Team</p>
    `;

    const clientEmailTemplate = `
    <h2>Hello,</h2>
    <p>Here are your order details:</p>
    <p>Status: ${status}</p>
    <p>Order ID: ${order_id}</p>
    <p>Payment ID: ${id}</p>
    <p>Description: ${description}</p>
    <p>Payment Method: ${method}</p>
    <p>Bank: ${bank}</p>
    <p>Amount Paid: ${currency}${amount}</p>
    <p>Contact Number: ${contact} </p>
    `;

    // Send email to the user
    await resend.emails.send({
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: email,
      subject: "Payment Successful",
      html: userEmailTemplate,
    });

    // Send email to the client (your company)
    await resend.emails.send({
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: adminEMail, // Your company email
      subject: "Product Order Details",
      html: clientEmailTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}