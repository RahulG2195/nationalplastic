// File: pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const { email } = user;
        const googleId = account.providerAccountId;
        // Extract first and last name from OAuth profile
        const firstName = profile.given_name || user.name?.split(' ')[0] || '';
        const lastName = profile.family_name || user.name?.split(' ').slice(1).join(' ') || '';
        
        try {
          const existingUser = await query({
            query: "SELECT * FROM customer WHERE Email = ?",
            values: [email],
          });
          
          let customerId;
          
          if (existingUser.length > 0) {
            const userRecord = existingUser[0];
            customerId = userRecord.customer_id;
            if (!userRecord.google_id) {
              await query({
                query: `UPDATE customer 
                        SET google_id = ?, 
                            FirstName = ?,
                            LastName = ?
                        WHERE Email = ?`,
                values: [googleId, firstName, lastName, email],
              });
            }
          } else {
            const result = await query({
              query: `INSERT INTO customer 
                      (Email, FirstName, LastName, google_id) 
                      VALUES (?, ?, ?, ?)`,
              values: [email, firstName, lastName, googleId],
            });
            customerId = result.insertId;
          }
          
          user.customerId = customerId;
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          // Log detailed error information for debugging
          console.error({
            message: "Google sign-in database error",
            email,
            firstName,
            lastName,
            googleId,
            error: error.message,
            stack: error.stack,
          });
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        if (account && account.provider === "google") {
          const dbUser = await query({
            query: "SELECT customer_id FROM customer WHERE Email = ?",
            values: [user.email],
          });
          if (dbUser.length > 0) {
            token.customerId = dbUser[0].customer_id;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.customerId = token.customerId;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Customize this based on your requirements
      return baseUrl;
    },
  },
});
export { handler as GET, handler as POST };
