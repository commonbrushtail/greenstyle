import { ComponentType } from "react";
import {
  HeroHome,
  HeroPage,
  HeroPageStats,
  TextBlock,
  ReferenceBlock,
  Cta,
  CtaSimple,
} from "./core";
import {
  FeatureGrid,
  StatsGrid,
  IndustriesGrid,
  TagsGrid,
  TopicsList,
  FormatCards,
} from "./grids";
import {
  FlowerAbout,
  ProcessSteps,
  LifecycleStages,
  ServicesGrid,
  AdditionalServices,
  CaseStudies,
  ContactInfo,
  TrainingShowcase,
} from "./complex";
import { FooterSection, HeaderSection } from "./globals";

export interface SectionDef {
  type: string;
  label: string;
  description: string;
  defaultContent: Record<string, unknown>;
  Component: ComponentType<{ content: never }>;
  /** True for global sections (footer/header) — not pickable in page builder. */
  global?: boolean;
}

export const sectionRegistry: Record<string, SectionDef> = {
  "hero-home": {
    type: "hero-home",
    label: "Home Hero",
    description: "Big home hero with animated globe, multi-line heading, and stats card.",
    Component: HeroHome as never,
    defaultContent: {
      heading: "ปรับเปลี่ยน\nองค์กรของคุณ\nสู่ความยั่งยืน",
      ctaText: "ปรึกษาฟรี",
      ctaHref: "/contact",
      supportingText:
        "ฝึกอบรมและให้คำปรึกษา\nคาร์บอนฟุตพริ้นท์ CFO/CFP\nเพื่อลดต้นทุนและสร้างผลกระทบเชิงบวก",
      stats: [
        { value: "100+", label: "โครงการ" },
        { value: "50+", label: "ลูกค้า" },
        { value: "10+", label: "ปี" },
      ],
    },
  },

  "hero-page": {
    type: "hero-page",
    label: "Page Hero",
    description: "Generic page hero with optional badge / icon / subtitle.",
    Component: HeroPage as never,
    defaultContent: {
      badge: "",
      iconName: "",
      heading: "หัวข้อหน้า",
      subtitle: "",
      description: "คำอธิบายของหน้านี้",
    },
  },

  "hero-page-stats": {
    type: "hero-page-stats",
    label: "Page Hero (with stats)",
    description: "Dark-purple hero with optional badge, description, and stats grid.",
    Component: HeroPageStats as never,
    defaultContent: {
      badge: "เกี่ยวกับเรา",
      heading: "พันธมิตรของคุณ\nเพื่อความยั่งยืน",
      description: "คำอธิบายเกี่ยวกับองค์กร",
      stats: [
        { value: "10+", label: "ปีประสบการณ์" },
        { value: "100+", label: "โครงการสำเร็จ" },
        { value: "50+", label: "ลูกค้าพึงพอใจ" },
      ],
    },
  },

  "flower-about": {
    type: "flower-about",
    label: "About (with flower SVG)",
    description: "Animated flower SVG + heading + paragraphs + 3 features (used on home).",
    Component: FlowerAbout as never,
    defaultContent: {
      heading: "พันธมิตรของคุณ\nเพื่อความยั่งยืน",
      description:
        "Green Style Co., Ltd. เป็นบริษัทที่ปรึกษาด้านสิ่งแวดล้อมชั้นนำ",
      description2: "เรามีประสบการณ์กว่า 10 ปี",
      features: [
        { icon: "🎓", title: "หลักสูตรอบรมคุณภาพ", description: "พัฒนาทีมงาน" },
        { icon: "📊", title: "การคำนวณที่แม่นยำ", description: "วิเคราะห์ตามมาตรฐาน" },
        { icon: "💡", title: "คำปรึกษาเชิงลึก", description: "แนวทางที่เหมาะสม" },
      ],
    },
  },

  "text-block": {
    type: "text-block",
    label: "Text Block",
    description: "Heading + paragraphs in a soft card.",
    Component: TextBlock as never,
    defaultContent: {
      heading: "หัวข้อ",
      paragraphs: ["ย่อหน้าที่หนึ่ง", "ย่อหน้าที่สอง"],
    },
  },

  "reference-block": {
    type: "reference-block",
    label: "Reference Block",
    description: "Small reference text card.",
    Component: ReferenceBlock as never,
    defaultContent: {
      heading: "อ้างอิง",
      text: "ที่มา: ...",
    },
  },

  "feature-grid": {
    type: "feature-grid",
    label: "Feature Grid",
    description: "Heading + description + grid of icon cards.",
    Component: FeatureGrid as never,
    defaultContent: {
      heading: "ประโยชน์",
      description: "คำอธิบายภาพรวม",
      items: [
        { iconName: "Award", title: "หัวข้อ 1", description: "รายละเอียด" },
        { iconName: "Target", title: "หัวข้อ 2", description: "รายละเอียด" },
        { iconName: "Lightbulb", title: "หัวข้อ 3", description: "รายละเอียด" },
      ],
    },
  },

  "stats-grid": {
    type: "stats-grid",
    label: "Stats Grid",
    description: "4 large stat cards with icons.",
    Component: StatsGrid as never,
    defaultContent: {
      items: [
        { iconName: "Award", number: "100+", label: "โครงการ" },
        { iconName: "Building2", number: "50+", label: "องค์กร" },
        { iconName: "TrendingDown", number: "30%", label: "ลดการปล่อยก๊าซ" },
        { iconName: "Users", number: "1000+", label: "ผู้เข้าอบรม" },
      ],
    },
  },

  "industries-grid": {
    type: "industries-grid",
    label: "Industries Grid",
    description: "Heading + grid of industry tags.",
    Component: IndustriesGrid as never,
    defaultContent: {
      heading: "อุตสาหกรรมที่เราให้บริการ",
      items: ["ภาครัฐ", "การผลิต", "อาหารและเครื่องดื่ม", "พลังงาน"],
    },
  },

  "tags-grid": {
    type: "tags-grid",
    label: "Tags Grid",
    description: "Heading + grid of small tagged items with checkmarks.",
    Component: TagsGrid as never,
    defaultContent: {
      heading: "หัวข้อ",
      description: "คำอธิบาย",
      items: ["รายการ 1", "รายการ 2", "รายการ 3", "รายการ 4"],
    },
  },

  "topics-list": {
    type: "topics-list",
    label: "Topics List",
    description: "Heading + 2-column list of topics with checkmarks.",
    Component: TopicsList as never,
    defaultContent: {
      heading: "หัวข้อที่ครอบคลุม",
      description: "คำอธิบาย",
      items: ["หัวข้อ 1", "หัวข้อ 2", "หัวข้อ 3", "หัวข้อ 4"],
    },
  },

  "format-cards": {
    type: "format-cards",
    label: "Format Cards",
    description: "3 cards with emoji + title + description.",
    Component: FormatCards as never,
    defaultContent: {
      heading: "รูปแบบการอบรม",
      items: [
        { icon: "💻", title: "ออนไลน์", description: "ผ่าน Zoom / Teams" },
        { icon: "🏢", title: "ในสถานที่", description: "อบรมที่บริษัทคุณ" },
        { icon: "🎯", title: "Custom", description: "ปรับให้เข้ากับองค์กร" },
      ],
    },
  },

  "process-steps": {
    type: "process-steps",
    label: "Process Steps",
    description: "Numbered process steps with vertical connector.",
    Component: ProcessSteps as never,
    defaultContent: {
      heading: "ขั้นตอนการทำงาน",
      description: "ภาพรวมของกระบวนการ",
      steps: [
        { number: "1", title: "เริ่มต้น", description: "รายละเอียด" },
        { number: "2", title: "วิเคราะห์", description: "รายละเอียด" },
        { number: "3", title: "ส่งมอบ", description: "รายละเอียด" },
      ],
    },
  },

  "lifecycle-stages": {
    type: "lifecycle-stages",
    label: "Lifecycle Stages",
    description: "Vertical list of emoji-marked stages.",
    Component: LifecycleStages as never,
    defaultContent: {
      heading: "วงจรชีวิตผลิตภัณฑ์",
      description: "คำอธิบาย",
      stages: [
        { stage: "วัตถุดิบ", icon: "🌱" },
        { stage: "การผลิต", icon: "🏭" },
        { stage: "การขนส่ง", icon: "🚚" },
        { stage: "การใช้งาน", icon: "🔧" },
        { stage: "การกำจัด", icon: "♻️" },
      ],
    },
  },

  "services-grid": {
    type: "services-grid",
    label: "Services Grid (with bullets)",
    description: "3-col service overview with icon, title, subtitle, bullet list.",
    Component: ServicesGrid as never,
    defaultContent: {
      items: [
        {
          iconName: "GraduationCap",
          title: "หลักสูตรอบรม",
          subtitle: "Training",
          description: "บริการอบรม",
          href: "/services/training",
          features: ["จุดเด่น 1", "จุดเด่น 2"],
        },
      ],
    },
  },

  "additional-services": {
    type: "additional-services",
    label: "Additional Services",
    description: "Heading + 3-col grid of simple service items.",
    Component: AdditionalServices as never,
    defaultContent: {
      heading: "บริการเพิ่มเติม",
      description: "คำอธิบาย",
      items: [
        { title: "บริการ 1", description: "รายละเอียด" },
        { title: "บริการ 2", description: "รายละเอียด" },
        { title: "บริการ 3", description: "รายละเอียด" },
      ],
    },
  },

  "case-studies": {
    type: "case-studies",
    label: "Case Studies",
    description: "List of case studies (challenge / solution / results).",
    Component: CaseStudies as never,
    defaultContent: {
      heading: "ผลงานของเรา",
      description: "ตัวอย่างโครงการที่ผ่านมา",
      items: [
        {
          title: "ลูกค้าตัวอย่าง",
          category: "อุตสาหกรรม",
          service: "CFO",
          challenge: "ปัญหาที่ลูกค้าเผชิญ",
          solution: "แนวทางที่เราเสนอ",
          results: ["ผลลัพธ์ 1", "ผลลัพธ์ 2"],
        },
      ],
    },
  },

  "contact-info": {
    type: "contact-info",
    label: "Contact Info + Map",
    description: "Address / phone / email / hours card next to a Google map.",
    Component: ContactInfo as never,
    defaultContent: {
      address: "ที่อยู่ของเรา\nบรรทัดที่ 2\nบรรทัดที่ 3",
      phone: "089-515-0247",
      email: "greenstyle.se@gmail.com",
      hours: "จันทร์-ศุกร์ 9:00-18:00",
      mapEmbedUrl: "",
    },
  },

  "training-showcase": {
    type: "training-showcase",
    label: "Training Showcase",
    description: "Featured training section with course list + alternating image/text panels.",
    Component: TrainingShowcase as never,
    defaultContent: {
      title: "หลักสูตรอบรม",
      subtitle: "ยกระดับทักษะ",
      description: "คำอธิบายหลักสูตร",
      href: "/services/training",
      ctaText: "ดูหลักสูตรทั้งหมด",
      courses: ["หลักสูตร 1", "หลักสูตร 2"],
      otherServices: [],
    },
  },

  cta: {
    type: "cta",
    label: "CTA Banner",
    description: "Gradient call-to-action with primary + optional secondary button.",
    Component: Cta as never,
    defaultContent: {
      heading: "พร้อมที่จะเริ่มต้นแล้วหรือยัง?",
      description: "ติดต่อเราเพื่อปรึกษา",
      primaryCta: { text: "ติดต่อเรา", href: "/contact" },
      secondaryCta: { text: "ดูบริการ", href: "/services" },
    },
  },

  "cta-simple": {
    type: "cta-simple",
    label: "CTA (simple)",
    description: "Simple soft-background heading + description block.",
    Component: CtaSimple as never,
    defaultContent: {
      heading: "พร้อมเริ่มโครงการของคุณ?",
      description: "ติดต่อเราวันนี้เพื่อปรึกษา",
    },
  },

  /* ---------------- Global sections (not pickable in page builder) ---------------- */
  footer: {
    type: "footer",
    label: "Footer",
    description: "Site footer (global).",
    Component: FooterSection as never,
    defaultContent: {},
    global: true,
  },

  header: {
    type: "header",
    label: "Header",
    description: "Site header / navigation (global).",
    Component: HeaderSection as never,
    defaultContent: {},
    global: true,
  },

  "site-status": {
    type: "site-status",
    label: "Site Visibility",
    description: "Toggles whether the public site is live or hidden.",
    Component: (() => null) as never,
    defaultContent: {
      live: true,
      heading: "เร็วๆ นี้",
      message: "เว็บไซต์ของเรากำลังจะเปิดใช้งาน\nกรุณากลับมาใหม่อีกครั้งเร็วๆ นี้",
    },
    global: true,
  },
};

/** Section types that can be added by the admin from the picker. */
export const pickableSectionTypes = Object.values(sectionRegistry).filter((d) => !d.global);
