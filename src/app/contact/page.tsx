import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getPageContent("contact");
  const hero = content.hero as { heading: string; description: string };
  const info = content.info as {
    address: string;
    phone: string;
    email: string;
    hours: string;
    mapEmbedUrl: string;
  };
  const cta = content.cta as { heading: string; description: string };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              {hero.heading.split(/(?=เรา)/)[0]}<span className="text-primary-600">{hero.heading.split(/(?=เรา)/)[1]}</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className=" bg-white pt-10 pb-10">
        <div className="container-custom">
          {/* Map and Contact Info Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 flex flex-col justify-center">
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ที่อยู่</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {info.address.split('\n').map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">โทรศัพท์</h3>
                    <a href={`tel:${info.phone.replace(/-/g, '')}`} className="text-gray-700 hover:text-primary-600 transition-colors">
                      {info.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">อีเมล</h3>
                    <a href={`mailto:${info.email}`} className="text-gray-700 hover:text-primary-600 transition-colors">
                      {info.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">เวลาทำการ</h3>
                    <p className="text-gray-700">{info.hours}</p>
                  </div>
                </div>
              </div>

              <div>

              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100">
              <div className="w-full h-[500px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden">
                <iframe
                  src={info.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Green Style Company Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">{cta.heading}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {cta.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${info.phone.replace(/-/g, '')}`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                โทรหาเรา
              </a>
              <a
                href={`mailto:${info.email}`}
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
