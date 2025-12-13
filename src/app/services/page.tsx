import Link from "next/link";
import { GraduationCap, BarChart3, Package, ArrowRight } from "lucide-react";

const services = [
  {
    title: "หลักสูตรอบรม",
    subtitle: "Environmental Training",
    description:
      "อบรมให้ความรู้เกี่ยวกับภาวะโลกร้อน ก๊าซเรือนกระจก และคาร์บอนฟุตพริ้นท์ เพื่อปรับเปลี่ยนพฤติกรรมให้เป็นมิตรกับสิ่งแวดล้อม",
    icon: GraduationCap,
    href: "/services/training",
    features: [
      "หลักสูตรเกี่ยวกับภาวะโลกร้อนและก๊าซเรือนกระจก",
      "การอบรมเรื่องสำนักงานสีเขียว (Green Office)",
      "กระบวนการมีส่วนร่วมและการปรับเปลี่ยนพฤติกรรม",
      "หลักสูตรสามารถปรับแต่งตามความต้องการ",
    ],
  },
  {
    title: "คาร์บอนฟุตพริ้นท์องค์กร",
    subtitle: "Carbon Footprint Organization (CFO)",
    description:
      "บริการที่ปรึกษาการจัดทำคาร์บอนฟุตพริ้นท์สำหรับองค์กร เพื่อทราบปริมาณการปล่อยก๊าซเรือนกระจกและนำไปสู่การลดอย่างเป็นรูปธรรม",
    icon: BarChart3,
    href: "/services/cfo",
    features: [
      "รับรองโดย องค์การบริหารจัดการก๊าซเรือนกระจก (อบก.)",
      "ลดต้นทุนจากการบริหารจัดการทรัพยากร",
      "นำไปสู่ Carbon Neutral ได้",
      "สร้างภาพลักษณ์ที่ดีให้องค์กร",
    ],
  },
  {
    title: "คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์",
    subtitle: "Carbon Footprint Product (CFP)",
    description:
      "คำนวณปริมาณก๊าซเรือนกระจกตลอดวัฏจักรชีวิตของผลิตภัณฑ์ เพื่อแสดงข้อมูลให้ผู้บริโภคและเพิ่มขีดความสามารถในการแข่งขัน",
    icon: Package,
    href: "/services/cfp",
    features: [
      "คำนวณตลอดวัฏจักรชีวิตผลิตภัณฑ์",
      "เป็นมาตรฐานสากลที่ยอมรับ",
      "เพิ่มความสามารถในการแข่งขันในตลาดโลก",
      "ให้ข้อมูลแก่ผู้บริโภคในการตัดสินใจ",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              บริการของเรา
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              บริการฝึกอบรมให้ความรู้ด้านสิ่งแวดล้อม เพื่อให้เกิดความเข้าใจในการปรับพฤติกรรม
              ให้ดำเนินชีวิตและทำงานอย่างเป็นมิตรกับสิ่งแวดล้อม พร้อมบริการคำนวณคาร์บอนฟุตพริ้นท์
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                    {service.title}
                  </h2>
                  <p className="text-sm text-primary-600 font-medium mb-4">
                    {service.subtitle}
                  </p>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="w-2 h-2 rounded-full bg-primary-600" />
                        </span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                  >
                    เรียนรู้เพิ่มเติม
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">บริการเพิ่มเติม</h2>
            <p className="text-lg text-gray-700">
              นอกจากบริการหลักแล้ว เรายังมีบริการอื่นๆ ที่สามารถช่วยองค์กรของคุณ
              ในการดำเนินงานอย่างยั่งยืน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Carbon Neutral Events
              </h3>
              <p className="text-gray-700">
                จัดงานที่ปล่อยคาร์บอนเป็นศูนย์ ด้วยการคำนวณและชดเชยคาร์บอน
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                การจัดการขยะแบบครบวงจร
              </h3>
              <p className="text-gray-700">
                ให้คำปรึกษาและวางแผนการจัดการขยะอย่างมีประสิทธิภาพ
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                ที่ปรึกษาความยั่งยืน
              </h3>
              <p className="text-gray-700">
                ให้คำปรึกษาด้านความยั่งยืนและ ESG ให้กับองค์กร
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="heading-lg mb-4">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
            <p className="text-xl mb-8 opacity-90">
              ปรึกษากับผู้เชี่ยวชาญของเราเพื่อหาบริการที่เหมาะสมกับองค์กรคุณ
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              ขอใบเสนอราคา
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
