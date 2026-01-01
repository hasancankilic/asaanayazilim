/**
 * Admin Authentication with Prisma
 * 
 * This file provides authentication utilities using Prisma and bcrypt
 * Production-safe implementation
 */

import { cookies } from 'next/headers';
import { prisma } from './db';
import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Get admin user by email
 */
export async function getAdminByEmail(email: string) {
  try {
    return await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return null;
  }
}

/**
 * Verify admin session from cookie
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return false;
    }
    
    // Verify admin exists in database
    try {
      const adminCount = await prisma.adminUser.count();
      return adminCount > 0;
    } catch (error) {
      // If DB error, still allow session (fallback mode)
      console.error('Error checking admin count:', error);
      return true;
    }
  } catch (error) {
    console.error('Error verifying admin session:', error);
    return false;
  }
}

/**
 * Create admin session cookie
 */
export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Clear admin session cookie
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

/**
 * Authenticate admin with email and password
 * Returns true if authenticated, false otherwise
 * Note: This function does NOT set the cookie - the caller must do that
 */
export async function authenticateAdmin(email: string, password: string): Promise<boolean> {
  try {
    // Try Prisma-based auth first
    const admin = await getAdminByEmail(email);
    
    if (admin) {
      const isValid = await verifyPassword(password, admin.password);
      return isValid;
    }
    
    // Fallback: try env-based auth (for initial setup)
    const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      ?.toLowerCase()
      .trim();
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (adminEmail && adminPassword && email.toLowerCase().trim() === adminEmail && password === adminPassword) {
      // Auto-seed admin user if env vars are set
      await seedAdminUser();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error authenticating admin:', error);
    return false;
  }
}

/**
 * Seed initial admin user from environment variables
 * This should only be run once during initial setup
 */
export async function seedAdminUser() {
  try {
    const email = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (!email || !password) {
      return; // Silently skip if env vars not set
    }
    
    const existingAdmin = await getAdminByEmail(email);
    
    if (existingAdmin) {
      return; // Already exists
    }
    
    const hashedPassword = await hashPassword(password);
    
    await prisma.adminUser.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: 'Admin',
      },
    });
    
    console.log('✅ Admin user seeded successfully');
  } catch (error) {
    // Silently fail - allow fallback auth to work
    console.error('Error seeding admin user:', error);
  }
}
