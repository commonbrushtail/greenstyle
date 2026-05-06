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
    label: "แบนเนอร์หน้าหลัก",
    description:
      "แบนเนอร์ใหญ่ของหน้าหลัก พร้อมลูกโลก 3 มิติ หัวข้อหลายบรรทัด และการ์ดสถิติ",
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
    label: "แบนเนอร์หน้าทั่วไป",
    description: "แบนเนอร์หัวเรื่องของหน้า รองรับป้าย / ไอคอน / หัวข้อรอง",
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
    label: "แบนเนอร์หน้า (พร้อมสถิติ)",
    description:
      "แบนเนอร์พื้นเขียวเข้ม พร้อมป้าย คำอธิบาย และตารางสถิติ (เหมาะสำหรับหน้าเกี่ยวกับเรา)",
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
    label: "เกี่ยวกับเรา (พร้อมดอกไม้แอนิเมชัน)",
    description:
      "SVG ดอกไม้เคลื่อนไหว + หัวข้อ + ย่อหน้า + จุดเด่น 3 ข้อ (ใช้ในหน้าหลัก)",
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
    label: "บล็อกข้อความ",
    description: "หัวข้อ + ย่อหน้า ในการ์ดพื้นอ่อน",
    Component: TextBlock as never,
    defaultContent: {
      heading: "หัวข้อ",
      paragraphs: ["ย่อหน้าที่หนึ่ง", "ย่อหน้าที่สอง"],
    },
  },

  "reference-block": {
    type: "reference-block",
    label: "บล็อกอ้างอิง",
    description: "การ์ดข้อความอ้างอิงขนาดเล็ก",
    Component: ReferenceBlock as never,
    defaultContent: {
      heading: "อ้างอิง",
      text: "ที่มา: ...",
    },
  },

  "feature-grid": {
    type: "feature-grid",
    label: "ตารางคุณสมบัติ",
    description: "หัวข้อ + คำอธิบาย + ตารางการ์ดไอคอน (ใช้แสดงประโยชน์/จุดเด่น)",
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
    label: "ตารางสถิติ",
    description: "การ์ดสถิติขนาดใหญ่ 4 ใบ พร้อมไอคอน",
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
    label: "ตารางอุตสาหกรรม",
    description: "หัวข้อ + ตารางป้ายชื่ออุตสาหกรรม",
    Component: IndustriesGrid as never,
    defaultContent: {
      heading: "อุตสาหกรรมที่เราให้บริการ",
      items: ["ภาครัฐ", "การผลิต", "อาหารและเครื่องดื่ม", "พลังงาน"],
    },
  },

  "tags-grid": {
    type: "tags-grid",
    label: "ตารางป้าย",
    description: "หัวข้อ + ตารางป้ายขนาดเล็ก พร้อมเครื่องหมายถูก (เช่น ใบรับรอง / ประเทศ)",
    Component: TagsGrid as never,
    defaultContent: {
      heading: "หัวข้อ",
      description: "คำอธิบาย",
      items: ["รายการ 1", "รายการ 2", "รายการ 3", "รายการ 4"],
    },
  },

  "topics-list": {
    type: "topics-list",
    label: "รายการหัวข้อ",
    description: "หัวข้อ + รายการแบบ 2 คอลัมน์ พร้อมเครื่องหมายถูก",
    Component: TopicsList as never,
    defaultContent: {
      heading: "หัวข้อที่ครอบคลุม",
      description: "คำอธิบาย",
      items: ["หัวข้อ 1", "หัวข้อ 2", "หัวข้อ 3", "หัวข้อ 4"],
    },
  },

  "format-cards": {
    type: "format-cards",
    label: "การ์ดรูปแบบ",
    description: "การ์ด 3 ใบ พร้อมอีโมจิ หัวข้อ และคำอธิบาย",
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
    label: "ขั้นตอนการทำงาน",
    description: "ขั้นตอนเรียงเลข พร้อมเส้นเชื่อมแนวตั้ง",
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
    label: "วงจรชีวิต",
    description: "รายการแนวตั้งของขั้นตอน พร้อมอีโมจิแต่ละขั้น",
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
    label: "ตารางบริการ (มีรายการย่อย)",
    description: "ภาพรวมบริการ 3 คอลัมน์ พร้อมไอคอน หัวข้อ หัวข้อรอง และรายการจุดเด่น",
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
    label: "บริการเพิ่มเติม",
    description: "หัวข้อ + ตาราง 3 คอลัมน์ของบริการอย่างง่าย",
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
    label: "ผลงานลูกค้า",
    description: "รายการผลงาน (ความท้าทาย / แนวทางแก้ไข / ผลลัพธ์)",
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
    label: "ข้อมูลติดต่อ + แผนที่",
    description: "การ์ดที่อยู่ / โทรศัพท์ / อีเมล / เวลาทำการ พร้อมแผนที่ Google",
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
    label: "หน้าแนะนำหลักสูตร",
    description: "ส่วนแนะนำหลักสูตรอบรม + รายการคอร์ส + แผงรูป-ข้อความสลับ",
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
    label: "แบนเนอร์ชวนลงมือ",
    description: "แบนเนอร์ชวนลงมือพื้นไล่สี พร้อมปุ่มหลัก + ปุ่มรอง (เลือกได้)",
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
    label: "ชวนลงมือ (อย่างง่าย)",
    description: "หัวข้อ + คำอธิบาย บนพื้นไล่สีอ่อน",
    Component: CtaSimple as never,
    defaultContent: {
      heading: "พร้อมเริ่มโครงการของคุณ?",
      description: "ติดต่อเราวันนี้เพื่อปรึกษา",
    },
  },

  /* ---------------- Global sections (not pickable in page builder) ---------------- */
  footer: {
    type: "footer",
    label: "ส่วนท้ายเว็บ",
    description: "ส่วนท้ายของเว็บไซต์ (ใช้ทั้งเว็บ)",
    Component: FooterSection as never,
    defaultContent: {},
    global: true,
  },

  header: {
    type: "header",
    label: "ส่วนหัวเว็บ / เมนู",
    description: "ส่วนหัวและเมนูนำทางของเว็บไซต์ (ใช้ทั้งเว็บ)",
    Component: HeaderSection as never,
    defaultContent: {},
    global: true,
  },

  "site-status": {
    type: "site-status",
    label: "สถานะการแสดงผลเว็บ",
    description: "สลับเปิด/ปิดการแสดงผลเว็บไซต์ต่อสาธารณะ",
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
