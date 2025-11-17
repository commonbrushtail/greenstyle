import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="heading-xl text-gray-900">
              สร้างโลก<span className="text-gradient">ที่ยั่งยืน</span>
              <br />
              ด้วยกัน
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              ที่ปรึกษาด้านสิ่งแวดล้อม คาร์บอนฟุตพริ้นท์
              และผู้จัดจำหน่ายสินค้าเป็นมิตรกับสิ่งแวดล้อม
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary text-lg">
                ปรึกษาฟรี
              </Link>
              <Link href="/services" className="btn btn-outline text-lg">
                ดูบริการของเรา
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary-600">100+</div>
                <div className="text-sm text-gray-600">โครงการที่สำเร็จ</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-gray-600">ลูกค้าองค์กร</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">10+</div>
                <div className="text-sm text-gray-600">ปีของประสบการณ์</div>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative h-[400px] lg:h-[500px]">
            <div className="w-full h-full bg-gradient-to-br from-primary-200 to-accent-200 rounded-2xl flex items-center justify-center">
              <div className="text-center text-primary-700">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-sm">Hero Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20" />
    </section>
  );
}
