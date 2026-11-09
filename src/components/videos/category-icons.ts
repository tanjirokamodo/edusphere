import {
  BookA,
  Calculator,
  Code2,
  FlaskConical,
  Globe2,
  Languages,
  Leaf,
  Lightbulb,
  Rocket,
  BookOpenText,
  type LucideIcon,
} from "lucide-react";
import type { ToneKey, VideoCategory } from "@/types";

export const videoCategoryIcons: Record<VideoCategory, LucideIcon> = {
  mathematics: Calculator,
  science: FlaskConical,
  english: BookA,
  telugu: Languages,
  "general-knowledge": Lightbulb,
  nature: Leaf,
  "history-geography": Globe2,
  space: Rocket,
  stories: BookOpenText,
  "computer-science": Code2,
};

export const videoCategoryTones: Record<VideoCategory, ToneKey> = {
  mathematics: "teal",
  science: "rose",
  english: "indigo",
  telugu: "amber",
  "general-knowledge": "sky",
  nature: "teal",
  "history-geography": "amber",
  space: "indigo",
  stories: "rose",
  "computer-science": "sky",
};
