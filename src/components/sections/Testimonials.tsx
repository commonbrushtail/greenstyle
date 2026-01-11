import { CheckCircle2, Shield, Award } from "lucide-react";

const certifications = [
  {
    name: "องค์การบริหารจัดการก๊าซเรือนกระจก (อบก.)",
    description: "พันธมิตรในการรับรองคาร์บอนฟุตพริ้นท์",
    icon: Shield,
  },
  {
    name: "SDGs Alignment",
    description: "สอดคล้องกับเป้าหมายการพัฒนาที่ยั่งยืน",
    icon: Award,
  },
  {
    name: "ISO Standards",
    description: "ปฏิบัติตามมาตรฐานสากล",
    icon: CheckCircle2,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            เชื่อถือได้จาก<span className="text-primary-600">องค์กรชั้นนำ</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ด้วยประสบการณ์และความเชี่ยวชาญที่พิสูจน์แล้ว พร้อมการรับรองจากองค์กรมาตรฐานสากล
          </p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.name}
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50/50 to-white hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </div>
              );
            })}
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
