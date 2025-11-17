import Link from "next/link";

const services = [
  {
    title: "คาร์บอนฟุตพริ้นท์องค์กร (CFO)",
    description: "คำนวณและประเมินปริมาณการปล่อยก๊าซเรือนกระจกขององค์กร",
    icon: "🏢",
    href: "/services/cfo",
  },
  {
    title: "คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)",
    description: "ประเมินผลกระทบด้านสิ่งแวดล้อมตลอดวัฏจักรชีวิตของผลิตภัณฑ์",
    icon: "📦",
    href: "/services/cfp",
  },
  {
    title: "หลักสูตรอบรม",
    description: "อบรมด้านสิ่งแวดล้อม ภาวะโลกร้อน และความยั่งยืน",
    icon: "🎓",
    href: "/services/training",
  },
];

export default function FeaturedServices() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">บริการของเรา</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            เราให้บริการที่ปรึกษาด้านสิ่งแวดล้อมและการอบรม
            เพื่อช่วยให้องค์กรของคุณบรรลุเป้าหมายด้านความยั่งยืน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="card p-8 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="heading-sm mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <span className="text-primary-600 font-medium inline-flex items-center">
                เรียนรู้เพิ่มเติม
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn btn-primary">
            ดูบริการทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}
