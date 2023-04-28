import { router } from "./common/context";
import { bookmarksRouter } from "./routers/bookmarks";
import { ideaRouter } from "./routers/ideas";
import { listsRouter } from "./routers/lists";
import { userRouter } from "./routers/user";

export const appRouter = router({
  auth: userRouter,
  idea: ideaRouter,
  lists: listsRouter,
  bookmarks: bookmarksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
