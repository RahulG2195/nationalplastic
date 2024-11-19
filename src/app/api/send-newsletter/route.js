// pages/api/send-newsletter.js
import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Mock subscriber list - replace this with your actual data source
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req) {
  try {
    const { data, email } = await req.json();
    const { subject, content } = data;
    console.log("-------------------", subject, content, email);

    if (!subject || !content || !email || !Array.isArray(email)) {
      return NextResponse.json({ error: 'Subject, content, and email array are required' }, { status: 400 });
    }

    const results = [];
    for (const recipientEmail of email) {
      try {
        const data = await resend.emails.send({
          from: 'National Plastic <noreply@nationalplastic.com>',
          to: recipientEmail,
          subject: subject,
          html: content,
        });
        console.log("info", JSON.stringify(data));
        results.push({ email: recipientEmail, status: 'success', data });
      } catch (error) {
        console.error(`Failed to send to ${recipientEmail}:`, error);
        results.push({ email: recipientEmail, status: 'failed', error: error.message });
      }
      // Introduce a delay of 500ms between each request
      await delay(500);
    }

    console.log("info", JSON.stringify(results));
    const successCount = results.filter(r => r.status === 'success').length;
    const failureCount = results.filter(r => r.status === 'failed').length;

    return NextResponse.json({
      message: 'Newsletter sent',
      totalSent: email.length,
      successful: successCount,
      failed: failureCount,
      results
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to send newsletter:', error);
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 });
  }
}