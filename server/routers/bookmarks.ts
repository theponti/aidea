import { TRPCError } from "@trpc/server";
import { CheerioAPI, load } from "cheerio";
import ky from "ky";
import { z } from "zod";
import { authenticatedProcedure, router } from "../common/context";

function getOgContent($: CheerioAPI, type: string): string {
  return $(`meta[property="og:${type}"]`).attr("content") || "";
}

// Example router with queries that can only be hit if the user requesting is signed in
export const bookmarksRouter = router({
  get: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.recommendation.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
  create: authenticatedProcedure
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

        const obj = await ctx.prisma.recommendation.create({
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
  delete: authenticatedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.recommendation.delete({
        where: { id: input.id },
      });
    }),
});
