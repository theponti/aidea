import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const listsRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const lists = await ctx.db.userLists.findMany({
      where: { userId: ctx.session?.user?.id },
      orderBy: { createdAt: "desc" },
      include: { list: true, user: true },
    });
    return lists;
  }),
  findById: publicProcedure
    .input(
      z.object({
        listId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.userLists.findUnique({
        where: {
          listId_userId: {
            listId: input.listId,
            userId: ctx.session?.user?.id as string,
          },
        },
        include: { list: true },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const list = await ctx.db.list.create({
          data: {
            name: input.name,
            userId: ctx.session?.user?.id as string,
          },
        });
        // Create join record
        await ctx.db.userLists.create({
          data: {
            listId: list.id,
            userId: ctx.session?.user?.id as string,
          },
        });
        return { list };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Recommendation could not be created",
        });
      }
    }),
  invites: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.listInvite.findMany({
      where: {
        invitedUserEmail: ctx.session?.user?.email as string,
      },
      include: {
        list: true,
        user: true,
      },
    });
  }),
  listInvites: publicProcedure
    .input(
      z.object({
        listId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.listInvite.findMany({
        where: {
          listId: input.listId,
        },
        include: {
          user: true,
        },
      });
    }),
  sentInvites: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.listInvite.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      include: {
        list: true,
        invitedUser: true,
      },
    });
  }),
  invite: publicProcedure
    .input(
      z.object({
        email: z.string(),
        listId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.listInvite.create({
        data: {
          invitedUserEmail: input.email,
          listId: input.listId,
          userId: ctx.session?.user?.id as string,
        },
      });
    }),
  acceptInvite: publicProcedure
    .input(
      z.object({
        listId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Accept invite
      await ctx.db.listInvite.update({
        where: {
          listId_invitedUserEmail: {
            listId: input.listId,
            invitedUserEmail: ctx.session?.user?.email as string,
          },
        },
        data: {
          accepted: true,
        },
      });

      // Create link between user and list
      const list = await ctx.db.userLists.create({
        data: {
          listId: input.listId,
          userId: ctx.session?.user?.id as string,
        },
      });

      return list;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.list.delete({
        where: { id: input.id },
      });
    }),
});
