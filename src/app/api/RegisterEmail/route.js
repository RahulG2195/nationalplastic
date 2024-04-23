// WOKRS perfect;y from postman

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { Email } from "@mui/icons-material";

export async function POST(request, res) {
  try {
    const { firstName, lastName, email, phone } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "webDevs2024@gmail.com",
        pass: "kppr tbup pqne eirr", // Replace with your Gmail App Password (not account password)
      },
    });

    // Create HTML email content dynamically for personalization
    const userEmailTemplate = `
    <h2>Dear ${firstName} ${lastName},</h2>
    <p>Congratulations on a successful login to our platform!</p>
    <p>We're excited to have you on board and look forward to providing you with our top-notch services.</p>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
    <p>Thank you for choosing our platform!</p>
    <p>Best regards,</p>
    <p>National PLastic Team</p>
    `;
    const clientEmailTemplate = `
    <h2>Notification: New User Registration</h2>
    <p>We would like to inform you that a new user has registered with us.</p>
    <p>Here are the registration details:</p>
    <ul>
    <li><strong>User Name:</strong> ${firstName} ${lastName}</li>
    <li><strong>Email:</strong> ${email || Email} </li>
    <li><strong>phone Number:</strong> ${phone} </li>
    </ul>
    <p>If you have any questions or need further information, please do not hesitate to contact us.</p>
    <p>Thank you for your attention!</p>
    <p>Sincerely,</p>
    <p>The [Your Business Name] Team</p>
     `;

    // Attach the file content as base64 encoded string if file exists
    // Send email with attachment (if a file was uploaded)
    const user = await transporter.sendMail({
      from: "webDevs2024@gmail.com", // Consider using a more descriptive sender address
      to: "webDevs2024@gmail.com",
      subject: "New user Registered", // Using the reason as the subject
      html: clientEmailTemplate,
    });
    const client = await transporter.sendMail({
      from: "webDevs2024@gmail.com", // Consider using a more descriptive sender address
      to: email || Email,
      subject: "Registration Sucessfull", // Using the reason as the subject
      html: userEmailTemplate,
    });

    // console.log("Email sent successfully!", user);
    // console.log("Email sent successfully!", client);

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "webDevs2024@gmail.com",
        pass: "kppr tbup pqne eirr", // Replace with your Gmail App Password (not account password)
      },
    });

    // Create HTML email content dynamically for personalization
    const userEmailTemplate = `
    <h2>Hello,</h2>
    <p>Thank you for your payment! Your payment for ${description} was successful.</p>
    <p>Amount Paid: ${amount} ${currency}</p>
    <p>status: ${status}</p>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
    <p>Thank you for choosing our platform!</p>
    <p>Best regards,</p>
    <p>National PLastic Team</p>
    `;
    const clientEmailTemplate = `
    <h2>Hello,</h2>
    <p>Here are your order details:</p>
    <p>status: ${status}</p>
    <p>Order ID: ${order_id}</p>
    <p>payment ID: ${id}</p>
    <p>Description: ${description}</p>
    <p>Payment Method: ${method}</p>
    <p>bank: ${bank}</p>
    <p>Amount Paid: ${currency}${amount}</p>
    <p>Contact Number: ${contact} </p>
    `;

    // Send email to the user
    const user = await transporter.sendMail({
      from: "webDevs2024@gmail.com",
      to: email,
      subject: "Payment Successful",
      html: userEmailTemplate,
    });

    const client = await transporter.sendMail({
      from: "webDevs2024@gmail.com",
      to: "webDevs2024@gmail.com",
      subject: "Product Order Details",
      html: clientEmailTemplate,
    });
    console.log("c", client);
    console.log("u ", user);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email sending failed" });
  }
}
