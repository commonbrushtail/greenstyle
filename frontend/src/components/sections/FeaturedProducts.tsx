import Link from "next/link";

const products = [
  {
    name: "กระดาษรีไซเคิล",
    category: "Certified Eco-Friendly",
    price: "฿199",
    image: "📄",
  },
  {
    name: "แก้วน้ำรักษ์โลก",
    category: "Eco-Friendly",
    price: "฿299",
    image: "🥤",
  },
  {
    name: "ถุงผ้าออร์แกนิค",
    category: "Certified Eco-Friendly",
    price: "฿149",
    image: "👜",
  },
  {
    name: "หลอดไฟ LED ประหยัดพลังงาน",
    category: "Promotes Eco-Friendly",
    price: "฿89",
    image: "💡",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">สินค้าเป็นมิตรกับสิ่งแวดล้อม</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            คัดสรรสินค้าคุณภาพที่เป็นมิตรกับสิ่งแวดล้อม
            ช่วยลดผลกระทบต่อโลกของเรา
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.name} className="card overflow-hidden group">
              <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>
              <div className="p-4">
                <div className="text-xs text-primary-600 font-medium mb-1">
                  {product.category}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">
                    {product.price}
                  </span>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-primary">
            ดูสินค้าทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}
