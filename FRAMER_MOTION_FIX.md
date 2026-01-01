# Framer Motion Server Error Fix

## Root Cause

The error "Cannot find module './vendor-chunks/framer-motion.js'" occurred because:

1. **`next.config.mjs` had `optimizePackageImports: ['framer-motion']`**: This experimental optimization can break vendor chunk resolution for framer-motion when it's used in client components that are dynamically imported.

2. **Dynamic imports with `ssr: true`**: Components using framer-motion (Navbar, Hero, Services, WhyUs, FeaturedProjects, CTA) were being dynamically imported with `ssr: true`, which attempted to server-render them. Framer-motion is a client-only library and cannot be rendered on the server.

3. **Direct imports in server component**: Navbar and Hero were directly imported in `app/[locale]/page.tsx` (a server component), which could cause Next.js to try to bundle framer-motion for server-side rendering.

## Changes Made

### 1. `next.config.mjs`
**Removed `framer-motion` from `optimizePackageImports`:**
```javascript
// Before
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
}

// After
experimental: {
  optimizePackageImports: ['lucide-react'],
}
```

**Why:** The package import optimization for framer-motion can interfere with vendor chunk resolution when used with dynamic imports.

### 2. `app/[locale]/page.tsx`
**Converted direct imports to dynamic imports with `ssr: false`:**

```typescript
// Before
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// After
const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false, // framer-motion is client-only
});

const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false, // framer-motion is client-only
});
```

**Changed `ssr: true` to `ssr: false` for framer-motion components:**
```typescript
// Before
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <LoadingSkeleton />,
  ssr: true, // ❌ Wrong - tries to server-render framer-motion
});

// After
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <LoadingSkeleton />,
  ssr: false, // ✅ Correct - framer-motion is client-only
});
```

**Applied to:** Services, WhyUs, FeaturedProjects, CTA (all use framer-motion)
**Kept `ssr: true` for:** Footer (doesn't use framer-motion)

## Verification

✅ **Build succeeds**: `npm run build` completes without errors
✅ **All components verified**: All framer-motion components have `"use client"` directive
✅ **No server-side framer-motion**: All framer-motion imports are in client components only

## Result

- ✅ `npm run dev` works reliably
- ✅ `npm run build` succeeds
- ✅ No more "Cannot find module './vendor-chunks/framer-motion.js'" error
- ✅ Framer-motion components render correctly on client-side only

