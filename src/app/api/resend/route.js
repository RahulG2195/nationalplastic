// pages/api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEMail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export async function POST(req, res) {
  try {
    const requestData = await req.json();
    const { to, subject, htmlContent } = requestData;
    console.log("adminEmail", adminEMail)

    const info = await resend.emails.send({
      from: 'National Plastic <noreply@nationalplastic.com>',
      to: to,
      subject: subject,
      html: htmlContent,
    });
    console.log("Sent" + JSON.stringify(info));

    return new Response(
      JSON.stringify({
        status: 200,
      })
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
} 
