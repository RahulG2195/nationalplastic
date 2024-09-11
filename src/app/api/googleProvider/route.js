// File: pages/api/googleProvider.js
import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, name, id } = req.body;
    const existingUser = await query({
      query: "SELECT * FROM customer WHERE Email = ?",
      values: [email],
    });

    if (existingUser.length > 0) {
      const user = existingUser[0];
      if (!user.google_id) {
        await query({
          query: "UPDATE customer SET google_id = ? WHERE Email = ?",
          values: [id, email],
        });
      }
      res.status(200).json({ message: "User Data", email: email, customer_id: user.customer_id });
    } else {
      const insertResult = await query({
        query: "INSERT INTO customer (Email, FirstName, google_id) VALUES (?, ?, ?)",
        values: [email, name, id],
      });
      
      if (insertResult.affectedRows > 0) {
        const newUser = await query({
          query: "SELECT customer_id FROM customer WHERE Email = ?",
          values: [email],
        });
        res.status(201).json({ message: "Registration successful", email: email, customer_id: newUser[0].customer_id });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
    }
  } catch (error) {
    console.error("Error in Google provider API:", error);
    res.status(500).json({ message: error.message });
  }
}