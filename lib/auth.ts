/**
 * Admin Authentication Utilities (Legacy)
 * 
 * This file is kept for backward compatibility.
 * New code should use lib/auth-prisma.ts instead.
 */

import { verifyAdminSession, authenticateAdmin as authenticateAdminPrisma, getAdminByEmail } from './auth-prisma';

/**
 * Get admin credentials from environment variables (legacy - for migration)
 * @deprecated Use Prisma-based authentication instead
 */
export function getAdminCredentials() {
  const email = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'hasancankilic25@gmail.com')
    .toLowerCase()
    .trim();
  
  const password = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
  
  return {
    email,
    password,
  };
}

/**
 * Verify password (legacy compatibility)
 * @deprecated Use verifyPassword from auth-prisma.ts
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const { verifyPassword: verify } = await import('./auth-prisma');
    return await verify(password, hashedPassword);
  } catch {
    // Fallback if bcrypt not available (should not happen in production)
    return password === hashedPassword;
  }
}

/**
 * Require admin authentication
 */
export async function requireAdmin() {
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    throw new Error('Unauthorized');
  }
  return true;
}
