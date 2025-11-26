"use client";

import Link from "next/link";
import AnimatedGlobe from "@/components/ui/AnimatedHero-About";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden min-h-[85vh] flex items-center"
    >
      {/* Floating 3D Globe - will transition to About section */}
      <div
        id="floating-globe"
        className="fixed w-[200px] h-[200px] md:w-[250px] md:h-[250px] pointer-events-none z-50"
       
      >
        <AnimatedGlobe className="w-full h-full" />
      </div>

      <div className="container-custom pt-36 pb-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content - Takes up more space */}
          <div className="lg:col-span-7 space-y-8">
            {/* Large Headline with decorative leaf */}
            <div className="relative">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl  font-bold text-gray-900 leading-relaxed">
                ปรับเปลี่ยน
                <br />
                องค์กรของคุณ
                <br />
                <span className="relative inline-block">
                  <span className="text-primary-700">สู่ความยั่งยืน</span>
          
                  {/* <div className="absolute -top-5 -right-12 md:-top-20 md:-right-20 text-6xl md:text-8xl opacity-100 pointer-events-none">
                    🌿
                  </div>  */}
             
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

            {/* Subheadline */}
            {/* <div className="pt-2">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                ฝึกอบรม คำนวณคาร์บอน และให้คำปรึกษาสิ่งแวดล้อม
                <br />
                เพื่อลดต้นทุนและสร้างผลกระทบเชิงบวก
              </p>
            </div> */}
          </div>

          {/* Supporting Text - Right side */}
          <div className="lg:col-span-5">
            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
              <div className="space-y-4">
                <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full" />
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
                  <div className="text-3xl font-bold text-primary-600 font-display">100+</div>
                  <div className="text-xs text-gray-600 mt-1">โครงการ</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 font-display">50+</div>
                  <div className="text-xs text-gray-600 mt-1">ลูกค้า</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 font-display">10+</div>
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
  );
}
