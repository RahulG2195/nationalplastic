// pages/api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
    try {
      const requestData = await req.json();
      const { to, subject, text } = requestData;
      const data = await resend.emails.send({
        from: 'nationalplastic.com', // Replace with your verified domain
        to,
        subject,
        text,
      });

      return new Response(
        JSON.stringify({
          status: 200,
          data: data,
        })
      );
    } catch (error) {
      console.error('Error sending email:', error);
      return new Response(
        JSON.stringify({
          status: 500,
          message:error.message,
        })
      );
    }
  } 
