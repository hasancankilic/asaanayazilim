/**
 * Admin Authentication with Prisma
 * 
 * This file provides authentication utilities using Prisma and bcrypt
 * Falls back gracefully if Prisma is not set up
 */

import { cookies } from 'next/headers';

// Try to import Prisma - handle gracefully if not available
let prisma: any = null;
let bcrypt: any = null;

try {
  const prismaModule = require('./db');
  prisma = prismaModule.prisma;
} catch (error) {
  // Prisma not available - will use fallback auth
}

try {
  bcrypt = require('bcryptjs');
} catch (error) {
  // bcrypt not available - will use simple comparison
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  if (bcrypt) {
    return await bcrypt.hash(password, 10);
  }
  // Fallback: return plain password (NOT SECURE, only for dev)
  return password;
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  if (bcrypt) {
    return await bcrypt.compare(password, hashedPassword);
  }
  // Fallback: simple comparison (NOT SECURE, only for dev)
  return password === hashedPassword;
}

/**
 * Get admin user by email
 */
export async function getAdminByEmail(email: string) {
  if (!prisma) {
    return null;
  }
  
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
    
    // If Prisma is available, verify admin exists
    if (prisma) {
      try {
        const adminCount = await prisma.adminUser.count();
        return adminCount > 0;
      } catch (error) {
        // If DB error, still allow session (fallback mode)
        return true;
      }
    }
    
    return true;
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
    if (prisma) {
      const admin = await getAdminByEmail(email);
      
      if (admin) {
        const isValid = await verifyPassword(password, admin.password);
        return isValid;
      }
    }
    
    // Fallback: try env-based auth (but don't set cookie here)
    const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'hasancankilic25@gmail.com')
      .toLowerCase()
      .trim();
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (email.toLowerCase().trim() === adminEmail && password === adminPassword) {
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
  if (!prisma) {
    return; // Silently fail if Prisma not available
  }
  
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
  }
}
