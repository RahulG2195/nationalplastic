// 'use client'
// Import the required modules
// import { useRouter } from 'next/router';
import { query } from "@/lib/db"; // Assuming 'your-database-module' is the correct path to your database module
// const router = useRouter();
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { Response } from 'your-response-library'; // Assuming 'your-response-library' is the correct library for handling responses
import "../../../../envConfig.js";
import {generateToken} from "@/utils/jwtAuth.js"
// Define your API endpoint handler for GET request
// import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers';
// import { setCookie } from 'cookies-next';
const isAdmin = async (email) => {
  const user_data = await query({
    query: "SELECT role FROM customer WHERE email = ?",
    values: [email],
  });
  const role = user_data[0].role
  console.log(`Role ${role}`);
  if(role === "admin") {
  console.log(`Role ${role}`);
  const token = await generateToken({email: email , role: "admin"});
  cookies().set('auth', token, { 
    maxAge: 60 * 60 * 24, // 1 day in seconds
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  });

  console.log(`Token ${token}`);
  return token;
  }else{
  return false;
  }
  
}
export async function GET(request) {
  try {
    const users = await query({
      query: "SELECT * FROM customer",
      values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}

export async function POST(request) {
  try {
    // Extract data from the request JSON
    const { firstName, lastName, email, phone, address, password } =
      await request.json();

    // Check if the email already exists in the database
    const existingUser = await query({
      query: "SELECT * FROM customer WHERE Email = ?",
      values: [email],
    });

    // If the email already exists, return a 400 Bad Request response
    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // Execute database query to insert new user
    const result = await query({
      query:
        "INSERT INTO customer (FirstName, LasttName, Email, Phone, Address, Password) VALUES (?, ?, ?, ?, ?, ?)",
      values: [firstName, lastName, email, phone, address, hashedPassword],
    });

    // Check if the insertion was successful
    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ message: "Registration successful" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to register user" }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}

// Define your API endpoint handler for registration POST request
export async function PUT(request) {
  // const router = useRouter();
  try {

    const { email, password, getProfile } = await request.json();
    const existingUser = await query({
      query: "SELECT * FROM customer WHERE email = ?",
      values: [email],
    });
    if (existingUser.length > 0) {
      if (getProfile && existingUser.length > 0) {
        return new Response(
          JSON.stringify({
            status: 200,
            message: existingUser,
          })
        );
      }
      const storedPassword = existingUser[0].Password;
      const checkPassword = await bcrypt.compare(password, storedPassword);
      // let isItAdmin = false;
      if (checkPassword) { {
          const isItAdmin = await isAdmin(email)
    
          // Set the JWT token as an httpOnly cookie
         console.log('Setting JWT token', isItAdmin);
          if (!isItAdmin) {
          // const cookies = new Cookies(request);
          //   cookies.set('authToken', token, { httpOnly: true });
          //   console.log("----",isItAdmin)
          return new Response(
            JSON.stringify({
              status: 200,
              message: existingUser,
            })
          );
        }else{
          return new Response(
            JSON.stringify({
              status: 200,
              message: existingUser,
              isAdmin: isItAdmin
            })
          );
        }
      }
      } else {
        throw new Error("Invalid password");
      }
    } else {
      throw new Error("User not registered");
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}

export async function PATCH(request) {
  try {
    const { Id, newPassword, confirmPassword } = await request.json();

    if (!newPassword || !confirmPassword) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Missing required fields (newPassword, confirmPassword)",
        }),
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return new Response(
        JSON.stringify({ status: 400, message: "Passwords do not match" }),
        { status: 400 }
      );
    }
    // Validate required fields
    if (!Id) {
      return new Response(
        JSON.stringify({
          status: 401,
          message: "Unauthorized",
        }),
        { status: 400 }
      );
    }
    // Password validation (adjust requirements as needed)
    const passwordValidationRegex = /^(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    // Minimum 8 characters, at least 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character

    if (!passwordValidationRegex.test(newPassword)) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Password does not meet requirements",
        }),
        { status: 400 }
      );
    }
    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Adjust cost factor as needed

    // Update user password in the database
    await query({
      query: "UPDATE customer SET Password = ? WHERE customer_id = ?",
      values: [hashedPassword, Id],
    });

    return new Response(
      JSON.stringify({ status: 200, message: "Password updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return new Response(
      JSON.stringify({ status: 500, message: error.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    cookies().delete('auth');
    return new Response(JSON.stringify({ message: 'Auth cookie deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting auth cookie:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete auth cookie' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}