/**
 * Seed Admin User Script
 * 
 * Run this script once to create the initial admin user:
 * npx tsx scripts/seed-admin.ts
 * 
 * Or add to package.json:
 * "seed": "tsx scripts/seed-admin.ts"
 */

import { seedAdminUser } from '../lib/auth-prisma';
import { prisma } from '../lib/db';

async function main() {
  console.log('🌱 Seeding admin user...');
  
  await seedAdminUser();
  
  console.log('✅ Seed complete!');
  
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  });

