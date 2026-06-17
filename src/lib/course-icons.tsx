import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Boxes,
  Calculator,
  Cloud,
  Code,
  Code2,
  Container,
  Database,
  FileText,
  GitBranch,
  Globe,
  Grid3X3,
  Layers,
  MessageSquare,
  Rocket,
  RotateCcw,
  Settings,
  Shield,
  Terminal,
  TestTube,
  Type,
  Zap,
} from "lucide-react";
import type { CourseIconName } from "@/lib/course-types";

const ICON_MAP: Record<CourseIconName, LucideIcon> = {
  "book-open": BookOpen,
  code: Code,
  code2: Code2,
  database: Database,
  shield: Shield,
  cloud: Cloud,
  boxes: Boxes,
  settings: Settings,
  "test-tube": TestTube,
  zap: Zap,
  globe: Globe,
  terminal: Terminal,
  type: Type,
  calculator: Calculator,
  "git-branch": GitBranch,
  "rotate-ccw": RotateCcw,
  "grid-3x3": Grid3X3,
  layers: Layers,
  "message-square": MessageSquare,
  "file-text": FileText,
  container: Container,
  rocket: Rocket,
};

export function getCourseIcon(name?: CourseIconName): LucideIcon {
  return (name && ICON_MAP[name]) || BookOpen;
}
