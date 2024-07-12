// Import the required modules
import { query } from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import "../../../../envConfig.js";
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


// Handler for POST request to register a new customer
export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, address, password } =
      await request.json();

    const existingUser = await query({
      query: "SELECT * FROM customer WHERE Email = ?",
      values: [email],
    });

    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await query({
      query:
        "INSERT INTO customer (FirstName, LasttName, Email, Phone, Address, Password) VALUES (?, ?, ?, ?, ?, ?)",
      values: [firstName, lastName, email, phone, address, hashedPassword],
    });

    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ message: "Registration successful" }),
        { status: 201 }
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

// Handler for PUT request to update customer details or login
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
          if (!isItAdmin) {
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

// Handler for PATCH request to reset customer password
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

    if (!Id) {
      return new Response(
        JSON.stringify({
          status: 401,
          message: "Unauthorized",
        }),
        { status: 400 }
      );
    }

    const passwordValidationRegex = /^(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!passwordValidationRegex.test(newPassword)) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Password does not meet requirements",
        }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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

// Handler for UPDATE request to get customer details by email
export async function UPDATE(request) {
  try {
    const formData = await request.json();
    const email = formData.email;

    if (!email) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Email is required",
        }),
        { status: 400 }
      );
    }

    const users = await query({
      query: "SELECT * FROM customer WHERE Email = ?",
      values: [email],
    });

    if (users.length === 0) {
      return new Response(
        JSON.stringify({
          status: 404,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    const data = JSON.stringify(users[0]);
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

export async function DELETE(request) {
  try {
    cookies().delete('token');
    return new Response(JSON.stringify({ message: 'Token cookie deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting auth cookie:', error);
    return new Response(JSON.stringify({ error: 'Token cookie Not present' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}