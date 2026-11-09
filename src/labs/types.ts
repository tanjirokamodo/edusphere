import type { AgeBand, LabQuestion } from "@/types";

/** What the lab page gives every simulation. */
export interface LabComponentProps {
  band: AgeBand;
  /** Report that the student did something the lab counts as an activity. */
  onTask: (taskId: string) => void;
}

export type LabQuestionBank = Record<AgeBand, LabQuestion[]>;
