// lib/nodemailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "webDevs2024@gmail.com",
      pass: "fkbt nnro yfnk ngmc", // Replace with your Gmail App Password (not account password)
    },
  });

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: "webDevs2024@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
