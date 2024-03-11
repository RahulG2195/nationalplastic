// 'use client'
// Import the required modules
// import { useRouter } from 'next/router';
import { query } from "@/lib/db"; // Assuming 'your-database-module' is the correct path to your database module
// const router = useRouter();

// import { Response } from 'your-response-library'; // Assuming 'your-response-library' is the correct library for handling responses

// Define your API endpoint handler for GET request
// import { useRouter } from 'next/navigation'

export async function GET(request) {
  try {
    const users = await query({
      query: "SELECT * FROM Customer",
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

export async function PATCH(request) {
  try {
    // You can access the request body using request.body
    const { data } = request.body;
    console.log(
      "#################################################################"
    );
    console.log("Data receiveddddddddddddddddddddddddddddddddddddddd:", data);

    // Example query to fetch users from the database
    const users = await query({
      query: "SELECT * FROM Customer",
      values: [],
    });

    let responseData = JSON.stringify(users);
    return new Response(responseData, {
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

// Define your API endpoint handler for registration POST request
export async function POST(request) {
  try {
    // Extract data from the request JSON
    const { firstName, lastName, email, phone, address, password } =
      await request.json();

    // Check if the email already exists in the database
    const existingUser = await query({
      query: "SELECT * FROM Customer WHERE Email = ?",
      values: [email],
    });

    // If the email already exists, return a 400 Bad Request response
    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
      });
    }

    // Execute database query to insert new user
    const result = await query({
      query:
        "INSERT INTO Customer (FirstName, LasttName, Email, Phone, Address, Password) VALUES (?, ?, ?, ?, ?, ?)",
      values: [firstName, lastName, email, phone, address, password],
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
    const { email, password } = await request.json();
    console.log("putttttttttp request");

    console.log(email);
    // Check if the email already exists in the database
    const existingUser = await query({
      query: "SELECT * FROM Customer WHERE email = ?",
      values: [email],
    });

    // const passwordChecker = ()=>{
    console.log(existingUser);
    // }
    if (existingUser.length > 0) {
      console.log("Nope All is well");

      // Check if the provided password matches the stored password
      const storedPassword = existingUser[0].Password;
      // Adjust the property name as per your database schema

      // Implement password comparison logic using a secure method (e.g., bcrypt)
      // const passwordMatch = comparePasswords(password, storedPassword); // Implement comparePasswords function

      if (password === storedPassword) {
        // return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
        {
          return new Response(
            JSON.stringify({
              status: 200,
              message: existingUser,
            })
          );
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
