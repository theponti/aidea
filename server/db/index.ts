import { PrismaClient } from "@prisma/client";

import { env } from "../../env";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

export function getUserAccount(userId: string) {
  return prisma.account.findMany({ where: { userId } });
}
