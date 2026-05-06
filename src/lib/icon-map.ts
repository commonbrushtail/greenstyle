import {
  GraduationCap,
  BarChart3,
  Package,
  ArrowRight,
  Award,
  TrendingDown,
  TrendingUp,
  Building2,
  Globe,
  Target,
  CheckCircle2,
  Users,
  Leaf,
  Briefcase,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  BarChart3,
  Package,
  ArrowRight,
  Award,
  TrendingDown,
  TrendingUp,
  Building2,
  Globe,
  Target,
  CheckCircle2,
  Users,
  Leaf,
  Briefcase,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lightbulb,
};

export const iconNames = Object.keys(iconMap);

export function getIcon(name: string | undefined): LucideIcon | null {
  if (!name) return null;
  return iconMap[name] ?? null;
}
