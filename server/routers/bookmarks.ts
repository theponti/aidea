import { TRPCError } from "@trpc/server";
import { CheerioAPI, load } from "cheerio";
import ky from "ky";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

function getOgContent($: CheerioAPI, type: string): string {
  return $(`meta[property="og:${type}"]`).attr("content") || "";
}

export const bookmarksRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.recommendation.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const html = await ky(input.url);
        const text = await html.text();
        const $ = load(text);
        const recommendation = {
          image: getOgContent($, "image"),
          title: getOgContent($, "title"),
          description: getOgContent($, "description"),
          url: getOgContent($, "url"),
          siteName: getOgContent($, "site_name"),
          imageWidth: getOgContent($, "image:width"),
          imageHeight: getOgContent($, "image:height"),
        };

        const obj = await ctx.db.recommendation.create({
          data: {
            ...recommendation,
            userId: ctx.session.user.id,
          },
        });
        return { recommendation: obj };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Recommendation could not be created",
        });
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.recommendation.delete({
        where: { id: input.id },
      });
    }),
});
