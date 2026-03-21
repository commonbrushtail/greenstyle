import Link from "next/link";
import { BarChart3, Award, TrendingDown, Building2, Globe, Target, CheckCircle2 } from "lucide-react";
import { getPageContent } from "@/lib/content";

const iconList = [Award, TrendingDown, Target, Building2, Globe, CheckCircle2];

export const dynamic = "force-dynamic";

export default async function CFOPage() {
  const content = await getPageContent("services-cfo");
  const hero = content.hero as { heading: string; subtitle: string; description: string };
  const whatIs = content.what_is as { heading: string; paragraphs: string[] };
  const benefits = content.benefits as { heading: string; description: string; items: { title: string; description: string }[] };
  const process = content.process as { heading: string; description: string; steps: { number: string; title: string; description: string }[] };
  const reference = content.reference as { heading: string; text: string };
  const cta = content.cta as { heading: string; description: string };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-primary-100 rounded-2xl mb-6">
              <BarChart3 className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="heading-xl mb-6">
              {hero.heading}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {hero.subtitle}
            </p>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* What is CFO */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6 text-center">
              {whatIs.heading}
            </h2>
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm">
              {whatIs.paragraphs.map((paragraph, index) => (
                <p key={index} className={`text-lg text-gray-700 leading-relaxed${index < whatIs.paragraphs.length - 1 ? " mb-6" : ""}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">{benefits.heading}</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {benefits.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.items.map((benefit, index) => {
              const Icon = iconList[index] || CheckCircle2;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">{process.heading}</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {process.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {process.steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative bg-gradient-to-r from-primary-50 to-white rounded-2xl p-6 md:p-8 border border-primary-100 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                  {index < process.steps.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-6 bg-primary-200 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reference */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{reference.heading}</h3>
            <p className="text-gray-700 leading-relaxed">
              {reference.text}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="heading-lg mb-4">{cta.heading}</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                ขอใบเสนอราคา
              </Link>
              <Link
                href="/services"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                ดูบริการอื่นๆ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
