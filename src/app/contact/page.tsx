"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "โทรศัพท์",
    value: "089-515-0247",
    link: "tel:0895150247",
  },
  {
    icon: Mail,
    title: "อีเมล",
    value: "greenstyle.se@gmail.com",
    link: "mailto:greenstyle.se@gmail.com",
  },
  {
    icon: MapPin,
    title: "ที่อยู่",
    value: "กรุงเทพมหานคร ประเทศไทย",
    link: null,
  },
  {
    icon: Clock,
    title: "เวลาทำการ",
    value: "จันทร์ - ศุกร์ 9:00 - 18:00 น.",
    link: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Add form submission logic here
    setTimeout(() => {
      alert("ขอบคุณที่ติดต่อเรา! เราจะติดต่อกลับโดยเร็วที่สุด");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              ติดต่อ<span className="text-primary-600">เรา</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              ยินดีให้คำปรึกษาและตอบคำถามทุกเรื่องเกี่ยวกับบริการของเรา
              ติดต่อเราได้ทุกช่องทาง
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 border border-primary-100 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {info.value}
                  </p>
                </div>
              );

              return info.link ? (
                <a
                  key={info.title}
                  href={info.link}
                  className="block hover:scale-105 transition-transform"
                >
                  {content}
                </a>
              ) : (
                <div key={info.title}>{content}</div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="heading-md mb-3">
                  <span className="text-primary-600">ส่งข้อความ</span>ถึงเรา
                </h2>
                <p className="text-gray-700">
                  กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      อีเมล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      ชื่อบริษัท/องค์กร
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="ชื่อบริษัท (ถ้ามี)"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    บริการที่สนใจ <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">เลือกบริการ</option>
                    <option value="training">หลักสูตรอบรม</option>
                    <option value="cfo">คาร์บอนฟุตพริ้นท์องค์กร (CFO)</option>
                    <option value="cfp">คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)</option>
                    <option value="products">สินค้าเป็นมิตรกับสิ่งแวดล้อม</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    ข้อความ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="บอกเราเพิ่มเติมเกี่ยวกับความต้องการของคุณ..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "กำลังส่ง..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      ส่งข้อความ
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">พร้อมที่จะเริ่มต้น?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              เรายินดีให้คำปรึกษาและตอบทุกคำถาม
              ไม่ว่าจะเป็นเรื่องบริการ สินค้า หรือความยั่งยืนขององค์กร
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0895150247"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                โทรหาเรา
              </a>
              <a
                href="mailto:greenstyle.se@gmail.com"
                className="inline-flex items-center gap-2 bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                ส่งอีเมล
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
