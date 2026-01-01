# Quick Start - CMS Setup

## 1. Install Dependencies

```bash
npm install prisma @prisma/client bcryptjs
npm install -D @types/bcryptjs tsx
```

## 2. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Create database (SQLite)
npm run db:push

# Seed admin user
npm run db:seed
```

## 3. Environment Variables

Add to `.env.local`:

```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD="your-password"
```

## 4. Run Development Server

```bash
npm run dev
```

## 5. Access Admin Panel

1. Go to: http://localhost:3000/admin/login
2. Login with your admin credentials
3. Navigate to `/admin/blog` or `/admin/projects`

## 6. Create Content

- **Blog:** `/admin/blog/new`
- **Projects:** `/admin/projects/new`

Fill in the form and click "Yayınla" (Publish) or "Taslak Olarak Kaydet" (Save as Draft).

---

**✅ CMS is ready to use!**

For production, update `DATABASE_URL` to PostgreSQL connection string.

