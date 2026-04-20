#!/bin/bash

# Neon PostgreSQL Migration Script
# This script helps you migrate from SQLite to Neon PostgreSQL

echo "🚀 AŞAANA YAZILIM - Neon PostgreSQL Migration"
echo "=============================================="
echo ""

# Check if Neon URL is provided
if [ -z "$1" ]; then
    echo "❌ Error: Neon DATABASE_URL is required"
    echo ""
    echo "Usage:"
    echo "  ./scripts/migrate-to-neon.sh 'postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require'"
    echo ""
    echo "Get your connection string from:"
    echo "  1. Go to https://neon.tech/dashboard"
    echo "  2. Select your project"
    echo "  3. Copy the connection string"
    echo ""
    exit 1
fi

NEON_URL=$1

echo "✅ Neon URL provided"
echo ""

# Test 1: Validate URL format
if [[ ! $NEON_URL =~ ^postgresql:// ]]; then
    echo "❌ Error: Invalid PostgreSQL URL format"
    echo "   URL should start with 'postgresql://'"
    exit 1
fi

echo "✅ URL format is valid"
echo ""

# Test 2: Check if SSL mode is included
if [[ ! $NEON_URL =~ sslmode=require ]]; then
    echo "⚠️  Warning: sslmode=require not found in URL"
    echo "   Adding sslmode=require..."
    if [[ $NEON_URL =~ \? ]]; then
        NEON_URL="${NEON_URL}&sslmode=require"
    else
        NEON_URL="${NEON_URL}?sslmode=require"
    fi
fi

echo "✅ SSL mode configured"
echo ""

# Test 3: Push schema to Neon
echo "📦 Pushing database schema to Neon..."
DATABASE_PROVIDER=postgresql DATABASE_URL="$NEON_URL" npx prisma db push

if [ $? -eq 0 ]; then
    echo "✅ Schema pushed successfully"
else
    echo "❌ Failed to push schema"
    echo "   Check your connection string and try again"
    exit 1
fi

echo ""

# Test 4: Seed admin user
echo "👤 Creating admin user..."
read -p "Admin email (default: hasancankilic25@gmail.com): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-hasancankilic25@gmail.com}

read -p "Admin password (default: admin123): " ADMIN_PASSWORD
ADMIN_PASSWORD=${ADMIN_PASSWORD:-admin123}

DATABASE_PROVIDER=postgresql DATABASE_URL="$NEON_URL" \
ADMIN_EMAIL=$ADMIN_EMAIL ADMIN_PASSWORD=$ADMIN_PASSWORD \
npm run db:seed

if [ $? -eq 0 ]; then
    echo "✅ Admin user created"
else
    echo "⚠️  Admin user creation failed (you can do this later)"
fi

echo ""
echo "=============================================="
echo "🎉 Migration Complete!"
echo "=============================================="
echo ""
echo "Next Steps:"
echo "1. Add these environment variables to Vercel:"
echo "   DATABASE_PROVIDER=postgresql"
echo "   DATABASE_URL=$NEON_URL"
echo ""
echo "2. Redeploy your application:"
echo "   git add ."
echo "   git commit -m 'chore: migrate to Neon PostgreSQL'"
echo "   git push origin main"
echo ""
echo "3. Test your production deployment"
echo ""
echo "📚 Full guide: NEON_SETUP_GUIDE.md"
echo ""
