import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { ssrPrepass } from "@trpc/next/ssrPrepass";
import { createTRPCReact } from "@trpc/react-query";
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "server";
import SuperJSON from "superjson";

/**
 * These are helper types to infer the input and output of query resolvers
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["procedures"],
> = inferProcedureOutput<AppRouter["_def"]["procedures"][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter["_def"]["procedures"],
> = inferProcedureInput<AppRouter["_def"]["procedures"][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter["_def"]["procedures"],
> = inferProcedureOutput<AppRouter["_def"]["procedures"][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof AppRouter["_def"]["procedures"],
> = inferProcedureInput<AppRouter["_def"]["procedures"][TRouteKey]>;

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const api = createTRPCReact<AppRouter>();

export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  transformer: SuperJSON,
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== "undefined") {
      // during client requests
      return {
        links: [
          httpBatchLink({
            url: "/api/trpc",
            transformer: SuperJSON,
          }),
        ],
      };
    }
    return {
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          // The server needs to know your app's full url
          url: `${getBaseUrl()}/api/trpc`,
          /**
           * Set custom request headers on every request from tRPC
           * @link https://trpc.io/docs/v10/header
           */
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            // To use SSR properly, you need to forward client headers to the server
            // This is so you can pass through things like cookies when we're server-side rendering
            return {
              cookie: ctx.req.headers.cookie,
            };
          },
        }),
      ],
    };
  },
});
