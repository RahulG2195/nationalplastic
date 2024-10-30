import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
    state: {
      name: 'next-auth.state',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 900 // 15 minutes in seconds
      }
    }
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
            if (!userRecord.google_id) {
              await query({
                query: `UPDATE customer
                        SET google_id = ?,
                            FirstName = ?,
                            LasttName = ?
                        WHERE Email = ?`,
                values: [googleId, firstName, lastName, email],
              });
            }
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
         
          user.customerId = customerId;
          user.isNewUser = isNewUser;
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
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
        token.isNewUser = user.isNewUser;
        if (account?.provider === "google") {
          token.customerId = user.customerId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.customerId = token.customerId;
        session.user.isNewUser = token.isNewUser;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };