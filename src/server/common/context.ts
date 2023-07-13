import { initTRPC, TRPCError } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Session } from "next-auth";
import superjson from "superjson";

import { prisma } from "../db/client";
import { getServerAuthSession } from "./get-server-auth-session";

interface Context {
  prisma: typeof prisma;
  session: Session | null;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async ({
  session,
}: {
  session: Session | null;
}) => {
  return { prisma, session };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({ session });
};

/**
 * This middleware will throw an error if the user is not authenticated.
 * If the user is authenticated, the session and user will be added to
 * the request context.
 **/
const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      prisma,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const authenticatedProcedure = publicProcedure.use(isAuthenticated);
