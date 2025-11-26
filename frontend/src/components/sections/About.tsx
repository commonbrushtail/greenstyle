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
  const globeTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !globeTargetRef.current) return;

    const floatingGlobe = document.getElementById("floating-globe");
    if (!floatingGlobe) return;

    const ctx = gsap.context(() => {
      // Create timeline for the globe transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // When section enters viewport
          end: "top 20%", // When section is at top
          scrub: 1.5,
          // markers: true, // Uncomment for debugging
        },
      });

      // Animate the globe from Hero position to About section
      tl.to(floatingGlobe, {
        top: () => {
          const rect = globeTargetRef.current?.getBoundingClientRect();
          if (rect) {
            return rect.top + rect.height / 2;
          }
          return window.innerHeight / 2;
        },
        left: () => {
          const rect = globeTargetRef.current?.getBoundingClientRect();
          if (rect) {
            return rect.left + rect.width / 2;
          }
          return window.innerWidth / 2;
        },
        right: "auto",
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        ease: "power2.inOut",
      });

      // Fade in the content
      gsap.fromTo(
        ".about-content",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden section-padding"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Target position for 3D Globe */}
          <div className="relative">
            <div
              ref={globeTargetRef}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
            >
              {/* This is where the globe will land */}
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]" />
            </div>

            {/* Decorative background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30 rounded-3xl blur-3xl" />
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="about-content">
              
            </div>

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
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-gray-900 text-lg mb-1">
                    หลักสูตรอบรมคุณภาพ
                  </h3>
                  <p className="text-gray-600">
                    พัฒนาทีมงานด้วยความรู้ความเข้าใจเรื่องคาร์บอนฟุตพริ้นท์
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-gray-900 text-lg mb-1">
                    การคำนวณที่แม่นยำ
                  </h3>
                  <p className="text-gray-600">
                    วิเคราะห์และคำนวณ CFO/CFP ตามมาตรฐานสากล
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-gray-900 text-lg mb-1">
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
  );
}
