import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const id = credentials?.identifier?.trim();
        const password = credentials?.password;
        if (!id || !password) {
          console.info("[auth] reject: missing credentials");
          return null;
        }
        const user = await prisma.user.findFirst({
          where: { OR: [{ email: id.toLowerCase() }, { phone: id }] },
        });
        if (!user) {
          console.info(`[auth] reject: user not found (${id})`);
          return null;
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
          console.info(`[auth] reject: bad password (${user.email})`);
          return null;
        }
        console.info(`[auth] success: ${user.email}`);
        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          image: user.avatarUrl ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        (session.user as { id?: string }).id = token.uid as string;
      }
      return session;
    },
  },
};
