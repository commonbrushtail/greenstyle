import Link from "next/link";
import { BarChart3, Award, TrendingDown, Building2, Globe, Target, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "การรับรองระดับประเทศ",
    description:
      "รับการรับรองจาก องค์การบริหารจัดการก๊าซเรือนกระจก (อบก.) และทราบปริมาณการปล่อยคาร์บอนฟุตพริ้นท์ขององค์กร",
  },
  {
    icon: TrendingDown,
    title: "ลดต้นทุนค่าใช้จ่าย",
    description:
      "นำไปสู่การจัดการลดการปล่อยคาร์บอนฟุตพริ้นท์ได้ถูกจุด เพื่อลดต้นทุนจากการบริหารจัดการทรัพยากรอย่างเหมาะสม",
  },
  {
    icon: Target,
    title: "Carbon Neutral",
    description:
      "สามารถนำไปสู่การชดเชยคาร์บอน (Carbon Offset) และการปล่อยคาร์บอนเป็นศูนย์ (Carbon Neutral) ได้",
  },
  {
    icon: Building2,
    title: "สร้างภาพลักษณ์ที่ดี",
    description:
      "สร้างภาพลักษณ์ที่ดีให้กับองค์กร ในการมีส่วนร่วมรับผิดชอบต่อสิ่งแวดล้อมและสังคม",
  },
  {
    icon: Globe,
    title: "เพิ่มโอกาสทางธุรกิจ",
    description:
      "เพิ่มโอกาสทางธุรกิจ ให้สามารถแข่งขันได้ในเวทีการค้าโลก",
  },
  {
    icon: CheckCircle2,
    title: "มีส่วนร่วมกับประเทศ",
    description:
      "มีส่วนร่วมในการลดปริมาณการปล่อยก๊าซเรือนกระจกของประเทศไทย ตามเป้าหมาย Paris Agreement",
  },
];

const steps = [
  {
    number: "01",
    title: "กำหนดขอบเขตการประเมิน",
    description: "กำหนดขอบเขตองค์กร ระยะเวลา และแหล่งปล่อยก๊าซเรือนกระจก",
  },
  {
    number: "02",
    title: "รวบรวมข้อมูล",
    description: "เก็บรวบรวมข้อมูลการใช้พลังงาน ทรัพยากร และกิจกรรมขององค์กร",
  },
  {
    number: "03",
    title: "คำนวณคาร์บอนฟุตพริ้นท์",
    description: "คำนวณปริมาณก๊าซเรือนกระจกตามมาตรฐาน ISO 14064-1",
  },
  {
    number: "04",
    title: "จัดทำรายงาน",
    description: "จัดทำรายงานคาร์บอนฟุตพริ้นท์และส่งขอการรับรอง",
  },
  {
    number: "05",
    title: "รับการรับรองและปรับปรุง",
    description: "รับการรับรองจาก อบก. และวางแผนลดการปล่อยก๊าซเรือนกระจก",
  },
];

export default function CFOPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-primary-100 rounded-2xl mb-6">
              <BarChart3 className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="heading-xl mb-6">
              คาร์บอนฟุตพริ้นท์<span className="text-primary-600">องค์กร</span>
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Carbon Footprint Organization (CFO)
            </p>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              บริการที่ปรึกษาการจัดทำคาร์บอนฟุตพริ้นท์สำหรับองค์กร
              เพื่อทราบปริมาณการปล่อยก๊าซเรือนกระจกและนำไปสู่การลดอย่างเป็นรูปธรรม
            </p>
          </div>
        </div>
      </section>

      {/* What is CFO */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6 text-center">
              "คาร์บอนฟุตพริ้นท์ขององค์กร" <span className="text-primary-600">คืออะไร</span>
            </h2>
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                "คาร์บอนฟุตพริ้นท์ขององค์กร" คือ{" "}
                <strong className="text-primary-600">
                  ปริมาณการปล่อยและดูดกลับก๊าซเรือนกระจก
                </strong>{" "}
                (Greenhouse gas emissions and removals) ที่เกิดขึ้นจากกิจกรรมการดำเนินงานขององค์กร
                วัดรวมอยู่ในรูปของตัน (กิโลกรัม) ของก๊าซคาร์บอนไดออกไซด์เทียบเท่า
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                เรามีบริการเป็นที่ปรึกษาการจัดทำคาร์บอนฟุตพริ้นท์สำหรับองค์กร (Carbon Footprint for Organization
                หรือ Corporate Carbon Footprint : CCF) ซึ่งจะทำให้องค์กรทราบถึงปริมาณการปล่อยก๊าซเรือนกระจก
                และนำไปสู่การลดปริมาณก๊าซเรือนกระจกได้อย่างเป็นรูปธรรม
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">ประโยชน์ที่ได้รับ</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              การจัดทำคาร์บอนฟุตพริ้นท์องค์กรจะช่วยให้องค์กรของคุณได้รับประโยชน์ในหลากหลายด้าน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">ขั้นตอนการดำเนินงาน</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              กระบวนการประเมินคาร์บอนฟุตพริ้นท์องค์กรตามมาตรฐาน ISO 14064-1
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative bg-gradient-to-r from-primary-50 to-white rounded-2xl p-6 md:p-8 border border-primary-100 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-6 bg-primary-200 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reference */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">ข้อมูลอ้างอิง</h3>
            <p className="text-gray-700 leading-relaxed">
              หนังสือแนวทางการประเมินคาร์บอนฟุตพริ้นท์ขององค์กร โดย องค์การบริหารจัดการก๊าซเรือนกระจก
              (องค์การมหาชน) พิมพ์ครั้งที่ 5 (ฉบับปรับปรุงครั้งที่ 3, ตุลาคม 2559)
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="heading-lg mb-4">พร้อมเริ่มต้นจัดทำ CFO?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              ติดต่อเราเพื่อสอบถามรายละเอียดและค่าใช้จ่ายในการจัดทำคาร์บอนฟุตพริ้นท์องค์กร
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
