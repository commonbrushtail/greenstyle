# Green Style Website - Setup Guide

## Tech Stack
- **Frontend**: Next.js 14+ (App Router)
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

---

## Prerequisites

Before starting, make sure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- Code editor (VS Code recommended)
- Sanity account (free at sanity.io)
- Vercel account (optional, for deployment)

---

## Project Setup Steps

### Step 1: Create Next.js Project

```bash
# Navigate to your project directory
cd c:\Users\commo\Project\greenstyle

# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest frontend --typescript --tailwind --app --eslint

# Options to select:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? Yes
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? No
```

### Step 2: Set Up Sanity Studio

```bash
# Create Sanity project in the same directory
npm create sanity@latest -- --project greenstyle-cms --dataset production

# Or run step by step:
cd c:\Users\commo\Project\greenstyle
mkdir sanity
cd sanity
npm create sanity@latest

# Options to select:
# ✔ Select project: Create new project
# ✔ Project name: Green Style CMS
# ✔ Use the default dataset configuration? Yes
# ✔ Dataset: production
# ✔ Output path: ./
# ✔ Select project template: Clean project with no predefined schemas
```

### Step 3: Install Additional Dependencies

```bash
# Navigate to Next.js frontend
cd frontend

# Install Sanity client for Next.js
npm install next-sanity @sanity/image-url

# Install additional useful packages
npm install @portabletext/react
npm install react-icons
npm install framer-motion # For animations (optional)

# Install Thai font support
npm install @fontsource/sarabun @fontsource/prompt
```

---

## Project Structure

```
greenstyle/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── about/          # About page
│   │   │   ├── services/       # Services pages
│   │   │   ├── products/       # Products pages
│   │   │   └── contact/        # Contact page
│   │   ├── components/         # React components
│   │   │   ├── ui/             # UI components
│   │   │   ├── sections/       # Page sections
│   │   │   └── layout/         # Layout components
│   │   ├── lib/                # Utilities
│   │   │   ├── sanity.ts       # Sanity client config
│   │   │   └── utils.ts        # Helper functions
│   │   └── styles/             # Global styles
│   ├── public/                 # Static assets
│   │   ├── images/
│   │   └── fonts/
│   ├── tailwind.config.ts      # Tailwind configuration
│   ├── next.config.js          # Next.js configuration
│   └── package.json
│
├── sanity/                      # Sanity Studio
│   ├── schemas/                # Content schemas
│   │   ├── index.ts            # Schema registry
│   │   ├── page.ts             # Page schema
│   │   ├── service.ts          # Service schema
│   │   ├── product.ts          # Product schema
│   │   ├── post.ts             # Blog post schema
│   │   └── settings.ts         # Site settings
│   ├── sanity.config.ts        # Sanity configuration
│   ├── sanity.cli.ts           # Sanity CLI config
│   └── package.json
│
├── docs/                        # Documentation (our MD files)
│   ├── README.md
│   ├── PROJECT-OVERVIEW.md
│   ├── SITEMAP.md
│   ├── DESIGN-REQUIREMENTS.md
│   ├── CONTENT-CHECKLIST.md
│   ├── TECHNICAL-SPECS.md
│   └── old-website-content.md
│
└── README.md                    # Main project README
```

---

## Configuration Files to Create

### 1. Sanity Client Configuration

**File**: `frontend/src/lib/sanity.ts`

```typescript
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you need real-time data
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### 2. Environment Variables

**File**: `frontend/.env.local`

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

### 3. Tailwind Configuration with Thai Fonts

**File**: `frontend/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Main green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          100: '#f5f1ed',
          200: '#e8dfd6',
          300: '#d4c5b0',
          400: '#b8a68d',
          500: '#8b7355',
        },
      },
      fontFamily: {
        sans: ['var(--font-sarabun)', 'system-ui', 'sans-serif'],
        display: ['var(--font-prompt)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

---

## Next Steps

### 1. Initialize Projects
- [ ] Create Next.js project
- [ ] Create Sanity project
- [ ] Install dependencies
- [ ] Set up environment variables

### 2. Configure Sanity Schemas
- [ ] Create content schemas (pages, services, products)
- [ ] Set up media handling
- [ ] Configure localization for Thai/English

### 3. Build Next.js Components
- [ ] Create layout components (header, footer, navigation)
- [ ] Build reusable UI components
- [ ] Create page templates
- [ ] Implement data fetching from Sanity

### 4. Styling
- [ ] Set up custom Tailwind theme
- [ ] Configure Thai fonts
- [ ] Create component styles
- [ ] Implement responsive design

### 5. Content Migration
- [ ] Import content from old website
- [ ] Add images and media
- [ ] Set up sample content for testing

### 6. Deploy
- [ ] Connect to Vercel
- [ ] Configure environment variables
- [ ] Deploy Sanity Studio
- [ ] Test production build

---

## Useful Commands

### Next.js (Frontend)
```bash
cd frontend

# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Type checking
npx tsc --noEmit
```

### Sanity (CMS)
```bash
cd sanity

# Development
npm run dev              # Start Sanity Studio (http://localhost:3333)
npm run build            # Build Sanity Studio
sanity deploy            # Deploy Studio to Sanity hosting
sanity manage            # Open project settings in browser

# Dataset operations
sanity dataset export production backup.tar.gz
sanity dataset import backup.tar.gz production
```

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tutorials
- [Next.js + Sanity Tutorial](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Thai Font Implementation](https://fonts.google.com/?subset=thai)

### Tools
- [Sanity Studio](https://www.sanity.io/studio)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## Tips

1. **Development Workflow**
   - Run both Next.js (`npm run dev`) and Sanity Studio (`npm run dev`) simultaneously
   - Use two terminal windows or a terminal multiplexer

2. **Content Modeling**
   - Start with simple schemas and iterate
   - Use Sanity's portable text for rich content
   - Plan your content structure before coding

3. **Performance**
   - Use Next.js Image component for all images
   - Implement proper caching strategies
   - Use static generation where possible

4. **Deployment**
   - Vercel auto-deploys from Git pushes
   - Deploy Sanity Studio separately
   - Set up preview URLs for content review

---

**Ready to start building?**

Run these commands to get started:
```bash
cd c:\Users\commo\Project\greenstyle
npx create-next-app@latest frontend --typescript --tailwind --app --eslint
```
