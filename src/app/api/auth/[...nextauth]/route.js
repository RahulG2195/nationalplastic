import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";
import { setLocalStorage } from "@/utils/cookie";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Add this line
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Your existing signIn logic
      setLocalStorage(email);
      return true;
    },
    async session({ session, token }) {
      // Your existing session logic
      session.user.id = token.id;
      session.user.name = token.name;
      setLocalStorage(session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };