import { Award, Users, TrendingUp, CheckCircle2 } from "lucide-react";

const stats = [
  {
    number: "100+",
    label: "ลูกค้าองค์กร",
    description: "ที่ไว้วางใจให้เราให้คำปรึกษา",
    icon: Users,
  },
  {
    number: "50+",
    label: "โครงการที่สำเร็จ",
    description: "CFO และ CFP ที่ผ่านการรับรอง",
    icon: TrendingUp,
  },
  {
    number: "10+",
    label: "ปีของประสบการณ์",
    description: "ในด้านสิ่งแวดล้อมและความยั่งยืน",
    icon: Award,
  },
];

const certifications = [
  {
    name: "องค์การบริหารจัดการก๊าซเรือนกระจก (อบก.)",
    description: "พันธมิตรในการรับรองคาร์บอนฟุตพริ้นท์",
  },
  {
    name: "SDGs Alignment",
    description: "สอดคล้องกับเป้าหมายการพัฒนาที่ยั่งยืน",
  },
  {
    name: "ISO Standards",
    description: "ปฏิบัติตามมาตรฐานสากล",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            เชื่อถือได้จาก<span className="text-primary-600">องค์กรชั้นนำ</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ด้วยประสบการณ์และความเชี่ยวชาญที่พิสูจน์แล้ว
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-4xl font-bold text-primary-600 font-display mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm">
          <div className="text-center mb-10">
            <h3 className="heading-md mb-3">
              <span className="text-primary-600">การรับรอง</span>และมาตรฐาน
            </h3>
            <p className="text-gray-700">
              เราดำเนินงานตามมาตรฐานสากลและเป็นพันธมิตรกับองค์กรชั้นนำ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-br from-primary-50/50 to-white hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            ไว้วางใจโดยองค์กรชั้นนำทั้งภาครัฐและเอกชนในประเทศไทย
          </p>
        </div>
      </div>
    </section>
  );
}
