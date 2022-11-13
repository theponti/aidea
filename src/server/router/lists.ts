import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./context";

// Example router with queries that can only be hit if the user requesting is signed in
export const listsRouter = createProtectedRouter()
  .query("get", {
    async resolve({ ctx }) {
      const lists = await ctx.prisma.userLists.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" },
        include: { list: true, user: true },
      });
      return lists;
    },
  })
  .query("findById", {
    input: z.object({
      listId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.userLists.findUnique({
        where: {
          listId_userId: {
            listId: input.listId,
            userId: ctx.session.user.id,
          },
        },
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
  .query("invites", {
    async resolve({ ctx }) {
      return await ctx.prisma.listInvite.findMany({
        where: {
          invitedUserEmail: ctx.session.user.email as string,
        },
        include: {
          list: true,
          user: true,
        },
      });
    },
  })
  .query("listInvites", {
    input: z.object({
      listId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.listInvite.findMany({
        where: {
          listId: input.listId,
        },
        include: {
          user: true,
        },
      });
    },
  })
  .query("sentInvites", {
    async resolve({ ctx }) {
      return await ctx.prisma.listInvite.findMany({
        where: {
          userId: ctx.session.user.id as string,
        },
        include: {
          list: true,
          invitedUser: true,
        },
      });
    },
  })
  .mutation("invite", {
    input: z.object({
      email: z.string(),
      listId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.listInvite.create({
        data: {
          invitedUserEmail: input.email,
          listId: input.listId,
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation("acceptInvite", {
    input: z.object({
      listId: z.string(),
    }),
    async resolve({ ctx, input }) {
      // Accept invite
      await ctx.prisma.listInvite.update({
        where: {
          listId_invitedUserEmail: {
            listId: input.listId,
            invitedUserEmail: ctx.session.user.email as string,
          },
        },
        data: {
          accepted: true,
        },
      });

      // Create link between user and list
      const list = await ctx.prisma.userLists.create({
        data: {
          listId: input.listId,
          userId: ctx.session.user.id,
        },
      });

      return list;
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
