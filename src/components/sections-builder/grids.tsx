"use client";

import { CheckCircle2 } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import MaybeImage from "./MaybeImage";
import type {
  FeatureGridContent,
  StatsGridContent,
  IndustriesGridContent,
  TagsGridContent,
  TopicsListContent,
  FormatCardsContent,
} from "@/lib/sections";

/* -------------------- feature-grid -------------------- */
export function FeatureGrid({ content: c }: { content: FeatureGridContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {(c.heading || c.description) && (
          <div className="text-center mb-12">
            {c.heading && (
              <h2 className="heading-lg mb-4">
                <MaybeImage value={c.heading} />
              </h2>
            )}
            {c.description && (
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                <MaybeImage value={c.description} />
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(c.items ?? []).map((item, idx) => {
            const Icon = getIcon(item.iconName) ?? CheckCircle2;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <MaybeImage value={item.title} />
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <MaybeImage value={item.description} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- stats-grid -------------------- */
export function StatsGrid({ content: c }: { content: StatsGridContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(c.items ?? []).map((stat, idx) => {
            const Icon = getIcon(stat.iconName);
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center border border-primary-100 shadow-sm hover:shadow-md transition-all"
              >
                {Icon && (
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                )}
                <div className="text-3xl font-bold text-primary-600 font-display mb-2">
                  <MaybeImage value={stat.number} />
                </div>
                <div className="text-sm text-gray-700">
                  <MaybeImage value={stat.label} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- industries-grid -------------------- */
export function IndustriesGrid({ content: c }: { content: IndustriesGridContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">
            <MaybeImage value={c.heading} />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(c.items ?? []).map((industry, i) => (
              <div
                key={i}
                className="p-4 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 hover:shadow-md transition-all"
              >
                <p className="text-gray-800 font-medium">
                  <MaybeImage value={industry} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- tags-grid (countries / certifications) -------------------- */
export function TagsGrid({ content: c }: { content: TagsGridContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {(c.heading || c.description) && (
            <div className="text-center mb-10">
              {c.heading && (
                <h2 className="heading-lg mb-4">
                  <MaybeImage value={c.heading} />
                </h2>
              )}
              {c.description && (
                <p className="text-lg text-gray-700">
                  <MaybeImage value={c.description} />
                </p>
              )}
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm">
            {c.subheading && (
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                <MaybeImage value={c.subheading} />
              </h3>
            )}
            {c.subdescription && (
              <p className="text-gray-700 text-center mb-6">
                <MaybeImage value={c.subdescription} />
              </p>
            )}
            {c.listHeading && (
              <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">
                <MaybeImage value={c.listHeading} />
              </h4>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {(c.items ?? []).map((it, i) => {
                if (typeof it === "string") {
                  return (
                    <div
                      key={i}
                      className="flex items-center p-3 bg-gradient-to-r from-primary-50 to-white rounded-lg border border-primary-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-800">
                        <MaybeImage value={it} />
                      </span>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className="p-4 bg-gradient-to-r from-primary-50 to-white rounded-xl border border-primary-100"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">
                      <MaybeImage value={it.name} />
                    </div>
                    {it.description && (
                      <div className="text-xs text-gray-600">
                        <MaybeImage value={it.description} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {c.trustBadge && (
            <p className="text-center mt-8 text-sm text-gray-600">
              <MaybeImage value={c.trustBadge} />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------- topics-list -------------------- */
export function TopicsList({ content: c }: { content: TopicsListContent }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">
              <MaybeImage value={c.heading} />
            </h2>
            {c.description && (
              <p className="text-lg text-gray-700">
                <MaybeImage value={c.description} />
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(c.items ?? []).map((topic, i) => (
              <div
                key={i}
                className="flex items-start p-4 bg-gradient-to-r from-primary-50 to-white rounded-xl border border-primary-100 hover:shadow-md transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">
                  <MaybeImage value={topic} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- format-cards -------------------- */
export function FormatCards({ content: c }: { content: FormatCardsContent }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">
              <MaybeImage value={c.heading} />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(c.items ?? []).map((format, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-sm"
              >
                {format.icon && <div className="text-4xl mb-4">{format.icon}</div>}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <MaybeImage value={format.title} />
                </h3>
                <p className="text-gray-700">
                  <MaybeImage value={format.description} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
