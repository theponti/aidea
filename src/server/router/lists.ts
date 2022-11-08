import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./context";

// Example router with queries that can only be hit if the user requesting is signed in
export const listsRouter = createProtectedRouter()
  .query("get", {
    async resolve({ ctx }) {
      return ctx.prisma.userLists.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" },
        include: { list: true },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const list = await ctx.prisma.list.create({
          data: {
            name: input.name,
            userId: ctx.session.user.id,
          },
        });
        // Create join record
        await ctx.prisma.userLists.create({
          data: {
            listId: list.id,
            userId: ctx.session.user.id,
          },
        });
        return { list };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Recommendation could not be created",
        });
      }
    },
  })
  .mutation("invite", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      // return await ctx.prisma.recommendation.delete({
      //   where: { id: input.id },
      // });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.list.delete({
        where: { id: input.id },
      });
    },
  });
