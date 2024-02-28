import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
// import { NextApiRequest, NextApiResponse } from "next";
export async function POST(req) {
   const data =  await req.json();
  console.log("INside-------------------------- handler");
    console.log("INside------------------------");
    console.log(data)
    console.log(JSON.stringify(data));

  const { name, email, message, reason, mobile } = data;
  console.log("WHYYYYY")
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "webDevs2024@gmail.com",
        pass: "kppr tbup pqne eirr"     // Replace with your Gmail app password (not your account password)
    }
  });
  console.log("WHYYYYY2")
  // Send mail with defined transport object
  // transporter.on("debug", (info) => {
  //   console.log(info);
  // });
  const HtmlFormat = `<p>Hello,</p>
  <p>${name} has contacted.</p>
  <p>Reason for Contact: ${reason}</p>
  <p>Message: ${message}</p>
  <p>Contact Number: ${mobile} </p>
  <p> Regards, </p>
  <p> Web Developer </p>
  `;
  console.log("why#");
  
  await new Promise((resolve, reject) => {
     transporter.sendMail({
      from: "webDevs2024@gmail.com", // Consider using a more descriptive sender address
      to: email,
      subject: reason,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nmobileNumber: ${mobile}`
    html: HtmlFormat
    },(err, info) => {
        if (err) {
  
            //  return res.status(500).json({ error: err.message });
            console.log("err"+err.message)
             return NextResponse.json({ message: "Failed to send email", success: false, status: 500 });
            console.log(err)

          } else {
            console.log("INFO"+JSON.stringify(info))
            return NextResponse.json({ message: "sended email", success: true, status: 200 });
          }
    }
    );
    
 
  })
};

