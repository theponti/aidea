import superjson from "superjson";

import { bookmarksRouter } from "./bookmarks";
import { createRouter } from "./context";
import { ideaRouter } from "./ideas";
import { listsRouter } from "./lists";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", userRouter)
  .merge("idea.", ideaRouter)
  .merge("lists.", listsRouter)
  .merge("bookmarks.", bookmarksRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
