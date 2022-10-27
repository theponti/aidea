import { z } from "zod";
import { createProtectedRouter } from "./context";

// Example router with queries that can only be hit if the user requesting is signed in
export const ideaRouter = createProtectedRouter()
  .query("getIdeas", {
    async resolve({ ctx }) {
      return ctx.prisma.idea.findMany({
        where: { userId: ctx.session.user.id },
      });
    },
  })
  .mutation("createIdea", {
    input: z.object({
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const idea = await ctx.prisma.idea.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
      return idea;
    },
  })
  .mutation("deleteIdea", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const idea = await ctx.prisma.idea.delete({
        where: { id: input.id },
      });
      return idea;
    },
  });
