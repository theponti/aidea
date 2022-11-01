import { TRPCError } from "@trpc/server";
import { CheerioAPI, load } from "cheerio";
import ky from "ky";
import { z } from "zod";
import { createProtectedRouter } from "./context";

function getOgContent($: CheerioAPI, type: string): string {
  return $(`meta[property="og:${type}"]`).attr("content") || "";
}

// Example router with queries that can only be hit if the user requesting is signed in
export const recommendationsRouter = createProtectedRouter()
  .query("getRecommendations", {
    async resolve({ ctx }) {
      return ctx.prisma.recommendation.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" },
      });
    },
  })
  .mutation("createRecommendation", {
    input: z.object({
      url: z.string(),
    }),
    async resolve({ ctx, input }) {
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
    },
  })
  .mutation("deleteRecommendation", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.recommendation.delete({
        where: { id: input.id },
      });
    },
  });
