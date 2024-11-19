// pages/api/auth/[...nextauth].js or app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const { email } = user;
        const googleId = account.providerAccountId;
        const firstName = profile?.given_name || user.name?.split(' ')[0] || '';
        const lastName = profile?.family_name || user.name?.split(' ').slice(1).join(' ') || '';

        try {
          const existingUser = await query({
            query: "SELECT * FROM customer WHERE Email = ?",
            values: [email],
          });
          
          let customerId;
          let isNewUser = false;
          
          if (existingUser.length > 0) {
            const userRecord = existingUser[0];
            customerId = userRecord.customer_id;
            
            await query({
              query: `UPDATE customer 
                      SET google_id = ?,
                          FirstName = COALESCE(?, FirstName),
                          LasttName = COALESCE(?, LasttName)
                      WHERE Email = ?`,
              values: [googleId, firstName, lastName, email],
            });
          } else {
            const result = await query({
              query: `INSERT INTO customer 
                      (Email, FirstName, LasttName, google_id) 
                      VALUES (?, ?, ?, ?)`,
              values: [email, firstName, lastName, googleId],
            });
            customerId = result.insertId;
            isNewUser = true;
          }

          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (account && user) {
        // Get user data from database
        const dbUser = await query({
          query: "SELECT * FROM customer WHERE Email = ?",
          values: [user.email],
        });

        if (dbUser && dbUser[0]) {
          token.customerId = dbUser[0].customer_id;
          token.firstName = dbUser[0].FirstName;
          token.lastName = dbUser[0].LasttName;
          token.email = dbUser[0].Email;
          token.provider = account.provider;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          customerId: token.customerId,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          provider: token.provider,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Client-side sign-in handler (e.g., in your component)
