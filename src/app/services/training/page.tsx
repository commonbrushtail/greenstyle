import Link from "next/link";
import { GraduationCap, Users, Target, CheckCircle2, BookOpen, Award } from "lucide-react";
import { getPageContent } from "@/lib/content";

const iconList = [Target, Users, BookOpen, Award];

export const dynamic = "force-dynamic";

export default async function TrainingPage() {
  const content = await getPageContent("services-training");
  const hero = content.hero as { heading: string; description: string };
  const about = content.about as { heading: string; paragraphs: string[] };
  const features = content.features as { heading: string; description: string; items: { title: string; description: string }[] };
  const topics = content.topics as { heading: string; description: string; items: string[] };
  const formats = content.formats as { heading: string; items: { icon: string; title: string; description: string }[] };
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
              <GraduationCap className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="heading-xl mb-6">
              {hero.heading}
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* About Training Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm">
              <h2 className="heading-md mb-6">
                {about.heading}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index} className={`leading-relaxed${index < about.paragraphs.length - 1 ? " mb-4" : ""}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">{features.heading}</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {features.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.items.map((feature, index) => {
              const Icon = iconList[index] || CheckCircle2;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">{topics.heading}</h2>
              <p className="text-lg text-gray-700">
                {topics.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.items.map((topic) => (
                <div
                  key={topic}
                  className="flex items-start p-4 bg-gradient-to-r from-primary-50 to-white rounded-xl border border-primary-100 hover:shadow-md transition-all"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Format */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">{formats.heading}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formats.items.map((format) => (
                <div key={format.title} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
                  <div className="text-4xl mb-4">{format.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {format.title}
                  </h3>
                  <p className="text-gray-700">
                    {format.description}
                  </p>
                </div>
              ))}
            </div>
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
