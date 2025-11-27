import Link from "next/link";
import Threads from "@/components/Threads";
export default function CTA() {
  return (
    <section className="section-padding bg-white py-[200px] relative overflow-hidden">
      {/* Threads Background */}
      <div className="absolute inset-0 z-0 opacity-40 -rotate-[30deg]">
        <Threads
        amplitude={1}
        distance={4}
        enableMouseInteraction={false}
        
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-4 text-gray-900">
            พร้อมที่จะเริ่มต้นเส้นทางสู่ความยั่งยืนแล้วหรือยัง?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            ปรึกษาผู้เชี่ยวชาญของเราวันนี้ เพื่อค้นหาโซลูชันที่เหมาะสมกับองค์กรของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn btn-primary text-lg"
            >
              ติดต่อเรา
            </Link>
            <Link
              href="/services"
              className="btn btn-outline text-lg"
            >
              ดูบริการของเรา
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
