// pages/api/userLogin.js
import { getSession } from "next-auth/react";
import { query } from "@/lib/db";
// export default  (req, Response) => {
//   if (req.method === "POST") {
   
    
//     // Log the session data

//     // Handle the user data as needed, e.g., save to database

//     return Response.status(200).json({ message: "User data received", user: session.user });
//   } else {
//     Response.setHeader("Allow", ["POST"]);
//     Response.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };
export async function POST(request) {
    try {
        const { email, name , id} =
        await request.json();
        // console.log("request",request);
        // console.log("request",JSON.stringify(request));
        // console.log("request",JSON.stringify(request.body));
        // console.log("request",JSON.stringify(request.data));
        // const session = await getSession({ request });
        // if (!session) {
        //   return new Response(
        //     JSON.stringify({
        //       status: 401,
        //       message: "Not authenticated",
        //     })
        //   );
        // }
      // Extract data from the request JSON
    //   console.log('Session Data:', session.user.);

        // const email = session.user.email;
        // const username = session.user.name;
    //   const { email, username } = await request.json();
  console.log("Email:", email);
  console.log("username:", name);
  console.log("username:", id);


      // Check if the email already exists in the database
      const existingUser = await query({
        query: "SELECT * FROM customer WHERE Email =?",
        values: [email],
      });
  
      // If the email already exists, return a 400 Bad Request response
      if (existingUser.length > 0) {
        return new Response(JSON.stringify({ message: "Email already exists" }), {
          status: 400,
        });
      }
  
      // If the email does not exist, insert the new user into the database
      const result = await query({
        query: "INSERT INTO customer (Email, FirstName , googleid) VALUES (?,?,?)",
        values: [email, name ,id],
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