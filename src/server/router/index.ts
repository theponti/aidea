import superjson from "superjson";

import { createRouter } from "./context";
import { ideaRouter } from "./ideas";
import { recommendationsRouter } from "./recommendations";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", userRouter)
  .merge("idea.", ideaRouter)
  .merge("recommendations.", recommendationsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
