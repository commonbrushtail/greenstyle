"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in the content
      gsap.fromTo(
        ".about-hero-content",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section - Completely Different Design */}
      <section
        ref={sectionRef}
        className="relative py-20 md:py-28 overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Small Badge */}
            <div className="about-hero-content inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold">เกี่ยวกับเรา</span>
            </div>

            {/* Main Heading */}
            <h1 className="about-hero-content heading-xl mb-6">
              พันธมิตรของคุณ
              <br />
              เพื่อความยั่งยืน
            </h1>

            {/* Description */}
            <p className="about-hero-content text-xl md:text-2xl leading-relaxed mb-12 text-white/90 max-w-3xl mx-auto">
              <strong className="font-display text-white">
                Green Style Co., Ltd.
              </strong>{" "}
              บริษัทที่ปรึกษาด้านสิ่งแวดล้อมชั้นนำ เชี่ยวชาญในการคำนวณและจัดการคาร์บอนฟุตพริ้นท์
              พร้อมสร้างมูลค่าทางธุรกิจอย่างยั่งยืน
            </p>

            {/* Stats Grid */}
            <div className="about-hero-content grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold font-display mb-2">10+</div>
                <div className="text-sm md:text-base text-white/80">ปีประสบการณ์</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold font-display mb-2">100+</div>
                <div className="text-sm md:text-base text-white/80">โครงการสำเร็จ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold font-display mb-2">50+</div>
                <div className="text-sm md:text-base text-white/80">ลูกค้าพึงพอใจ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-xl mb-3">
                หลักสูตรอบรมคุณภาพ
              </h3>
              <p className="text-gray-600 leading-relaxed">
                พัฒนาทีมงานด้วยความรู้ความเข้าใจเรื่องคาร์บอนฟุตพริ้นท์ จากวิทยากรผู้เชี่ยวชาญ
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-xl mb-3">
                การคำนวณที่แม่นยำ
              </h3>
              <p className="text-gray-600 leading-relaxed">
                วิเคราะห์และคำนวณ CFO/CFP ตามมาตรฐานสากล พร้อมรับรองจาก TGO
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-4xl">💡</span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-xl mb-3">
                คำปรึกษาเชิงลึก
              </h3>
              <p className="text-gray-600 leading-relaxed">
                แนวทางที่เหมาะสมเฉพาะสำหรับองค์กรของคุณ เพื่อความยั่งยืนที่แท้จริง
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
