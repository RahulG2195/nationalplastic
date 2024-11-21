import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

// Custom error handling utility
const handleAuthError = (error, context = 'Unknown Context') => {
  console.error(`Authentication Error in ${context}:`, error);
  
  // Log additional error details
  if (error instanceof Error) {
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
  }

  // Optional: You could add more sophisticated error tracking here
  // For example, sending error to a monitoring service
  
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
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("Sign In Callback Triggered:");
        console.log("User Data:", JSON.stringify(user, null, 2));
        console.log("Account Data:", JSON.stringify(account, null, 2));

        // Validate essential user data
        if (!user.email) {
          console.error("Sign-in failed: No email provided");
          return false;
        }

        if (account?.provider === "google") {
          const { email } = user;
          const googleId = account.providerAccountId;
          const firstName = profile?.given_name || user.name?.split(' ')[0] || '';
          const lastName = profile?.family_name || user.name?.split(' ').slice(1).join(' ') || '';

          console.log(`Processing Google Sign In for email: ${email}`);

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

            console.log(`Sign in process completed successfully. New User: ${isNewUser}`);
            return true;
          } catch (dbError) {
            return handleAuthError(dbError, 'Google Sign-In Database Operation');
          }
        }

        console.log("Non-Google provider sign in attempted");
        return true;
      } catch (error) {
        return handleAuthError(error, 'Sign-In Callback');
      }
    },

    async jwt({ token, user, account, profile }) {
      try {
        console.log("JWT Callback Triggered:");

        // If no account or user, return existing token
        if (!account || !user) {
          return token;
        }

        // Validate email
        if (!user.email) {
          console.error("JWT creation failed: No email provided");
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

            console.log(`Token populated for user: ${user.email}`);
          } else {
            console.warn(`No user found in database for email: ${user.email}`);
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
        console.log("Session Callback Triggered:");

        // Validate token
        if (!token || !token.email) {
          console.warn("Session creation failed: Invalid or missing token");
          return session;
        }

        // Enrich session with token data
        session.user = {
          ...session.user,
          customerId: token.customerId || null,
          firstName: token.firstName || '',
          lastName: token.lastName || '',
          email: token.email,
          provider: token.provider || '',
        };

        console.log(`Session created for user: ${token.email}`);
        return session;
      } catch (error) {
        return handleAuthError(error, 'Session Callback');
      }
    },
  },
  
  // Add error handling for authentication events
  events: {
    async signIn(message) {
      console.log("Sign-in event:", JSON.stringify(message, null, 2));
    },
    async signOut(message) {
      console.log("Sign-out event:", JSON.stringify(message, null, 2));
    },
    async createUser(message) {
      console.log("User created event:", JSON.stringify(message, null, 2));
    },
    async session(message) {
      console.log("Session event:", JSON.stringify(message, null, 2));
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };