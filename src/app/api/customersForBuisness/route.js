// Import the required modules
import { query } from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import "../../../../envConfig.js";
import {generateToken} from "@/utils/jwtAuth.js"
// Handler for GET request to fetch all customersimport { cookies } from 'next/headers';
// import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
const isAdmin = async (email) => {
  const user_data = await query({
    query: "SELECT role FROM customer WHERE email = ?",
    values: [email],
  });
  const role = user_data[0].role
  if(role === "admin") {
  const token = await generateToken({email: email , role: "admin"});
  cookies().set('token', token, { 
    maxAge: 60 * 60 * 24, // 1 day in seconds
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  });

  return token;
  }else{
  return false;
  }
  
}
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(
      JSON.stringify({
        status: 400,
        message: "Email query parameter is required",
      }),
      { status: 400 }
    );
  }

  try {
    const users = await query({
      query: "SELECT * FROM customer WHERE Email = ?",
      values: [email],
    });

    if (users.length === 0) {
      return new Response(
        JSON.stringify({
          status: 201,
          message: "User not found",
        }),
        { status: 201 }
      );
    }

    let data = JSON.stringify(users[0]);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}


export async function PATCH(request) {
  try {
    const { userEmail, companyName, gstNumber } = await request.json();
    if (!companyName || companyName.trim().length < 3 || companyName.trim().length > 50) {
      return new Response(
        JSON.stringify({ status: 400, message: "Invalid company name. It should be between 3 and 50 characters." }),
        { status: 200 }
      );
    }
    
    // Validation for gstNumber (assuming Indian GST format)
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstNumber || !gstRegex.test(gstNumber)) {
      return new Response(
        JSON.stringify({ status: 400, message: "Invalid GST number format." }),
        { status: 200 }
      );
    }
    await query({
      query: "UPDATE customer SET companyName = ?, gstNumber = ? WHERE Email = ?",
      values: [companyName, gstNumber, userEmail],
    });

    return new Response(
      JSON.stringify({ status: 201, message: "buisness data updated successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating buisness data:", error);
    return new Response(
      JSON.stringify({ status: 500, message: error.message }),
      { status: 500 }
    );
  }
}
