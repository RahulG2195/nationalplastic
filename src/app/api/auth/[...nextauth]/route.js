import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db"; // Assuming 
import { setLocalStorage } from "@/utils/cookie";
const handler =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can save the user info to your database here
      
      setLocalStorage(email);
    
      return true;
    },
    async session({ session, token }) {
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

export { handler as GET , handler as POST};