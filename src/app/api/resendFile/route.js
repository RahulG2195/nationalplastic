import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import upload from "@/utils/multer.middleware";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  try {
    // Parse form data using NextRequest.formData()
    console.log("Request object:", JSON.stringify(req, null, 2));
    const data = await req.formData();

    // Extract files and other form data
    const productImage = data.get("productImage");
    const damageImage = data.get("damageImage");
    const reason = data.get("reason");
    const productId = data.get("productId");
    const customerId = data.get("customerId");
    const orderId = data.get("orderId");

    // Use multer to handle file uploads
    await upload.fields([
      { name: 'productImage', maxCount: 1 },
      { name: 'damageImage', maxCount: 1 }
    ])(req, res);

    // Create HTML email content dynamically for personalization
    const HtmlFormat = `
      <p>Product Return Request</p>
      <p>Product ID: ${productId}</p>
      <p>Customer ID: ${customerId}</p>
      <p>Order ID: ${orderId}</p>
      <p>Reason for return: ${reason}</p>
      <p>Please find attached images of the product and the damaged part.</p>
    `;

    // Read the file contents
    const productImageContent = await readFile(productImage.path);
    const damageImageContent = await readFile(damageImage.path);

    // Send email with attachments using Resend
    const info = await resend.emails.send({
      from: 'Your Company <onboarding@resend.dev>', // Replace with your verified domain
      to: 'returns@yourcompany.com', // Replace with the appropriate email address
      subject: `Product Return Request - Order ${orderId}`,
      html: HtmlFormat,
      attachments: [
        {
          filename: 'product.jpg',
          content: productImageContent,
        },
        {
          filename: 'damage.jpg',
          content: damageImageContent,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing return request:", error);
    return NextResponse.json({ success: false, error: "Failed to process return request" });
  }
}