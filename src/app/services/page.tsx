import Link from "next/link";
import { GraduationCap, BarChart3, Package, ArrowRight } from "lucide-react";
import { getPageContent } from "@/lib/content";

const iconMap: Record<string, React.ElementType> = { GraduationCap, BarChart3, Package };
const iconList = [GraduationCap, BarChart3, Package];

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const content = await getPageContent("services");
  const hero = content.hero as { heading: string; description: string };
  const mainServices = content.main_services as { items: { title: string; subtitle: string; description: string; href: string; features: string[] }[] };
  const additional = content.additional_services as { heading: string; description: string; items: { title: string; description: string }[] };
  const cta = content.cta as { heading: string; description: string; ctaText: string };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">{hero.heading}</h1>
            <p className="text-xl text-gray-700 leading-relaxed">{hero.description}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainServices.items.map((service, idx) => {
              const Icon = iconList[idx] || GraduationCap;
              return (
                <div key={service.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">{service.title}</h2>
                  <p className="text-sm text-primary-600 font-medium mb-4">{service.subtitle}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="w-2 h-2 rounded-full bg-primary-600" />
                        </span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group">
                    เรียนรู้เพิ่มเติม
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">{additional.heading}</h2>
            <p className="text-lg text-gray-700">{additional.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additional.items.map((item) => (
              <div key={item.title} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="heading-lg mb-4">{cta.heading}</h2>
            <p className="text-xl mb-8 opacity-90">{cta.description}</p>
            <Link href="/contact" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              {cta.ctaText}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
