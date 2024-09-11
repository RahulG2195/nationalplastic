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
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { email, name, id } = user;
          const existingUser = await query({
            query: "SELECT * FROM customer WHERE Email = ?",
            values: [email],
          });

          if (existingUser.length > 0) {
            const userRecord = existingUser[0];
            if (!userRecord.google_id) {
              await query({
                query: "UPDATE customer SET google_id = ? WHERE Email = ?",
                values: [id, email],
              });
            }
            return true;
          } else {
            await query({
              query: "INSERT INTO customer (Email, FirstName, google_id) VALUES (?, ?, ?)",
              values: [email, name, id],
            });
            return true;
          }
        } catch (error) {
          console.error("Error during Google sign-in:", error);
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
