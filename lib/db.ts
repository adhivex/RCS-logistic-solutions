import "server-only";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { getServerEnv } from "@/lib/env";

/*
 * Prisma client singleton over the Neon serverless driver (pooled DATABASE_URL).
 * Created lazily so pages that never touch the database don't need DB env vars.
 * Node 22+ provides a global WebSocket, so no `ws` polyfill is needed.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaNeon({ connectionString: getServerEnv().DATABASE_URL });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
}
