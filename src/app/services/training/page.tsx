import Link from "next/link";
import { GraduationCap, Users, Target, CheckCircle2, BookOpen, Award } from "lucide-react";

const courseFeatures = [
  {
    icon: Target,
    title: "การปรับเปลี่ยนพฤติกรรม",
    description: "มุ่งเน้นให้ผู้เข้าอบรมสามารถนำความรู้ไปปฏิบัติได้จริง",
  },
  {
    icon: Users,
    title: "กระบวนการมีส่วนร่วม",
    description: "ให้ผู้เข้าร่วมทุกคนมีส่วนร่วมในกิจกรรม",
  },
  {
    icon: BookOpen,
    title: "เน้นความสนุก",
    description: "เรียนรู้บนพื้นฐานของความสนุก เพื่อให้เกิดความเข้าใจที่แท้จริง",
  },
  {
    icon: Award,
    title: "ปรับแต่งได้",
    description: "หลักสูตรสามารถปรับให้เหมาะสมกับความต้องการของแต่ละองค์กร",
  },
];

const topics = [
  "ภาวะโลกร้อนและผลกระทบ",
  "ก๊าซเรือนกระจกและแหล่งกำเนิด",
  "คาร์บอนฟุตพริ้นท์คืออะไร",
  "การคำนวณคาร์บอนฟุตพริ้นท์เบื้องต้น",
  "วิธีลดการปล่อยก๊าซเรือนกระจก",
  "สำนักงานสีเขียว (Green Office)",
  "SDGs และความยั่งยืน",
  "กิจกรรมเชิงปฏิบัติการ",
];

export default function TrainingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-primary-100 rounded-2xl mb-6">
              <GraduationCap className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="heading-xl mb-6">
              หลักสูตรอบรม<span className="text-primary-600">สิ่งแวดล้อม</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              ฝึกอบรมเกี่ยวกับภาวะโลกร้อน ก๊าซเรือนกระจก และคาร์บอนฟุตพริ้นท์
              เพื่อให้เกิดความเข้าใจและสามารถปรับเปลี่ยนพฤติกรรมให้เป็นมิตรกับสิ่งแวดล้อม
            </p>
          </div>
        </div>
      </section>

      {/* About Training Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm">
              <h2 className="heading-md mb-6">
                <span className="text-primary-600">กรีน สไตล์</span> มุ่งเน้นการปรับเปลี่ยนพฤติกรรม
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="leading-relaxed mb-4">
                  การปรับเปลี่ยนพฤติกรรมของบุคคลในการทำงานและดำเนินชีวิตอย่างเป็นมิตรกับสิ่งแวดล้อม
                  จะเกิดขึ้นได้ บุคคลต้อง<strong className="text-primary-600">มีความรู้</strong>
                  เพื่อให้เกิดความเข้าใจและทราบถึงแนวทางที่ตนเองจะสามารถปรับเปลี่ยนพฤติกรรมให้เป็นมิตรกับสิ่งแวดล้อมได้
                </p>
                <p className="leading-relaxed">
                  ดังนั้น เราจึงมีหลักสูตรอบรมเกี่ยวกับภาวะโลกร้อน ก๊าซเรือนกระจก และคาร์บอนฟุตพริ้นท์
                  โดยกระบวนการอบรมนั้น เน้น<strong className="text-primary-600">กระบวนการมีส่วนร่วม</strong>ของผู้เข้าร่วมทุกคน
                  บนพื้นฐานของความสนุก เพราะเมื่อเกิดความสนุกจะทำให้บุคคลอยากเรียนรู้
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">จุดเด่นของหลักสูตร</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              เรามุ่งมั่นให้การอบรมมีประสิทธิภาพและนำไปใช้ได้จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">หัวข้อที่ครอบคลุม</h2>
              <p className="text-lg text-gray-700">
                เนื้อหาที่ผู้เข้าอบรมจะได้เรียนรู้
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-start p-4 bg-gradient-to-r from-primary-50 to-white rounded-xl border border-primary-100 hover:shadow-md transition-all"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Format */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">รูปแบบการอบรม</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  In-House Training
                </h3>
                <p className="text-gray-700">
                  จัดอบรมภายในองค์กร สามารถปรับเนื้อหาให้เหมาะสมกับความต้องการ
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Public Training
                </h3>
                <p className="text-gray-700">
                  หลักสูตรเปิดสาธารณะ เหมาะสำหรับบุคคลทั่วไปที่สนใจ
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Online Training
                </h3>
                <p className="text-gray-700">
                  อบรมผ่านระบบออนไลน์ สะดวก ยืดหยุ่น เข้าถึงได้ง่าย
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="heading-lg mb-4">สนใจหลักสูตรอบรม?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              ติดต่อเราเพื่อสอบถามรายละเอียดหลักสูตร ราคา และกำหนดการอบรม
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
