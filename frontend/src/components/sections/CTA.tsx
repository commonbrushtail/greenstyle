import Link from "next/link";

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-4">
            พร้อมที่จะเริ่มต้นเส้นทางสู่ความยั่งยืนแล้วหรือยัง?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-primary-50">
            ปรึกษาผู้เชี่ยวชาญของเราวันนี้ เพื่อค้นหาโซลูชันที่เหมาะสมกับองค์กรของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg"
            >
              ติดต่อเรา
            </Link>
            <Link
              href="/services"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg"
            >
              ดูบริการของเรา
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-primary-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-semibold mb-1">โทรศัพท์</div>
                <a href="tel:+66" className="text-primary-100 hover:text-white">
                  [เบอร์โทรศัพท์]
                </a>
              </div>
              <div>
                <div className="font-semibold mb-1">อีเมล</div>
                <a
                  href="mailto:info@greenstyle.co.th"
                  className="text-primary-100 hover:text-white"
                >
                  [อีเมล]
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
