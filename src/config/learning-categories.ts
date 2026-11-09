import {
  Atom,
  Calculator,
  Library,
  Languages,
  Newspaper,
  PlayCircle,
  FlaskConical,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { TranslationKey } from "@/lib/i18n";
import type { AgeBand, Localized, ToneKey } from "@/types";

export interface LearningCategory {
  id: string;
  href: string;
  icon: LucideIcon;
  tone: ToneKey;
  titleKey: TranslationKey;
  /** Which age bands see this category. */
  bands: AgeBand[];
  /** Description tuned to each age band. */
  description: Record<AgeBand, Localized>;
  live: boolean;
}

const L = (en: string, te: string): Localized => ({ en, te });

/** Age-appropriate learning categories shown on the student dashboard. */
export const learningCategories: LearningCategory[] = [
  {
    id: "mathematics", href: "/student/mathematics", icon: Calculator, tone: "teal", titleKey: "nav.mathematics", bands: ["7-9", "10-12"], live: true,
    description: {
      "7-9": L("Numbers, shapes and patterns", "సంఖ్యలు, ఆకారాలు, నమూనాలు"),
      "10-12": L("Fractions, ratios and algebra", "భిన్నాలు, నిష్పత్తులు, బీజగణితం"),
    },
  },
  {
    id: "science", href: "/student/science", icon: Atom, tone: "rose", titleKey: "nav.science", bands: ["7-9", "10-12"], live: true,
    description: {
      "7-9": L("Plants, animals and our planet", "మొక్కలు, జంతువులు, మన గ్రహం"),
      "10-12": L("Energy, matter and experiments", "శక్తి, పదార్థం, ప్రయోగాలు"),
    },
  },
  {
    id: "languages", href: "/student/languages", icon: Languages, tone: "amber", titleKey: "nav.languages", bands: ["7-9", "10-12"], live: false,
    description: {
      "7-9": L("Read aloud in English and Telugu", "ఇంగ్లీష్, తెలుగులో చదవండి"),
      "10-12": L("Independent reading and writing", "స్వతంత్రంగా చదవడం, రాయడం"),
    },
  },
  {
    id: "library", href: "/student/library", icon: Library, tone: "indigo", titleKey: "nav.library", bands: ["7-9", "10-12"], live: false,
    description: {
      "7-9": L("Illustrated bilingual story books", "చిత్రాలతో ద్విభాషా కథల పుస్తకాలు"),
      "10-12": L("Bilingual e-books to read on your own", "మీరే చదువుకోగల ద్విభాషా ఈ-పుస్తకాలు"),
    },
  },
  {
    id: "videos", href: "/student/videos", icon: PlayCircle, tone: "sky", titleKey: "nav.videos", bands: ["7-9", "10-12"], live: false,
    description: {
      "7-9": L("Short, friendly video lessons", "చిన్న, సులభమైన వీడియో పాఠాలు"),
      "10-12": L("Explainers and science stories", "వివరణ వీడియోలు, సైన్స్ కథలు"),
    },
  },
  {
    id: "labs", href: "/student/labs", icon: FlaskConical, tone: "teal", titleKey: "nav.labs", bands: ["7-9", "10-12"], live: false,
    description: {
      "7-9": L("Try simple experiments on screen", "తెరపై సులభమైన ప్రయోగాలు చేయండి"),
      "10-12": L("Run experiments and change variables", "ప్రయోగాలు చేసి మార్పులు గమనించండి"),
    },
  },
  {
    id: "journals", href: "/student/journals", icon: Newspaper, tone: "amber", titleKey: "nav.journals", bands: ["10-12"], live: false,
    description: {
      "7-9": L("", ""),
      "10-12": L("Articles written for young researchers", "యువ పరిశోధకుల కోసం వ్యాసాలు"),
    },
  },
  {
    id: "challenges", href: "/student/challenges", icon: Target, tone: "rose", titleKey: "nav.challenges", bands: ["7-9", "10-12"], live: false,
    description: {
      "7-9": L("Fun quizzes to win badges", "బ్యాడ్జ్‌లు గెలవడానికి సరదా క్విజ్‌లు"),
      "10-12": L("Timed quizzes and weekly challenges", "సమయంతో క్విజ్‌లు, వారపు ఛాలెంజ్‌లు"),
    },
  },
];
