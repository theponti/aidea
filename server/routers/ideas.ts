import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const ideaRouter = createTRPCRouter({
  getIdeas: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.idea.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
  createIdea: protectedProcedure
    .input(
      z.object({
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const idea = await ctx.db.idea.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
      return idea;
    }),
  deleteIdea: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const idea = await ctx.db.idea.delete({
        where: { id: input.id },
      });
      return idea;
    }),
});
