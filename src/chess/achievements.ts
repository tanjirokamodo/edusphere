import type { Localized } from "@/types";
import { summarise, type ChessGameRecord } from "./stats";

export interface ChessBadge {
  id: string;
  title: Localized;
  description: Localized;
  earned: (games: ChessGameRecord[]) => boolean;
}

const L = (en: string, te: string): Localized => ({ en, te });

/** Friendly milestones only. No ratings, no ranking, nothing shared with other students. */
export const chessBadges: ChessBadge[] = [
  {
    id: "first-match",
    title: L("First Match", "మొదటి ఆట"),
    description: L("Finish your first game of chess.", "మీ మొదటి చెస్ ఆటను పూర్తి చేయండి."),
    earned: (g) => g.length >= 1,
  },
  {
    id: "first-victory",
    title: L("First Victory", "మొదటి గెలుపు"),
    description: L("Win a game.", "ఒక ఆటలో గెలవండి."),
    earned: (g) => summarise(g).wins >= 1,
  },
  {
    id: "chess-explorer",
    title: L("Chess Explorer", "చెస్ అన్వేషకుడు"),
    description: L("Play against 3 different classmates.", "3 వేర్వేరు సహవిద్యార్థులతో ఆడండి."),
    earned: (g) => summarise(g).opponents.length >= 3,
  },
  {
    id: "strategy-star",
    title: L("Strategy Star", "వ్యూహ తార"),
    description: L("Win 3 games.", "3 ఆటల్లో గెలవండి."),
    earned: (g) => summarise(g).wins >= 3,
  },
  {
    id: "five-games",
    title: L("Five Games Completed", "ఐదు ఆటలు పూర్తి"),
    description: L("Finish 5 games.", "5 ఆటలను పూర్తి చేయండి."),
    earned: (g) => g.length >= 5,
  },
];
