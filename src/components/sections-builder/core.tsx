"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedGlobe from "@/components/ui/AnimatedHero-About";
import { getIcon } from "@/lib/icon-map";
import type {
  HeroHomeContent,
  HeroPageContent,
  HeroPageStatsContent,
  TextBlockContent,
  ReferenceBlockContent,
  CtaContent,
  CtaSimpleContent,
} from "@/lib/sections";

/* -------------------- hero-home -------------------- */
export function HeroHome({ content: c }: { content: HeroHomeContent }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lines = (c.heading ?? "").split("\n");
  return (
    <section
      id="hero-section"
      className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden min-h-[85vh] flex items-center"
    >
      <div className="container-custom pt-[150px] py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-relaxed">
              {lines.map((line, i) => {
                const isLast = i === lines.length - 1;
                return (
                  <span key={i}>
                    {isLast ? <span className="text-primary-700">{line}</span> : line}
                    {i < lines.length - 1 && <br />}
                  </span>
                );
              })}
            </h1>
            <div className="pt-4">
              <Link
                href={c.ctaHref}
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {c.ctaText}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-[20]">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
              <p className="text-xl md:text-2xl text-gray-800 font-display leading-relaxed whitespace-pre-line">
                {c.supportingText}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                {c.stats?.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-bold text-primary-600 font-display">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted && (
        <div
          className="mt-[50px] lg:mt-0 absolute pointer-events-none z-10 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] lg:w-[500px] lg:h-[500px]"
          style={{ top: "calc(30vh - 250px)", right: "5%", transform: "translateZ(0)" }}
        >
          <AnimatedGlobe className="w-full h-full" />
        </div>
      )}

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-primary-200/30 via-accent-200/20 to-transparent rounded-full blur-2xl md:blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-2xl md:blur-3xl pointer-events-none" />
    </section>
  );
}

/* -------------------- hero-page -------------------- */
export function HeroPage({ content: c }: { content: HeroPageContent }) {
  const Icon = getIcon(c.iconName);
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl" />
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {c.badge && (
            <div className="inline-block mb-6 px-4 py-2 bg-primary-100 rounded-full">
              <span className="text-sm font-semibold text-primary-700">{c.badge}</span>
            </div>
          )}
          {Icon && (
            <div className="inline-block p-3 bg-primary-100 rounded-2xl mb-6">
              <Icon className="w-12 h-12 text-primary-600" />
            </div>
          )}
          <h1 className="heading-xl mb-6 whitespace-pre-line">{c.heading}</h1>
          {c.subtitle && <p className="text-lg text-gray-600 mb-2">{c.subtitle}</p>}
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
            {c.description}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- hero-page-stats (about page hero) -------------------- */
export function HeroPageStats({ content: c }: { content: HeroPageStatsContent }) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {c.badge && (
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold">{c.badge}</span>
            </div>
          )}
          <h1 className="heading-xl mb-6 whitespace-pre-line">{c.heading}</h1>
          {c.description && (
            <p className="text-xl md:text-2xl leading-relaxed mb-12 text-white/90 max-w-3xl mx-auto">
              {c.description}
            </p>
          )}
          {c.stats && c.stats.length > 0 && (
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              {c.stats.map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                  <div className="text-3xl md:text-5xl font-bold font-display mb-2">
                    {s.value}
                  </div>
                  <div className="text-xs md:text-base text-white/80">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}

/* -------------------- text-block -------------------- */
export function TextBlock({ content: c }: { content: TextBlockContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {c.heading && <h2 className="heading-lg mb-6 text-center">{c.heading}</h2>}
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm">
            {(c.paragraphs ?? []).map((p, i) => (
              <p
                key={i}
                className={`text-lg text-gray-700 leading-relaxed${
                  i < (c.paragraphs?.length ?? 0) - 1 ? " mb-6" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- reference-block -------------------- */
export function ReferenceBlock({ content: c }: { content: ReferenceBlockContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{c.heading}</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{c.text}</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- cta -------------------- */
export function Cta({ content: c }: { content: CtaContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
          <h2 className="heading-lg mb-4">{c.heading}</h2>
          {c.description && (
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{c.description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {c.primaryCta && (
              <Link
                href={c.primaryCta.href}
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {c.primaryCta.text}
              </Link>
            )}
            {c.secondaryCta && (
              <Link
                href={c.secondaryCta.href}
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                {c.secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- cta-simple (contact bottom) -------------------- */
export function CtaSimple({ content: c }: { content: CtaSimpleContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">{c.heading}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            {c.description}
          </p>
        </div>
      </div>
    </section>
  );
}
