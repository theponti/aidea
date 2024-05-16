import { authenticatedProcedure, router } from "../common/context";

// Example router with queries that can only be hit if the user requesting is signed in
export const userRouter = router({
  getSession: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
  deleteUser: authenticatedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.user.delete({ where: { id: ctx.session?.user?.id } });
    return true;
  }),
});
