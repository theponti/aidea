import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getSession: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
  deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.delete({ where: { id: ctx.session?.user?.id } });
    return true;
  }),
});
