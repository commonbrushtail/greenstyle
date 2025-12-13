import Link from "next/link";
import { Building2, Briefcase, Award, TrendingDown, Users } from "lucide-react";

const caseStudies = [
  {
    title: "โรงงานผลิตชิ้นส่วนอิเล็กทรอนิกส์",
    category: "Manufacturing",
    service: "CFO",
    icon: Building2,
    challenge: "ต้องการทราบปริมาณการปล่อยก๊าซเรือนกระจกเพื่อนำไปสู่การลด",
    solution:
      "จัดทำคาร์บอนฟุตพริ้นท์องค์กรครอบคลุมทั้ง Scope 1, 2 และ 3 พร้อมวิเคราะห์แหล่งปล่อยหลัก",
    results: [
      "ทราบปริมาณการปล่อย GHG 5,240 tCO2e/ปี",
      "ระบุจุดที่สามารถลดได้ถึง 15%",
      "ได้รับการรับรองจาก อบก.",
    ],
  },
  {
    title: "ผู้ผลิตเครื่องดื่มออร์แกนิค",
    category: "Food & Beverage",
    service: "CFP",
    icon: Briefcase,
    challenge: "ต้องการแสดงคาร์บอนฟุตพริ้นท์บนบรรจุภัณฑ์เพื่อสร้างความแตกต่าง",
    solution:
      "ประเมินคาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์ตลอดวัฏจักรชีวิต ตั้งแต่วัตถุดิบจนถึงการกำจัด",
    results: [
      "CFP = 0.35 kgCO2e/ขวด",
      "พบว่าบรรจุภัณฑ์มีส่วนมากที่สุด (45%)",
      "นำไปสู่การเปลี่ยนบรรจุภัณฑ์ลด 20%",
    ],
  },
  {
    title: "สำนักงานบริษัทเอกชน",
    category: "Office",
    service: "Training",
    icon: Award,
    challenge: "พนักงานขาดความรู้และความเข้าใจเรื่องการอนุรักษ์สิ่งแวดล้อม",
    solution:
      "จัดอบรมหลักสูตร Green Office และภาวะโลกร้อนแบบเชิงปฏิบัติการ",
    results: [
      "พนักงาน 120 คนเข้าร่วมอบรม",
      "ลดการใช้ไฟฟ้าลง 12% ใน 6 เดือน",
      "พนักงานมีส่วนร่วมคัดแยกขยะ 85%",
    ],
  },
];

const stats = [
  { number: "100+", label: "โครงการที่สำเร็จ", icon: Award },
  { number: "50+", label: "องค์กรที่ไว้วางใจ", icon: Building2 },
  { number: "10,000+", label: "ตัน CO2e ที่ช่วยลด", icon: TrendingDown },
  { number: "5,000+", label: "คนที่ผ่านการอบรม", icon: Users },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              ผลงาน<span className="text-primary-600">ของเรา</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              ตัวอย่างโครงการและความสำเร็จของเราในการช่วยเหลือองค์กรต่างๆ
              ให้บรรลุเป้าหมายด้านความยั่งยืนและสิ่งแวดล้อม
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center border border-primary-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 font-display mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-700">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">กรณีศึกษา</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              ตัวอย่างโครงการที่เราภูมิใจที่ได้เป็นส่วนหนึ่งในความสำเร็จ
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <div
                  key={study.title}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon & Category */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-3">
                          <Icon className="w-10 h-10 text-primary-600" />
                        </div>
                        <div className="inline-block px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                          {study.service}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                          {study.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">{study.category}</p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                              ความท้าทาย
                            </h4>
                            <p className="text-gray-700 pl-4">{study.challenge}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                              แนวทางแก้ไข
                            </h4>
                            <p className="text-gray-700 pl-4">{study.solution}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                              ผลลัพธ์
                            </h4>
                            <ul className="space-y-2 pl-4">
                              {study.results.map((result, idx) => (
                                <li key={idx} className="flex items-start text-gray-700">
                                  <span className="text-primary-600 mr-2">✓</span>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">
              อุตสาหกรรมที่<span className="text-primary-600">เราให้บริการ</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "การผลิต",
                "อาหารและเครื่องดื่ม",
                "โรงแรมและการท่องเที่ยว",
                "ค้าปลีก",
                "อสังหาริมทรัพย์",
                "การเงินและธนาคาร",
                "เทคโนโลยี",
                "บริการและสำนักงาน",
              ].map((industry) => (
                <div
                  key={industry}
                  className="p-4 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 hover:shadow-md transition-all"
                >
                  <p className="text-gray-800 font-medium">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="heading-lg mb-4">พร้อมที่จะเป็นส่วนหนึ่งของความสำเร็จ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              มาร่วมกันสร้างผลงานที่ยั่งยืนให้กับองค์กรของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                ขอใบเสนอราคา
              </Link>
              <Link
                href="/services"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                ดูบริการของเรา
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
