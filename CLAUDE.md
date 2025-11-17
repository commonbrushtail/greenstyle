# Claude AI Development Guide

This document provides guidance for Claude (or any AI assistant) when working on the Green Style website project.

---

## Project Context

**Project**: Green Style Co., Ltd. Website
**Tech Stack**: Next.js 15 + Sanity CMS + Tailwind CSS + TypeScript
**Purpose**: Environmental consulting company website (Carbon footprint services & eco-products)
**Language**: Thai (primary), English (secondary)

---

## Code Writing Standards

### General Principles

1. **Always read before write**: Use the Read tool to check existing code before modifying
2. **Follow existing patterns**: Match the style and structure of existing components
3. **TypeScript strict mode**: Use proper TypeScript types, no `any` unless absolutely necessary
4. **Functional components**: Always use React functional components with hooks
5. **Server/Client components**: Mark with `"use client"` only when necessary (interactivity, hooks)

### File Structure Conventions

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── (route)/           # Route groups
│   ├── layout.tsx         # Layouts
│   └── page.tsx           # Pages
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (Hero, CTA, etc.)
│   └── ui/                # Reusable UI components (Button, Card, etc.)
├── lib/
│   ├── sanity.ts          # Sanity client
│   ├── queries.ts         # GROQ queries
│   └── utils.ts           # Utility functions
└── styles/
    └── globals.css        # Global styles
```

### Naming Conventions

**Files**:
- Components: `PascalCase.tsx` (e.g., `FeaturedServices.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatCurrency.ts`)
- Pages: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

**Variables & Functions**:
- Components: `PascalCase` (e.g., `const HeroSection = () => {}`)
- Functions: `camelCase` (e.g., `const fetchData = () => {}`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `const API_URL = ''`)
- Types/Interfaces: `PascalCase` (e.g., `interface UserProps {}`)

**CSS Classes**:
- Use Tailwind utilities first
- Custom classes: `kebab-case` (e.g., `.hero-section`)
- BEM for complex components if needed

---

## Component Structure Template

### Server Component (Default)

```typescript
// src/components/sections/ExampleSection.tsx
import { client } from '@/lib/sanity'
import { exampleQuery } from '@/lib/queries'

interface ExampleSectionProps {
  title?: string
  // ... other props
}

export default async function ExampleSection({ title }: ExampleSectionProps) {
  // Fetch data from Sanity
  const data = await client.fetch(exampleQuery)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="heading-lg mb-8">{title}</h2>
        {/* Content */}
      </div>
    </section>
  )
}
```

### Client Component (Interactive)

```typescript
// src/components/ui/ExampleButton.tsx
"use client"

import { useState } from 'react'

interface ExampleButtonProps {
  label: string
  onClick?: () => void
}

export default function ExampleButton({ label, onClick }: ExampleButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    onClick?.()
    // ... logic
  }

  return (
    <button
      onClick={handleClick}
      className="btn btn-primary"
      disabled={isLoading}
    >
      {label}
    </button>
  )
}
```

---

## Styling Guidelines

### Use Tailwind Utilities First

```tsx
// ✅ Good - Use Tailwind utilities
<div className="flex items-center justify-between px-4 py-2 bg-primary-600 text-white rounded-lg">

// ❌ Avoid - Custom CSS unless necessary
<div className="custom-header">
```

### Custom Utility Classes (Already Defined)

Use these pre-built classes from `globals.css`:

**Buttons**:
- `.btn` - Base button
- `.btn-primary` - Green primary button
- `.btn-secondary` - Earth tone button
- `.btn-outline` - Outline button

**Layout**:
- `.container-custom` - Max-width container with padding
- `.section-padding` - Standard section padding (py-16 md:py-24)

**Typography**:
- `.heading-xl` - Extra large heading
- `.heading-lg` - Large heading
- `.heading-md` - Medium heading
- `.heading-sm` - Small heading
- `.text-gradient` - Gradient text effect

### Responsive Design

Always use mobile-first approach:

```tsx
// ✅ Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ Desktop-first (avoid)
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```

---

## Data Fetching from Sanity

### GROQ Query Pattern

Add queries to `src/lib/queries.ts`:

```typescript
// src/lib/queries.ts
export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  icon
}`
```

### Fetching in Server Component

```typescript
import { client } from '@/lib/sanity'
import { serviceBySlugQuery } from '@/lib/queries'

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await client.fetch(serviceBySlugQuery, { slug: params.slug })

  if (!service) {
    notFound()
  }

  return (
    <div>
      <h1>{service.title}</h1>
      {/* ... */}
    </div>
  )
}
```

### Image Optimization

```typescript
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

// For Sanity images
<Image
  src={urlFor(image).width(800).url()}
  alt={image.alt || 'Description'}
  width={800}
  height={600}
  className="rounded-lg"
/>
```

---

## Thai Language Guidelines

### Text Content

- **Primary language**: Thai
- **Use proper Thai typography**: No broken sentences
- **Button text**: Thai (e.g., "ติดต่อเรา", "ดูเพิ่มเติม")
- **Navigation**: Thai labels
- **SEO**: Include Thai keywords in meta tags

### Font Usage

```tsx
// Headings - use display font (Prompt)
<h1 className="font-display text-4xl">หัวข้อ</h1>

// Body text - use sans font (Sarabun)
<p className="font-sans text-base">เนื้อหา</p>
```

---

## Page Creation Checklist

When creating a new page, ensure:

- [ ] Create `page.tsx` in appropriate route folder
- [ ] Add proper TypeScript types for params and props
- [ ] Include SEO metadata (title, description)
- [ ] Use semantic HTML (`<section>`, `<article>`, etc.)
- [ ] Make it responsive (mobile-first)
- [ ] Add loading state if needed (`loading.tsx`)
- [ ] Handle errors (`error.tsx`)
- [ ] Test on mobile viewport
- [ ] Add to navigation menu if needed

---

## Common Patterns

### Loading State

```typescript
// app/services/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  )
}
```

### Error Handling

```typescript
// app/services/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container-custom section-padding text-center">
      <h2 className="heading-lg mb-4">เกิดข้อผิดพลาด</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button onClick={reset} className="btn btn-primary">
        ลองอีกครั้ง
      </button>
    </div>
  )
}
```

### Not Found

```typescript
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-custom section-padding text-center">
      <h1 className="heading-xl mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">ไม่พบหน้าที่คุณกำลังมองหา</p>
      <Link href="/" className="btn btn-primary">
        กลับหน้าหลัก
      </Link>
    </div>
  )
}
```

---

## SEO Best Practices

### Metadata Template

```typescript
// app/services/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บริการของเรา | Green Style',
  description: 'บริการที่ปรึกษาด้านสิ่งแวดล้อม คาร์บอนฟุตพริ้นท์ และหลักสูตรอบรม',
  keywords: ['คาร์บอนฟุตพริ้นท์', 'ที่ปรึกษาสิ่งแวดล้อม', 'CFO', 'CFP'],
  openGraph: {
    title: 'บริการของเรา | Green Style',
    description: 'บริการที่ปรึกษาด้านสิ่งแวดล้อม',
    images: ['/og-image.jpg'],
  },
}
```

---

## Testing Checklist

Before marking a feature complete:

- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1440px width)
- [ ] Check Thai text rendering
- [ ] Verify all links work
- [ ] Test with real Sanity data (if applicable)
- [ ] Check console for errors
- [ ] Verify SEO meta tags
- [ ] Test loading and error states
- [ ] Accessibility check (keyboard navigation, alt text)

---

## Git Commit Guidelines

Use conventional commits:

```
feat: add contact form component
fix: resolve mobile menu navigation issue
style: update button hover states
docs: update README with deployment steps
refactor: simplify hero section logic
```

---

## Common Pitfalls to Avoid

❌ **Don't**:
- Use `any` type in TypeScript
- Import `'use client'` unnecessarily
- Forget to handle loading/error states
- Hard-code data (use Sanity CMS)
- Ignore mobile responsiveness
- Mix Thai and English in UI (stay consistent)
- Use inline styles (use Tailwind)

✅ **Do**:
- Use TypeScript types properly
- Server components by default
- Handle edge cases
- Fetch from Sanity CMS
- Mobile-first design
- Consistent Thai language
- Tailwind utilities

---

## Questions to Ask Before Coding

1. Is this a server or client component?
2. Do I need to fetch data from Sanity?
3. Is this reusable? Should it be in `/ui`?
4. Does this need to be responsive?
5. Are there similar components I can reference?
6. Do I need loading/error states?
7. Is the Thai text properly formatted?
8. Does this need SEO metadata?

---

## Useful Resources

- **Project Docs**: Check all `.md` files in root directory
- **Design System**: See `DESIGN-REQUIREMENTS.md`
- **Sanity Schemas**: See `SANITY-SCHEMAS.md`
- **Content**: See `old-website-content.md`
- **Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com/docs
- **Sanity**: https://www.sanity.io/docs

---

## When in Doubt

1. Check existing components for patterns
2. Review the markdown documentation
3. Ask the user for clarification
4. Follow Next.js and React best practices
5. Keep it simple and maintainable

---

**Last Updated**: 2025-11-17
**Maintained By**: Development Team
