import { createProtectedRouter } from "./context";

// Example router with queries that can only be hit if the user requesting is signed in
export const userRouter = createProtectedRouter()
  .query("getSession", {
    async resolve({ ctx }) {
      return ctx.session;
    },
  })
  .mutation("deleteUser", {
    async resolve({ ctx }) {
      // Delete user
      await ctx.prisma.user.delete({ where: { id: ctx.session.user.id } });
      return true;
    },
  });
