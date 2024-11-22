import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

const handleAuthError = (error, context = 'Unknown Context') => {
  if (error instanceof Error) {
    return null;
  }
  return null;
};

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
  cookies: {
    csrfToken: {
      name: `__Secure-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      },
    },
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (!user.email || account.provider !== "google") {
          return false;
        }
    
        const { email } = user;
        const googleId = account.providerAccountId;
        const firstName = profile?.given_name || user.name?.split(' ')[0] || '';
        const lastName = profile?.family_name || user.name?.split(' ').slice(1).join(' ') || '';
    
        // Use INSERT...ON DUPLICATE KEY UPDATE for upsert operation
        try {
          await query({
            query: `
              INSERT INTO customer (Email, FirstName, LasttName, google_id) 
              VALUES (?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE 
                google_id = VALUES(google_id),
                FirstName = COALESCE(VALUES(FirstName), FirstName),
                LasttName = COALESCE(VALUES(LasttName), LasttName)
            `,
            values: [email, firstName, lastName, googleId],
          });
    
          return true; // Allow sign-in
        } catch (dbError) {
          console.error("Database Error during Google Sign-In:", dbError);
          return false; // Deny sign-in if database operation fails
        }
      } catch (error) {
        console.error("Error in Sign-In Callback:", error);
        return false; // Deny sign-in on unexpected errors
      }
    },    

    async jwt({ token, user, account }) {
      console.log("JWT Callback: ", { token, user, account });
      try {
        if (!account || !user) {
          return token;
        }

        if (!user.email) {
          return token;
        }

        try {
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
        } catch (dbError) {
          return handleAuthError(dbError, 'JWT Database Lookup');
        }

        return token;
      } catch (error) {
        return handleAuthError(error, 'JWT Callback');
      }
    },

    async session({ session, token }) {
      try {
        if (!token || !token.email) {
          return session;
        }

        session.user = {
          ...session.user,
          customerId: token.customerId || null,
          firstName: token.firstName || '',
          lastName: token.lastName || '',
          email: token.email,
          provider: token.provider || '',
        };

        return session;
      } catch (error) {
        return handleAuthError(error, 'Session Callback');
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };