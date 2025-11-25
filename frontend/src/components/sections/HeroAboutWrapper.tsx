"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { GraduationCap, BarChart3, Lightbulb } from "lucide-react";
import AnimatedGlobe from "@/components/ui/AnimatedHero-About";


// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroAboutWrapper() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const globeTargetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure client-only rendering for GSAP animations
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Wait for mount to complete before setting up animations
    if (!mounted || !wrapperRef.current || !globeRef.current || !aboutSectionRef.current || !globeTargetRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the globe from Hero to About section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
          invalidateOnRefresh: true, // Recalculate on resize
          // markers: true, // Debug markers enabled
        },
      });

      tl.to(globeRef.current, {
        x: () => {
          const globeRect = globeRef.current?.getBoundingClientRect();
          const targetRect = globeTargetRef.current?.getBoundingClientRect();
          if (!globeRect || !targetRect) return 0;
          return targetRect.left - globeRect.left + (targetRect.width - globeRect.width) / 2;
        },
        y: () => {
          const globeRect = globeRef.current?.getBoundingClientRect();
          const targetRect = globeTargetRef.current?.getBoundingClientRect();
          if (!globeRect || !targetRect) return 0;
          return targetRect.top - globeRect.top + (targetRect.height - globeRect.height) / 2;
        },
        scale: 1,
        ease: "power2.inOut",
      });

      // Fade in About content
      gsap.fromTo(
        ".about-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Update on window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Floating 3D Globe - will transition from Hero to About section */}
      {mounted && (
        <div
          ref={globeRef}
          id="floating-globe"
          className="absolute pointer-events-none z-20 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] lg:w-[500px] lg:h-[500px]"
          style={{
            top: 'calc(30vh - 250px)',
            right: '5%',
          }}
        >
          <AnimatedGlobe className="w-full h-full" />
        </div>
      )}

      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden min-h-[85vh] flex items-center"
      >
        <div className="container-custom py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Main Content - Takes up more space */}
            <div className="lg:col-span-7 space-y-8">
              {/* Large Headline with decorative leaf */}
              <div className="relative">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-relaxed">
                  ปรับเปลี่ยน
                  <br />
                  องค์กรของคุณ
                  <br />
                  <span className="relative inline-block">
                    <span className="text-primary-700">สู่ความยั่งยืน</span>
                  </span>
                </h1>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  ปรึกษาฟรี
                </Link>
              </div>
            </div>

            {/* Supporting Text - Right side */}
            <div className="lg:col-span-5 relative z-[20]">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-gray-800 font-display leading-relaxed">
                    ฝึกอบรมและให้คำปรึกษา
                    <br />
                    คาร์บอนฟุตพริ้นท์ CFO/CFP
                    <br />
                    เพื่อลดต้นทุนและสร้างผลกระทบเชิงบวก
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 font-display">
                      100+
                    </div>
                    <div className="text-xs text-gray-600 mt-1">โครงการ</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 font-display">
                      50+
                    </div>
                    <div className="text-xs text-gray-600 mt-1">ลูกค้า</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 font-display">
                      10+
                    </div>
                    <div className="text-xs text-gray-600 mt-1">ปี</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient blob - bottom right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-primary-200/30 via-accent-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Decorative gradient blob - top left */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* About Section */}
      <section
        ref={aboutSectionRef}
        className="relative bg-white overflow-hidden section-padding"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Target position for 3D Globe */}
            <div className="relative">
              <div
                ref={globeTargetRef}
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] flex items-center justify-center"
              >
                {/* This is where the globe will land */}
                <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] lg:w-[500px] lg:h-[500px]" />
              </div>

              {/* Decorative background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30 rounded-3xl blur-3xl" />
            </div>

            {/* Right side - Content */}
            <div className="space-y-8">
              <div className="about-content">
                <h2 className="heading-xl text-gray-900">
                  พันธมิตรของคุณ
                  <br />
                  <span className="text-primary-600">เพื่อความยั่งยืน</span>
                </h2>
              </div>

              <div className="about-content space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900 font-display">
                    Green Style Co., Ltd.
                  </strong>{" "}
                  เป็นบริษัทที่ปรึกษาด้านสิ่งแวดล้อมชั้นนำ
                  เชี่ยวชาญในการคำนวณและจัดการคาร์บอนฟุตพริ้นท์
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  เรามีประสบการณ์กว่า{" "}
                  <strong className="text-primary-600 font-semibold">
                    10 ปี
                  </strong>{" "}
                  ในการช่วยองค์กรต่างๆ ลดผลกระทบต่อสิ่งแวดล้อม
                  พร้อมสร้างมูลค่าทางธุรกิจอย่างยั่งยืน
                </p>
              </div>

              {/* Key Features */}
              <div className="about-content space-y-4 pt-4">
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <GraduationCap className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 text-xl mb-1">
                      หลักสูตรอบรมคุณภาพ
                    </h3>
                    <p className="text-gray-600">
                      พัฒนาทีมงานด้วยความรู้ความเข้าใจเรื่องคาร์บอนฟุตพริ้นท์
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <BarChart3 className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 text-xl mb-1">
                      การคำนวณที่แม่นยำ
                    </h3>
                    <p className="text-gray-600">
                      วิเคราะห์และคำนวณ CFO/CFP ตามมาตรฐานสากล
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Lightbulb className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 text-xl mb-1">
                      คำปรึกษาเชิงลึก
                    </h3>
                    <p className="text-gray-600">
                      แนวทางที่เหมาะสมเฉพาะสำหรับองค์กรของคุณ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-primary-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      </section>
    </div>
  );
}
