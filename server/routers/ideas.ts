import { z } from "zod";
import { authenticatedProcedure, router } from "../common/context";

// Example router with queries that can only be hit if the user requesting is signed in
export const ideaRouter = router({
  getIdeas: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.idea.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
  createIdea: authenticatedProcedure
    .input(
      z.object({
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const idea = await ctx.prisma.idea.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
      return idea;
    }),
  deleteIdea: authenticatedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const idea = await ctx.prisma.idea.delete({
        where: { id: input.id },
      });
      return idea;
    }),
});
