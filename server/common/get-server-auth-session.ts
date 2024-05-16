import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { assert } from "console";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "../../env/server.mjs";
import { prisma } from "../db/client";

assert(env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID is not set");
assert(env.GOOGLE_CLIENT_SECRET, "GOOGLE_CLIENT_SECRET is not set");
assert(env.NEXTAUTH_SECRET, "NEXTAUTH_SECRET is not set");

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = async () => getServerSession(authOptions);
