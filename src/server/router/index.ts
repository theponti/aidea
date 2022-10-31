import superjson from "superjson";

import { createRouter } from "./context";
import { ideaRouter } from "./ideas";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", userRouter)
  .merge("idea.", ideaRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
