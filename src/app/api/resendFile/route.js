import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import upload from "@/utils/multer.middleware";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEMail = process.env.ADMIN_EMAIL;
export async function POST(req, res) {
  try {
    // Parse form data using NextRequest.formData()
    const data = await req.formData();

    // Extract files and other form data
    const productImage = data.get("productImage");
    const damageImage = data.get("damageImage");

    if (!productImage || !damageImage) {
      return NextResponse.json({ success: false, error: "Missing required images" });
    }
try{
    await upload.single(productImage);
    await upload.single(damageImage);
}catch(error){
  console.log("Error uploading damage image ");
}

    // Save files
    const productImagePath = `./public/Assets/uploads/${productImage.name}`;
    const damageImagePath = `./public/Assets/uploads/${damageImage.name}`;

    await writeFile(productImagePath, Buffer.from(await productImage.arrayBuffer()));
    await writeFile(damageImagePath, Buffer.from(await damageImage.arrayBuffer()));

    // Extract other form fields
    const { reason, productId, customerId, orderId } = Object.fromEntries(data.entries());

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
    const productImageContent = await readFile(productImagePath);
    const damageImageContent = await readFile(damageImagePath);

    // Send email with attachments using Resend
    const info = await resend.emails.send({
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: adminEMail, // Replace with the appropriate email address
      subject: `Product Return Request - Order ${orderId}`,
      html: HtmlFormat,
      attachments: [
        {
          filename: productImage.name,
          content: productImageContent,
        },
        {
          filename: damageImage.name,
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