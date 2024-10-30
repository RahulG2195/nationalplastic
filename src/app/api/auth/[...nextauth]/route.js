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
            
            // Update user info
            await query({
              query: `UPDATE customer
                      SET google_id = ?,
                          FirstName = COALESCE(?, FirstName),
                          LasttName = COALESCE(?, LasttName),
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
         
          // Attach necessary data to the user object
          user.customerId = customerId;
          user.isNewUser = isNewUser;
          user.firstName = firstName;
          user.lastName = lastName;
          user.lastLogin = new Date().toISOString();
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.customerId = user.customerId;
        token.isNewUser = user.isNewUser;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.lastLogin = user.lastLogin;
        token.email = user.email;
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.customerId = token.customerId;
        session.user.isNewUser = token.isNewUser;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.lastLogin = token.lastLogin;
        session.user.email = token.email;
        session.user.provider = token.provider;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Handle redirect logic
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };