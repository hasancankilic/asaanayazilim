/**
 * Prisma Database Client
 * 
 * This file provides a singleton Prisma client instance for use throughout the application.
 * In development, it will log queries. In production, it will be silent.
 * 
 * Production-safe: Prevents multiple Prisma instances and handles connection pooling.
 * 
 * Note: Prisma Client types are generated via `prisma generate` (runs in postinstall).
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Prisma Client types are generated via `prisma generate`
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
