"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiFacebook, FiMail, FiPhone, FiMapPin, FiMenu, FiX } from "react-icons/fi";
import { useGlobalSection } from "@/components/admin/GlobalPreviewProvider";
import type { FooterContent, HeaderContent } from "@/lib/sections";

const footerDefault: FooterContent = {
  companyName: "บริษัท กรีน สไตล์ จำกัด",
  companyDescription:
    "ผู้เชี่ยวชาญด้านที่ปรึกษาสิ่งแวดล้อม และผู้จัดจำหน่ายสินค้าเป็นมิตรกับสิ่งแวดล้อม",
  facebookUrl: "https://www.facebook.com/GreenstyleSE/",
  serviceLinks: [
    { text: "หลักสูตรอบรม", href: "/services/training" },
    { text: "คาร์บอนฟุตพริ้นท์องค์กร (CFO)", href: "/services/cfo" },
    { text: "คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)", href: "/services/cfp" },
    { text: "ดูบริการทั้งหมด", href: "/services" },
  ],
  quickLinks: [
    { text: "เกี่ยวกับเรา", href: "/about" },
    { text: "ผลงาน", href: "/case-studies" },
    { text: "ติดต่อเรา", href: "/contact" },
  ],
  address:
    "60 หมู่บ้านกลางเมืองรามอินทรา-วัชรพล\nคลองถนน, สายไหม\nกรุงเทพมหานคร 10220",
  phone: "089-515-0247",
  email: "greenstyle.se@gmail.com",
  copyright:
    "Green Style Co., Ltd. (บริษัท กรีน สไตล์ จำกัด) All rights reserved.",
};

const headerDefault: HeaderContent = {
  logoSrc: "/images/logo.png",
  logoAlt: "Green Style",
  navigation: [
    { name: "หน้าหลัก", href: "/" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    {
      name: "บริการ",
      href: "/services",
      dropdown: [
        { name: "หลักสูตรอบรม", href: "/services/training" },
        { name: "คาร์บอนฟุตพริ้นท์องค์กร (CFO)", href: "/services/cfo" },
        { name: "คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)", href: "/services/cfp" },
      ],
    },
    { name: "ผลงาน", href: "/case-studies" },
    { name: "ติดต่อเรา", href: "/contact" },
  ],
};

/* -------------------- footer -------------------- */
export function FooterSection() {
  const override = useGlobalSection<FooterContent>("footer");
  const c = { ...footerDefault, ...(override ?? {}) };
  const currentYear = new Date().getFullYear();
  const copyright = (c.copyright ?? "").replace(/^©?\s*\d{4}\s*/, "");

  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/images/logo.png" alt="Green Style" width={60} height={60} className="object-contain" />
            </div>
            <div className="text-sm mb-4">
              <div>{c.companyName}</div>
              <div className="mt-2 whitespace-pre-line">{c.companyDescription}</div>
            </div>
            {c.facebookUrl && (
              <div className="flex space-x-4">
                <a href={c.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                  <FiFacebook className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-display font-semibold text-gray-900 mb-4">บริการของเรา</h3>
            <ul className="space-y-2 text-sm">
              {(c.serviceLinks ?? []).map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-gray-900 mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2 text-sm">
              {(c.quickLinks ?? []).map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-gray-900 mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line">{c.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="w-5 h-5 flex-shrink-0" />
                <a href={`tel:${(c.phone ?? "").replace(/-/g, "")}`} className="hover:text-primary-400 transition-colors">
                  {c.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="w-5 h-5 flex-shrink-0" />
                <a href={`mailto:${c.email}`} className="hover:text-primary-400 transition-colors">
                  {c.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 text-sm text-center">
          <p>© {currentYear} {copyright}</p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- header -------------------- */
export function HeaderSection() {
  const override = useGlobalSection<HeaderContent>("header");
  const c = { ...headerDefault, ...(override ?? {}) };
  const navigation = c.navigation ?? headerDefault.navigation;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image src={c.logoSrc} alt={c.logoAlt} width={55} height={55} className="object-contain" priority />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 ml-auto">
            {navigation.map((item, i) => (
              <div key={i} className="relative group">
                <Link href={item.href} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  {item.name}
                </Link>
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.dropdown.map((sub, j) => (
                        <Link
                          key={j}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-md text-gray-700">
            {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navigation.map((item, i) => (
              <div key={i} className="py-2">
                <Link
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="pl-4 space-y-2 mt-2">
                    {item.dropdown.map((sub, j) => (
                      <Link
                        key={j}
                        href={sub.href}
                        className="block py-1 text-sm text-gray-600 hover:text-primary-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
