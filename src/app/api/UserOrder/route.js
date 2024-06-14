
import { query } from "@/lib/db"; 
// const router = useRouter();
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
import "../../../../envConfig.js";

// Define your API endpoint handler for GET request
// import { useRouter } from 'next/navigation'

export async function GET(req, res) {
  try {

    const { email, password, getProfile } = await request.json();
    //console.log(email);
    // Check if the email already exists in the database
    // const existingUser = await query({
    //   query: "SELECT * FROM customer WHERE email = ?",
    //   values: [email],
    // });
    if (existingUser.length > 0) {
      
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

export async function POST(request) {
  try {
    // Extract data from the request JSON
    const { prod_id, user_id } = await request.json();
    
    const updateprodtocancel = await query({
      query: "UPDATE order_detail SET cancel_order = 0, per_order_status = 0 WHERE prod_id = ? AND user_id = ?",
      values: [prod_id, user_id],
    })
    
    return new Response(
      JSON.stringify({
        status: 200,
        message: "updated",
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: error.message,
      })
    );
  }
}


export async function PUT(request) {
  try {

    const { email, customer_id } = await request.json();
    
    if (customer_id) {

        const orderResult = await query({
          query: "SELECT ol.*, od.*, product_id, product_name, seo_url, seo_url_clr, image_name, discount_percentage, category_id, discount_price  FROM order_list AS ol LEFT JOIN order_detail AS od ON ol.order_id = od.order_id LEFT JOIN products ON product_id = od.prod_id WHERE ol.customer_id = ? AND ol.payment_status = 'captured'",
          values: [customer_id]
        });

        return new Response(
          JSON.stringify({
            status: 200,
            orderData: orderResult,
            message: "Order Found",
          })
        );
    } else {
      throw new Error("User data not Found");
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
