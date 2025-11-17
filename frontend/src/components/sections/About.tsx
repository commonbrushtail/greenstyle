export default function About() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="heading-lg mb-4">เกี่ยวกับ Green Style</h2>
          <p className="text-lg text-gray-700">
            บริษัท กรีน สไตล์ จำกัด มีวิสัยทัศน์มุ่งส่งเสริมให้บุคคลปรับเปลี่ยนพฤติกรรมของตนเอง
            ในการดำเนินชีวิตประจำวันและการทำงานให้เป็นมิตรกับสิ่งแวดล้อม
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="heading-sm mb-3">การฝึกอบรม</h3>
            <p className="text-gray-600">
              จัดกระบวนการฝึกอบรมให้ความรู้ สร้างความเข้าใจ
              และการมีส่วนร่วมด้านสิ่งแวดล้อม
            </p>
          </div>

          {/* Service 2 */}
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="heading-sm mb-3">คาร์บอนฟุตพริ้นท์</h3>
            <p className="text-gray-600">
              บริการคำนวณและให้คำปรึกษาด้านคาร์บอนฟุตพริ้นท์
              สำหรับองค์กรและผลิตภัณฑ์
            </p>
          </div>

          {/* Service 3 */}
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🛒</span>
            </div>
            <h3 className="heading-sm mb-3">สินค้าเป็นมิตรต่อสิ่งแวดล้อม</h3>
            <p className="text-gray-600">
              รวบรวมและจัดจำหน่ายสินค้าที่เป็นมิตรกับสิ่งแวดล้อม
              ที่ได้มาตรฐาน
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
