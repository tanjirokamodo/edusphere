import { FlaskConical, Globe2, Lightbulb, Sprout, Zap, type LucideIcon } from "lucide-react";
import type { LabCategory, ToneKey } from "@/types";

export const labCategoryIcons: Record<LabCategory, LucideIcon> = {
  biology: Sprout,
  physics: Zap,
  chemistry: FlaskConical,
  earth: Globe2,
  general: Lightbulb,
};

export const labCategoryTones: Record<LabCategory, ToneKey> = {
  biology: "teal",
  physics: "amber",
  chemistry: "indigo",
  earth: "sky",
  general: "rose",
};
