//WOKRS perfect;y from postman

// import nodemailer from "nodemailer";
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from "fs/promises";

// import upload from "@/utils/multer.middleware";
// export async function POST(req, res) {
//   try {
//     // Parse form data using NextRequest.formData()
//     const data = await req.formData();

//     // Extract file and other form data
//     // const file = data.get("file");
//     const file = data.get("file");
//     upload.single(file);

//     if (!file) {
//       return NextResponse.json({ success: false });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const path = `./uploads/${file.name}`;
//     await writeFile(path, buffer);
//     //console.log(`open ${path} to see the uploaded file`);

//     // Extract other form fields
//     const { name, email, message, reason, mobile } = Object.fromEntries(
//       data.entries()
//     );

//     // Create a Nodemailer transporter using SMTP
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "webDevs2024@gmail.com",
//         pass: "kppr tbup pqne eirr", // Replace with your Gmail App Password (not account password)
//       },
//     });

//     // Create HTML email content dynamically for personalization
//     const HtmlFormat = `
//       <p>Hello ${name},</p>
//       <p>You have contacted us with the following details:</p>
//       <p>Reason for Contact: ${reason}</p>
//       <p>Message: ${message}</p>
//       <p>Contact Number: ${mobile}</p>
//       <p>Regards,</p>
//       <p>Web Developer</p>
//     `;

//     // Attach the file content as base64 encoded string if file exists
//     // Send email with attachment (if a file was uploaded)
//     const info = await transporter.sendMail({
//       from: "webDevs2024@gmail.com", // Consider using a more descriptive sender address
//       to: "dineshndr02@gmail.com",
//       subject: reason, // Using the reason as the subject
//       html: HtmlFormat,
//       attachments: [
//         {
//           filename: file.name, // Name of the attachment
//           path: path, // Path to the attachment
//         },
//       ], // Attachments array with conditional file attachment
//     });

//     //console.log("Email sent successfully!", info);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return NextResponse.json({ success: false, error: "Email sending failed" });
//   }
// }
