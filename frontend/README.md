# Green Style Frontend

Next.js frontend for the Green Style Co., Ltd. website.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Fonts**: Sarabun & Prompt (Thai support)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Sanity credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-token
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   ├── about/            # About page
│   ├── services/         # Services pages
│   ├── products/         # Products pages
│   └── contact/          # Contact page
├── components/
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Page sections (Hero, CTA, etc.)
│   └── ui/               # Reusable UI components
├── lib/
│   ├── sanity.ts         # Sanity client configuration
│   ├── queries.ts        # GROQ queries
│   └── utils.ts          # Utility functions
└── styles/
    └── globals.css       # Global styles and Tailwind
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Custom Tailwind Classes

### Buttons
- `.btn` - Base button
- `.btn-primary` - Primary green button
- `.btn-secondary` - Earth tone button
- `.btn-outline` - Outline button

### Layout
- `.container-custom` - Max-width container with padding
- `.section-padding` - Standard section padding

### Typography
- `.heading-xl` - Extra large heading
- `.heading-lg` - Large heading
- `.heading-md` - Medium heading
- `.heading-sm` - Small heading

## Color Palette

### Primary (Green)
- `primary-500`: #22c55e (Main green)
- `primary-600`: #16a34a
- `primary-700`: #15803d

### Earth Tones
- `earth-500`: #8b7355

### Accent
- Used for highlights and CTAs

## Connecting to Sanity

Make sure your Sanity project is set up with the schemas defined in `/docs/SANITY-SCHEMAS.md`.

## Deployment

This project is optimized for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
