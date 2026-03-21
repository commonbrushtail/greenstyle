import Link from "next/link";
import { Building2, Briefcase, Award, TrendingDown, Users } from "lucide-react";
import { getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const studyIconList = [Building2, Briefcase, Award];
const statIconList = [Award, Building2, TrendingDown, Users];

export default async function CaseStudiesPage() {
  const content = await getPageContent("case-studies");
  const hero = content.hero as { heading: string; description: string };
  const stats = content.stats as { items: { number: string; label: string }[] };
  const studies = content.studies as {
    heading: string;
    description: string;
    items: {
      title: string;
      category: string;
      service: string;
      challenge: string;
      solution: string;
      results: string[];
    }[];
  };
  const industries = content.industries as { heading: string; items: string[] };
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
              {hero.heading.split(/(?=ของเรา)/)[0]}<span className="text-primary-600">{hero.heading.split(/(?=ของเรา)/)[1]}</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.items.map((stat, index) => {
              const Icon = statIconList[index] || Award;
              return (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center border border-primary-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 font-display mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-700">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">{studies.heading}</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {studies.description}
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {studies.items.map((study, index) => {
              const Icon = studyIconList[index] || Building2;
              return (
                <div
                  key={study.title}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon & Category */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-3">
                          <Icon className="w-10 h-10 text-primary-600" />
                        </div>
                        <div className="inline-block px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                          {study.service}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                          {study.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">{study.category}</p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                              ความท้าทาย
                            </h4>
                            <p className="text-gray-700 pl-4">{study.challenge}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                              แนวทางแก้ไข
                            </h4>
                            <p className="text-gray-700 pl-4">{study.solution}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                              ผลลัพธ์
                            </h4>
                            <ul className="space-y-2 pl-4">
                              {study.results.map((result, idx) => (
                                <li key={idx} className="flex items-start text-gray-700">
                                  <span className="text-primary-600 mr-2">✓</span>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">
              {industries.heading.split(/(?=เราให้บริการ)/)[0]}<span className="text-primary-600">{industries.heading.split(/(?=เราให้บริการ)/)[1]}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.items.map((industry) => (
                <div
                  key={industry}
                  className="p-4 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 hover:shadow-md transition-all"
                >
                  <p className="text-gray-800 font-medium">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
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
                ดูบริการของเรา
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
