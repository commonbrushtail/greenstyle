"use client";

import Link from "next/link";
import Image from "next/image";
import Threads from "@/components/Threads";

const mainService = {
  title: "หลักสูตรอบรม",
  subtitle: "ยกระดับทักษะคาร์บอนฟุตพริ้นท์องค์กร",
  description: "ฝึกอบรมด้านสิ่งแวดล้อม ภาวะโลกร้อน และความยั่งยืน พร้อมทีมวิทยากรผู้เชี่ยวชาญ ตั้งแต่ระดับพื้นฐานจนถึงขั้นสูง รวม 5 หลักสูตร ครอบคลุมการคำนวณ Scope 1, 2, 3 และการรับรองมาตรฐาน",
  icon: "🎓",
  image: "/images/services/training.jpg",
  href: "/services/training",
  courses: [
    "รากฐานการคำนวณก๊าซเรือนกระจก (GHG Accounting Foundations)",
    "การคำนวณการปล่อยก๊าซจากการเผาไหม้ (Scope 1 - Combustion)",
    "การคำนวณการปล่อยก๊าซรั่วไหลและกระบวนการ (Scope 1 - Fugitive & Process)",
    "การคำนวณไฟฟ้าและการรายงาน อบก. (Scope 2 & GHG Reporting)",
    "การรับรอง CFO/CFR และหัวข้อขั้นสูง (Advanced Topics & TGO Certification)",
  ],
};

const otherServices = [
  {
    title: "คาร์บอนฟุตพริ้นท์องค์กร (CFO)",
    description: "บริการให้คำปรึกษาและคำนวณปริมาณก๊าซเรือนกระจกขององค์กร ตั้งแต่การเก็บข้อมูล วิเคราะห์ คำนวณ จัดทำรายงาน และยื่นขอรับรองมาตรฐาน TGO พร้อมแนะนำแนวทางลดการปล่อยก๊าซเรือนกระจกอย่างเป็นรูปธรรม",
    icon: "🏢",
    image: "/images/services/cfo.png",
    href: "/services/cfo",
  },
  {
    title: "คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)",
    description: "บริการให้คำปรึกษาและคำนวณคาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์ ครอบคลุมทุกขั้นตอนตั้งแต่วัตถุดิบ การผลิต การขนส่ง การใช้งาน จนถึงการกำจัด เพื่อรับฉลาก Carbon Label และเพิ่มมูลค่าสินค้า",
    icon: "📦",
    image: "/images/services/cfp.png",
    href: "/services/cfp",
  },
];

export default function FeaturedServices() {
  return (
    <section className="section-padding bg-white">
  

      {/* Main Service - Training Courses (Full Background) */}
      <div className="py-16 md:py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 relative overflow-hidden ">
        {/* Threads Background Effect */}
        <div className="absolute inset-0 opacity-10">
          <Threads
            amplitude={1.2}
            distance={3}
            enableMouseInteraction={false}
          />
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-xl text-gray-900 mb-3">
              {mainService.title}
              <br />
              <span className="text-primary-600">{mainService.subtitle}</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              {mainService.description}
            </p>

            {/* Course List */}
            <div className="mb-10 bg-opacity-10 space-y-3 bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-3xl mx-auto border border-primary-100 shadow-sm">
              {mainService.courses.map((course, index) => (
                <div key={index} className="flex items-start text-left">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 font-medium">{course}</span>
                </div>
              ))}
            </div>

            <Link
              href={mainService.href}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl group text-lg"
            >
              ดูหลักสูตรทั้งหมด
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Other Services - Two Columns */}
      <div className="py-16 md:py-20 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-green-50 to-blue-50/70 animate-gradient"></div>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="space-y-16">
            {otherServices.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                      <span className="text-9xl opacity-30">{service.icon}</span>
                    </div>
                    {/* Placeholder for actual image */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="heading-md mb-4">{service.title}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                  >
                    เรียนรู้เพิ่มเติม
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/services" className="btn btn-primary">
              ดูบริการทั้งหมด
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
