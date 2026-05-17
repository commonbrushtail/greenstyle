"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CmsImage from "@/components/ui/CmsImage";
import { ArrowRight, CheckCircle2, GraduationCap, Mail, Phone, MapPin, Clock } from "lucide-react";
import AnimatedFlowerSVG from "@/components/ui/AnimatedFlowerSVG";
import Threads from "@/components/Threads";
import { getIcon } from "@/lib/icon-map";
import MaybeImage, { isImageValue } from "./MaybeImage";
import type {
  FlowerAboutContent,
  ProcessStepsContent,
  LifecycleStagesContent,
  ServicesGridContent,
  AdditionalServicesContent,
  CaseStudiesContent,
  ContactInfoContent,
  TrainingShowcaseContent,
} from "@/lib/sections";

/* -------------------- flower-about -------------------- */
export function FlowerAbout({ content: c }: { content: FlowerAboutContent }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headingLines = (c.heading ?? "").split("\n");

  return (
    <section className="relative bg-white overflow-hidden section-padding">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] flex items-center justify-center">
              {mounted && <AnimatedFlowerSVG />}
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30 rounded-3xl blur-2xl md:blur-3xl" />
          </div>

          <div className="space-y-8">
            <h2 className="heading-xl text-gray-900">
              {isImageValue(c.heading) ? (
                <MaybeImage value={c.heading} />
              ) : (
                headingLines.map((line, i) => {
                  const isLast = i === headingLines.length - 1;
                  return (
                    <span key={i}>
                      {isLast ? <span className="text-primary-600">{line}</span> : line}
                      {i < headingLines.length - 1 && <br />}
                    </span>
                  );
                })
              )}
            </h2>

            <div className="space-y-4">
              {c.description && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  <MaybeImage value={c.description} />
                </p>
              )}
              {c.description2 && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  <MaybeImage value={c.description2} />
                </p>
              )}
            </div>

            <div className="space-y-4 pt-4">
              {(c.features ?? []).map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors text-2xl">
                    {isImageValue(feature.icon) ? (
                      <MaybeImage value={feature.icon} imgClassName="w-8 h-8 object-contain" />
                    ) : (
                      feature.icon
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 text-xl mb-1">
                      <MaybeImage value={feature.title} />
                    </h3>
                    <p className="text-gray-600">
                      <MaybeImage value={feature.description} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- process-steps -------------------- */
export function ProcessSteps({ content: c }: { content: ProcessStepsContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            <MaybeImage value={c.heading} />
          </h2>
          {c.description && (
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <MaybeImage value={c.description} />
            </p>
          )}
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {(c.steps ?? []).map((step, i, arr) => (
              <div
                key={i}
                className="relative bg-gradient-to-r from-primary-50 to-white rounded-2xl p-6 md:p-8 border border-primary-100 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    <MaybeImage value={step.number} imgClassName="w-10 h-10 object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <MaybeImage value={step.title} />
                    </h3>
                    <p className="text-gray-700">
                      <MaybeImage value={step.description} />
                    </p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-6 bg-primary-200 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- lifecycle-stages -------------------- */
export function LifecycleStages({ content: c }: { content: LifecycleStagesContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            <MaybeImage value={c.heading} />
          </h2>
          {c.description && (
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <MaybeImage value={c.description} />
            </p>
          )}
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {(c.stages ?? []).map((item, i, arr) => (
              <div key={i} className="relative">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl hover:scale-110 transition-transform">
                    {isImageValue(item.icon) ? (
                      <MaybeImage value={item.icon} imgClassName="w-12 h-12 object-contain" />
                    ) : (
                      item.icon
                    )}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md border border-primary-100">
                    <h3 className="text-lg font-bold text-gray-900">
                      <MaybeImage value={item.stage} />
                    </h3>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="absolute left-10 top-20 w-0.5 h-6 bg-primary-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- services-grid -------------------- */
export function ServicesGrid({ content: c }: { content: ServicesGridContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(c.items ?? []).map((service, i) => {
            const Icon = getIcon(service.iconName) ?? GraduationCap;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                  <MaybeImage value={service.title} />
                </h2>
                <p className="text-sm text-primary-600 font-medium mb-4">
                  <MaybeImage value={service.subtitle} />
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  <MaybeImage value={service.description} />
                </p>
                <ul className="space-y-3 mb-8">
                  {(service.features ?? []).map((f, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="w-2 h-2 rounded-full bg-primary-600" />
                      </span>
                      <span className="text-sm text-gray-700">
                        <MaybeImage value={f} />
                      </span>
                    </li>
                  ))}
                </ul>
                {service.href && (
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                  >
                    เรียนรู้เพิ่มเติม
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- additional-services -------------------- */
export function AdditionalServices({ content: c }: { content: AdditionalServicesContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="heading-lg mb-4">
            <MaybeImage value={c.heading} />
          </h2>
          <p className="text-lg text-gray-700">
            <MaybeImage value={c.description} />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(c.items ?? []).map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <MaybeImage value={item.title} />
              </h3>
              <p className="text-gray-700">
                <MaybeImage value={item.description} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- case-studies -------------------- */
export function CaseStudies({ content: c }: { content: CaseStudiesContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            <MaybeImage value={c.heading} />
          </h2>
          {c.description && (
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <MaybeImage value={c.description} />
            </p>
          )}
        </div>
        <div className="max-w-5xl mx-auto space-y-8">
          {(c.items ?? []).map((study, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-block px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      <MaybeImage value={study.service} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">
                      <MaybeImage value={study.title} />
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      <MaybeImage value={study.category} />
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                          ความท้าทาย
                        </h4>
                        <p className="text-gray-700 pl-4">
                          <MaybeImage value={study.challenge} />
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                          แนวทางแก้ไข
                        </h4>
                        <p className="text-gray-700 pl-4">
                          <MaybeImage value={study.solution} />
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                          ผลลัพธ์
                        </h4>
                        <ul className="space-y-2 pl-4">
                          {(study.results ?? []).map((r, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-primary-600 mr-2">✓</span>
                              <MaybeImage value={r} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- contact-info -------------------- */
export function ContactInfo({ content: c }: { content: ContactInfoContent }) {
  return (
    <section className="bg-white pt-10 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">ที่อยู่</h3>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    <MaybeImage value={c.address} />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">โทรศัพท์</h3>
                  <a
                    href={`tel:${(c.phone ?? "").replace(/-/g, "")}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <MaybeImage value={c.phone} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">อีเมล</h3>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <MaybeImage value={c.email} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">เวลาทำการ</h3>
                  <p className="text-gray-700">
                    <MaybeImage value={c.hours} />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {c.mapEmbedUrl && (
            <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100">
              <div className="w-full h-[500px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden">
                <iframe
                  src={c.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------- training-showcase -------------------- */
export function TrainingShowcase({ content: c }: { content: TrainingShowcaseContent }) {
  return (
    <>
      <div className="py-16 md:py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Threads amplitude={1.2} distance={3} enableMouseInteraction={false} />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-xl text-gray-900 mb-3">
              <MaybeImage value={c.title} />
              <br />
              <span className="text-primary-600">
                <MaybeImage value={c.subtitle} />
              </span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              <MaybeImage value={c.description} />
            </p>

            <div className="mb-10 bg-opacity-10 space-y-3 bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-3xl mx-auto border border-primary-100">
              {(c.courses ?? []).map((course, i) => (
                <div key={i} className="flex items-start text-left">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">
                    <MaybeImage value={course} />
                  </span>
                </div>
              ))}
            </div>

            {c.href && (
              <Link
                href={c.href}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl group text-lg"
              >
                <MaybeImage value={c.ctaText ?? "ดูหลักสูตรทั้งหมด"} />
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50" />
        <div className="container-custom relative z-10">
          <div className="space-y-16">
            {(c.otherServices ?? []).map((service, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                      {service.icon && <span className="text-9xl opacity-30">{service.icon}</span>}
                    </div>
                    {service.image && (
                      <CmsImage src={service.image} alt={service.title} fill className="object-cover" />
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="heading-md mb-4">
                      <MaybeImage value={service.title} />
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <MaybeImage value={service.description} />
                    </p>
                  </div>
                  {service.href && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                    >
                      เรียนรู้เพิ่มเติม
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
