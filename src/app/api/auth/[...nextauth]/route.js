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
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: true, // Only send cookies over HTTPS
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (!user.email) {
          return false;
        }

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
            
            if (existingUser.length > 0) {
              await query({
                query: `UPDATE customer 
                        SET google_id = ?,
                            FirstName = COALESCE(?, FirstName),
                            LasttName = COALESCE(?, LasttName)
                        WHERE Email = ?`,
                values: [googleId, firstName, lastName, email],
              });
            } else {
              await query({
                query: `INSERT INTO customer 
                        (Email, FirstName, LasttName, google_id) 
                        VALUES (?, ?, ?, ?)`,
                values: [email, firstName, lastName, googleId],
              });
            }

            return true;
          } catch (dbError) {
            return handleAuthError(dbError, 'Google Sign-In Database Operation');
          }
        }

        return true;
      } catch (error) {
        return handleAuthError(error, 'Sign-In Callback');
      }
    },

    async jwt({ token, user, account }) {
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