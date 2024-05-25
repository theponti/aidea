import { PrismaClient } from "@prisma/client";

import { env } from "../../env";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log:
        env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }

  prismaClient = global.prisma;
}

export const prisma = prismaClient!;
