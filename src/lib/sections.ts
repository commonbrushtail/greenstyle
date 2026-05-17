// Type definitions for every section type the page builder knows about.
// The registry in src/components/sections-builder/registry.tsx wires these
// interfaces to React components and default content blobs.

export interface HeroHomeContent {
  heading: string;
  ctaText: string;
  ctaHref: string;
  supportingText: string;
  stats: { value: string; label: string }[];
}

export interface HeroPageContent {
  badge?: string;
  iconName?: string; // optional lucide icon name
  heading: string;
  subtitle?: string;
  description: string;
}

export interface HeroPageStatsContent extends HeroPageContent {
  stats: { value: string; label: string }[];
}

export interface FlowerAboutContent {
  heading: string;
  description: string;
  description2: string;
  features: { icon: string; title: string; description: string }[];
}

export interface TextBlockContent {
  heading: string;
  paragraphs: string[];
}

export interface FeatureGridContent {
  heading: string;
  description: string;
  items: { iconName?: string; title: string; description: string }[];
}

export interface ProcessStepsContent {
  heading: string;
  description: string;
  steps: { number: string; title: string; description: string }[];
}

export interface LifecycleStagesContent {
  heading: string;
  description: string;
  stages: { stage: string; icon: string }[];
}

export interface TagsGridContent {
  heading: string;
  description?: string;
  subheading?: string;
  subdescription?: string;
  listHeading?: string;
  items: (string | { name: string; description?: string })[];
  trustBadge?: string;
}

export interface TopicsListContent {
  heading: string;
  description: string;
  items: string[];
}

export interface FormatCardsContent {
  heading: string;
  items: { icon: string; title: string; description: string }[];
}

export interface ServicesGridContent {
  items: {
    title: string;
    subtitle: string;
    description: string;
    href: string;
    iconName?: string;
    features: string[];
  }[];
}

export interface AdditionalServicesContent {
  heading: string;
  description: string;
  items: { title: string; description: string }[];
}

export interface CaseStudiesContent {
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
}

export interface IndustriesGridContent {
  heading: string;
  items: string[];
}

export interface StatsGridContent {
  items: { number: string; label: string; iconName?: string }[];
}

export interface ReferenceBlockContent {
  heading: string;
  text: string;
}

export interface CtaContent {
  heading: string;
  description: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  variant?: "gradient-card" | "subtle";
}

export interface CtaSimpleContent {
  heading: string;
  description: string;
}

export interface ContactInfoContent {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
}

export interface TrainingShowcaseContent {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  ctaText?: string;
  courses: string[];
  otherServices: {
    title: string;
    description: string;
    icon?: string;
    image?: string;
    href: string;
  }[];
}

export interface FooterContent {
  companyName: string;
  companyDescription: string;
  facebookUrl?: string;
  serviceLinks: { text: string; href: string }[];
  quickLinks: { text: string; href: string }[];
  address: string;
  phone: string;
  email: string;
  copyright: string;
}

export interface HeaderContent {
  logoSrc: string;
  logoAlt: string;
  navigation: {
    name: string;
    href: string;
    dropdown?: { name: string; href: string }[];
  }[];
}

export interface PageLabelsContent {
  pages: { slug: string; label: string }[];
}

export interface ImageBlockContent {
  image: string;
  alt: string;
  caption?: string;
  alignment?: "left" | "center" | "right";
  maxWidth?: string; // e.g. "800px", "100%"
  rounded?: boolean;
}
