/**
 * Prisma Database Client
 * 
 * This file provides a singleton Prisma client instance for use throughout the application.
 * In development, it will log queries. In production, it will be silent.
 * Gracefully handles cases where Prisma is not set up.
 */

let PrismaClient: any = null;
let prisma: any = null;

try {
  PrismaClient = require('@prisma/client').PrismaClient;
} catch (error) {
  console.warn('@prisma/client not available. Database features will be disabled.');
}

if (PrismaClient) {
  const globalForPrisma = globalThis as unknown as {
    prisma: any;
  };

  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
}

export { prisma };
