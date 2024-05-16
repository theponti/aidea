import { bookmarksRouter } from "./routers/bookmarks";
import { ideaRouter } from "./routers/ideas";
import { listsRouter } from "./routers/lists";
import { userRouter } from "./routers/user";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: userRouter,
  idea: ideaRouter,
  lists: listsRouter,
  bookmarks: bookmarksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.search.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
