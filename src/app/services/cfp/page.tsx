import Link from "next/link";
import { Package, Globe, TrendingUp, Users, Leaf, CheckCircle2 } from "lucide-react";

const countries = [
  "สหราชอาณาจักร",
  "สาธารณรัฐฝรั่งเศส",
  "สวิตเซอร์แลนด์",
  "แคนาดา",
  "เยอรมนี",
  "สหรัฐอเมริกา",
  "ญี่ปุ่น",
  "เกาหลี",
];

const benefits = [
  {
    icon: Globe,
    title: "ยอมรับในระดับสากล",
    description: "เป็นมาตรฐานที่ใช้ในหลายประเทศทั่วโลก เพิ่มความน่าเชื่อถือให้กับผลิตภัณฑ์",
  },
  {
    icon: TrendingUp,
    title: "เพิ่มขีดความสามารถในการแข่งขัน",
    description: "ช่วยให้ผู้ประกอบการไทยแข่งขันได้ในตลาดโลกและเข้าถึงลูกค้าใหม่",
  },
  {
    icon: Users,
    title: "ให้ข้อมูลแก่ผู้บริโภค",
    description: "แสดงข้อมูลคาร์บอนฟุตพริ้นท์ให้ผู้บริโภคใช้ประกอบการตัดสินใจซื้อ",
  },
  {
    icon: Leaf,
    title: "กระตุ้นการผลิตสินค้าเป็นมิตรกับสิ่งแวดล้อม",
    description: "ผลักดันให้ผู้ผลิตปรับปรุงกระบวนการเพื่อลดการปล่อยก๊าซเรือนกระจก",
  },
];

const lifecycle = [
  { stage: "การได้มาซึ่งวัตถุดิบ", icon: "🌱" },
  { stage: "การขนส่ง", icon: "🚚" },
  { stage: "การผลิต/ประกอบชิ้นส่วน", icon: "🏭" },
  { stage: "การใช้งาน", icon: "👥" },
  { stage: "การจัดการซากหลังใช้งาน", icon: "♻️" },
];

export default function CFPPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-primary-100 rounded-2xl mb-6">
              <Package className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="heading-xl mb-6">
              คาร์บอนฟุตพริ้นท์<span className="text-primary-600">ผลิตภัณฑ์</span>
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Carbon Footprint Product (CFP)
            </p>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              คำนวณปริมาณก๊าซเรือนกระจกตลอดวัฏจักรชีวิตของผลิตภัณฑ์
              เพื่อแสดงข้อมูลให้ผู้บริโภคและเพิ่มขีดความสามารถในการแข่งขันในตลาดโลก
            </p>
          </div>
        </div>
      </section>

      {/* What is CFP */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6 text-center">
              คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์ <span className="text-primary-600">คืออะไร</span>
            </h2>
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong className="text-primary-600">คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์</strong> (Carbon Footprint
                for Products – CFP) หมายถึง{" "}
                <strong>ปริมาณก๊าซเรือนกระจกที่ปล่อยออกตลอดวัฏจักรชีวิตของผลิตภัณฑ์</strong>
                ตั้งแต่การได้มาซึ่งวัตถุดิบ การขนส่ง การประกอบชิ้นส่วน การใช้งาน และการจัดการซากหลังใช้งาน
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                พร้อมทั้งมีการ<strong className="text-primary-600">แสดงข้อมูลปริมาณคาร์บอนฟุตพริ้นท์</strong>
                บนสินค้าหรือผลิตภัณฑ์ต่างๆ เพื่อเป็นข้อมูลให้ผู้บริโภคได้ทราบว่าตลอดวัฏจักรชีวิตของผลิตภัณฑ์
                มีการปล่อยก๊าซเรือนกระจกออกมาปริมาณเท่าใด
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lifecycle */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">วัฏจักรชีวิตผลิตภัณฑ์</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              CFP คำนวณการปล่อยก๊าซเรือนกระจกในทุกขั้นตอนของผลิตภัณฑ์
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {lifecycle.map((item, index) => (
                <div key={item.stage} className="relative">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-md border border-primary-100">
                      <h3 className="text-lg font-bold text-gray-900">{item.stage}</h3>
                    </div>
                  </div>
                  {index < lifecycle.length - 1 && (
                    <div className="absolute left-10 top-20 w-0.5 h-6 bg-primary-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">ประโยชน์ของ CFP</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              การจัดทำคาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ช่วยเพิ่มมูลค่าให้กับผลิตภัณฑ์และองค์กร
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 border border-primary-100 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* International Recognition */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4">ความสำคัญในระดับสากล</h2>
              <p className="text-lg text-gray-700">
                การจัดทำคาร์บอนฟุตพริ้นท์ยังเป็นการช่วยเพิ่มขีดความสามารถในการแข่งขันของผู้ประกอบการไทยในตลาดโลก
                เนื่องจากในปัจจุบันมีหลายประเทศได้นำคาร์บอนฟุตพริ้นท์มาใช้แล้ว
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                ประเทศที่ใช้ CFP
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <div
                    key={country}
                    className="flex items-center p-3 bg-gradient-to-r from-primary-50 to-white rounded-lg border border-primary-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-800">{country}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 mb-2">ข้อมูลอ้างอิง</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                หนังสือแนวทางการประเมินคาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์
                ภายใต้โครงการส่งเสริมการใช้คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์ พิมพ์ครั้งที่ 3 (กันยายน 2554)
                โดย คณะกรรมการเทคนิคด้านคาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="heading-lg mb-4">สนใจจัดทำ CFP สำหรับผลิตภัณฑ์?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              ติดต่อเราเพื่อสอบถามรายละเอียดและค่าใช้จ่ายในการจัดทำคาร์บอนฟุตพริ้นท์ผลิตภัณฑ์
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
                ดูบริการอื่นๆ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
