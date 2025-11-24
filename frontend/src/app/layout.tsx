/**
 * Root Layout
 *
 * SSR Control: Comment/uncomment the "use client" directive below
 * - WITH "use client": Client-side only (no SSR, prevents hydration errors during dev)
 * - WITHOUT "use client": Server-side rendering enabled (for production)
 *
 * Current mode: Check NEXT_PUBLIC_DISABLE_SSR in .env.local
 * - true = CSR only (development mode)
 * - false = SSR enabled (production mode)
 */

// TOGGLE SSR: Uncomment the line below to disable SSR (Client-Side Rendering only)
"use client";

import { Sarabun, Prompt } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Configure Thai fonts
const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-sarabun',
  display: 'swap',
});

const prompt = Prompt({
  weight: ['400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-prompt',
  display: 'swap',
});

// Note: metadata export is not available in client components
// For SEO in production, remove "use client" directive above and add:
// export const metadata: Metadata = {
//   title: "Green Style Co., Ltd. | บริษัท กรีน สไตล์ จำกัด",
//   description: "ที่ปรึกษาด้านสิ่งแวดล้อม คาร์บอนฟุตพริ้นท์ และสินค้าเป็นมิตรกับสิ่งแวดล้อม",
//   keywords: ['คาร์บอนฟุตพริ้นท์', 'ที่ปรึกษาสิ่งแวดล้อม', 'สินค้าเป็นมิตรกับสิ่งแวดล้อม', 'Carbon Footprint', 'CFO', 'CFP'],
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} ${prompt.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
