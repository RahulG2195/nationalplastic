
import { sendMail } from '@/utils/mailOtp';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ status: 400, message: 'Email is required' }),
        { status: 400 }
      );
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // OTP valid for 15 minutes

    const mailText = `Your OTP is ${otp}. It is valid for the next 15 minutes.`;
    await sendMail(email, 'Your OTP Code', mailText);

    return new Response(
      JSON.stringify({ status: 200, otp, otpExpiry, message: 'OTP sent successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 500, error: error.message }),
      { status: 500 }
    );
  }
}
