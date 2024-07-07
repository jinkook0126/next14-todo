import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, user }) {
      return session;
    },
    async jwt({ token, account, profile }) {
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
});
