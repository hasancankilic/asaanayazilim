# AŞAANA YAZILIM - Enterprise Website

Modern, enterprise-level software company website built with Next.js 14, TypeScript, and Sanity CMS.

## 🚀 Features

- **Next.js 14** (App Router) with TypeScript
- **Sanity CMS** for content management
- **Multi-language** support (TR/EN) with next-intl
- **SEO Optimized** (metadata, sitemap, robots.txt, JSON-LD)
- **Contact Form** with email backend (Resend)
- **Analytics** (Google Analytics + Vercel Analytics)
- **PWA** support with offline capabilities
- **Security** headers and CSP
- **Performance** optimized

## 📦 Installation

```bash
npm install
```

## 🔧 Configuration

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Configure environment variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=info@yourdomain.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Set up Sanity CMS:

```bash
npx sanity init
```

Follow the prompts and use the existing `sanity.config.ts`.

## 🚀 Development

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📝 Admin Panel

Access the Sanity Studio admin panel at:
- `/admin` - Content management interface

## 🌍 Internationalization

The site supports Turkish (default) and English:
- `/tr` - Turkish version
- `/en` - English version

## 📁 Project Structure

```
/
├── app/
│   ├── [locale]/          # Internationalized routes
│   ├── admin/              # Sanity Studio
│   ├── api/                # API routes
│   └── actions/            # Server Actions
├── components/             # React components
├── lib/
│   ├── sanity/            # Sanity client & queries
│   └── analytics.ts       # Analytics helpers
├── sanity/
│   └── schemas/           # Sanity schemas
├── messages/              # i18n translations
└── public/                # Static assets
```

## 🔒 Security

- Security headers configured
- Rate limiting on contact form
- CSP (Content Security Policy) ready

## 📊 Analytics

- Google Analytics integration
- Vercel Analytics
- Event tracking for CTAs and forms

## 📱 PWA

- Manifest configured
- Offline support
- Add-to-home-screen ready

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

Private project - All rights reserved.
