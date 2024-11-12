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
  debug: true,
  logger: {
    error(code, error) {
      console.error(code, error);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, ...message) {
      console.debug(code, ...message);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Starting signIn callback', {
        provider: account?.provider,
        email: user?.email,
        name: user?.name,
      });

      if (account?.provider === "google") {
        const { email } = user;
        const googleId = account.providerAccountId;
        const firstName = profile?.given_name || user.name?.split(' ')[0] || '';
        const lastName = profile?.family_name || user.name?.split(' ').slice(1).join(' ') || '';

        try {
          console.log('Checking for existing user:', { email });
          const existingUser = await query({
            query: "SELECT * FROM customer WHERE Email = ?",
            values: [email],
          });
          
          let customerId;
          let isNewUser = false;
          
          if (existingUser.length > 0) {
            console.log('Existing user found, updating record');
            const userRecord = existingUser[0];
            customerId = userRecord.customer_id;
            
            try {
              await query({
                query: `UPDATE customer 
                        SET google_id = ?,
                            FirstName = COALESCE(?, FirstName),
                            LasttName = COALESCE(?, LasttName)
                        WHERE Email = ?`,
                values: [googleId, firstName, lastName, email],
              });
              console.log('Successfully updated user record:', { customerId, email });
            } catch (updateError) {
              console.error('Error updating existing user:', {
                error: updateError.message,
                stack: updateError.stack,
                email,
                customerId,
              });
              throw updateError;
            }
          } else {
            console.log('New user, creating record');
            try {
              const result = await query({
                query: `INSERT INTO customer 
                        (Email, FirstName, LasttName, google_id) 
                        VALUES (?, ?, ?, ?)`,
                values: [email, firstName, lastName, googleId],
              });
              customerId = result.insertId;
              isNewUser = true;
              console.log('Successfully created new user:', {
                customerId,
                email,
                isNewUser,
              });
            } catch (insertError) {
              console.error('Error creating new user:', {
                error: insertError.message,
                stack: insertError.stack,
                email,
              });
              throw insertError;
            }
          }

          return true;
        } catch (error) {
          console.error("Fatal error during Google sign-in:", {
            error: error.message,
            stack: error.stack,
            email,
            provider: account.provider,
          });
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      console.log('Starting jwt callback', {
        hasUser: !!user,
        hasAccount: !!account,
        tokenEmail: token?.email,
      });

      if (account && user) {
        try {
          console.log('Fetching user data from database');
          const dbUser = await query({
            query: "SELECT * FROM customer WHERE Email = ?",
            values: [user.email],
          });

          if (dbUser && dbUser[0]) {
            console.log('User data found, updating token');
            token.customerId = dbUser[0].customer_id;
            token.firstName = dbUser[0].FirstName;
            token.lastName = dbUser[0].LasttName;
            token.email = dbUser[0].Email;
            token.provider = account.provider;
          } else {
            console.warn('No user found in database:', { email: user.email });
          }
        } catch (error) {
          console.error('Error in jwt callback:', {
            error: error.message,
            stack: error.stack,
            email: user.email,
          });
          // Don't throw the error to prevent authentication failure
          // but the token won't have the custom fields
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log('Starting session callback', {
        hasToken: !!token,
        sessionEmail: session?.user?.email,
      });

      try {
        if (token) {
          session.user = {
            ...session.user,
            customerId: token.customerId,
            firstName: token.firstName,
            lastName: token.lastName,
            email: token.email,
            provider: token.provider,
          };
          console.log('Session updated with user data');
        }
      } catch (error) {
        console.error('Error in session callback:', {
          error: error.message,
          stack: error.stack,
          tokenEmail: token?.email,
        });
        // Don't throw the error to prevent session creation failure
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Client-side sign-in handler (e.g., in your component)
