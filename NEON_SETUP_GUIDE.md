# 🚀 Neon PostgreSQL Setup Guide for Production

## Overview
This guide will help you migrate from SQLite to Neon PostgreSQL for production deployment on Vercel.

## Why Neon?
- ✅ **Free Tier**: 0.5 GB storage, 10^8 compute-hours/month
- ✅ **Serverless**: Auto-scales to zero when not in use
- ✅ **Vercel Integration**: Seamless deployment
- ✅ **SSL by Default**: Secure connections out of the box
- ✅ **Branching**: Database branching for development/testing

---

## Step 1: Create Neon Account

1. Visit: https://neon.tech
2. Click **"Sign Up"**
3. Sign up with your GitHub account
4. Verify your email

---

## Step 2: Create a New Project

1. Click **"New Project"**
2. Configure:
   - **Project Name**: `asaanayazilim`
   - **PostgreSQL Version**: 16 (latest)
   - **Region**: Select closest to your users
     - US East (Virginia) - Recommended for Turkey
     - EU West (Frankfurt) - Alternative
3. Click **"Create Project"**

---

## Step 3: Get Connection String

1. After project creation, you'll see the **Connection Details**
2. Copy the **Connection String** (looks like):
   ```
   postgresql://asaanayazilim_owner:abc123xyz@ep-cool-abc123.us-east-2.aws.neon.tech/asaanayazilim?sslmode=require
   ```

3. **Important**: This string includes:
   - Username
   - Password
   - Host
   - Database name
   - SSL mode

---

## Step 4: Add to Vercel Environment Variables

### Option A: Using Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project: `asaanayazilim`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

   | Variable Name | Value | Environment |
   |--------------|-------|-------------|
   | `DATABASE_PROVIDER` | `postgresql` | Production, Preview, Development |
   | `DATABASE_URL` | `postgresql://...` (from Neon) | Production, Preview, Development |

5. Click **Save**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add DATABASE_PROVIDER
# Enter: postgresql

vercel env add DATABASE_URL
# Enter: your Neon connection string
```

---

## Step 5: Update Prisma Schema

The schema has already been updated to use environment variables:

```prisma
datasource db {
  provider = env("DATABASE_PROVIDER")
  url      = env("DATABASE_URL")
}
```

---

## Step 6: Run Database Migrations

### Local Development (SQLite)
```bash
# Uses SQLite for local development
npm run db:push
```

### Production (PostgreSQL)
```bash
# Push schema to Neon PostgreSQL
DATABASE_PROVIDER=postgresql DATABASE_URL="your-neon-url" npx prisma db push

# OR run migrations
DATABASE_PROVIDER=postgresql DATABASE_URL="your-neon-url" npx prisma migrate deploy
```

---

## Step 7: Seed Admin User

```bash
# Create initial admin user
DATABASE_PROVIDER=postgresql DATABASE_URL="your-neon-url" npm run db:seed
```

---

## Step 8: Deploy to Vercel

### Option A: Git Push (Recommended)
```bash
git add .
git commit -m "chore: migrate to Neon PostgreSQL"
git push origin main
```
Vercel will automatically deploy with the new environment variables.

### Option B: Manual Deploy
```bash
vercel --prod
```

---

## Step 9: Verify Connection

1. Visit your production URL
2. Test admin login: `/admin/login`
3. Check if blog/projects work correctly
4. Verify in Vercel logs: `vercel logs`

---

## Troubleshooting

### Error: "Project has been paused"
- This is a Supabase error, not Neon
- Neon auto-scales but doesn't fully pause
- If connection fails, check Neon dashboard

### Error: "Database connection failed"
1. Verify DATABASE_URL is correct
2. Check if `?sslmode=require` is included
3. Ensure environment variables are set in Vercel
4. Restart deployment

### Error: "Prisma migration failed"
```bash
# Reset and push again
npx prisma db push --force-reset
```

### Check Database Status
```bash
# View database tables
npx prisma studio
```

---

## Local Development vs Production

| Feature | Local (SQLite) | Production (Neon) |
|---------|---------------|-------------------|
| Database | SQLite file | PostgreSQL cloud |
| Provider | `sqlite` | `postgresql` |
| Connection | `file:./dev.db` | Neon URL |
| Use Case | Development | Production |

---

## Environment Variables Summary

### `.env.local` (Local Development)
```env
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./dev.db"
```

### Vercel (Production)
```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require"
```

---

## Next Steps

1. ✅ Set up automated backups (Neon does this automatically)
2. ✅ Monitor database usage in Neon dashboard
3. ✅ Set up connection pooling (if needed)
4. ✅ Configure database branching for testing
5. ✅ Set up monitoring and alerts

---

## Useful Links

- **Neon Dashboard**: https://neon.tech/dashboard
- **Neon Docs**: https://neon.tech/docs
- **Vercel Env Vars**: https://vercel.com/docs/concepts/projects/environment-variables
- **Prisma + Neon**: https://neon.tech/guides/prisma

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Neon query history
3. Verify environment variables
4. Test connection locally first

---

**Status**: Ready for production deployment ✅
