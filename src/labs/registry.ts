import type { ComponentType } from "react";
import { questions as plantQuestions } from "./plant-growth/content";
import { PlantGrowthLab } from "./plant-growth/PlantGrowthLab";
import { questions as waterQuestions } from "./water-cycle/content";
import { WaterCycleLab } from "./water-cycle/WaterCycleLab";
import { questions as matterQuestions } from "./states-of-matter/content";
import { StatesOfMatterLab } from "./states-of-matter/StatesOfMatterLab";
import type { LabComponentProps, LabQuestionBank } from "./types";

export interface LabEntry {
  Component: ComponentType<LabComponentProps>;
  questions: LabQuestionBank;
}

/** Maps a lab id (see src/data/labs.ts) to its simulation and its knowledge questions. */
export const labRegistry: Record<string, LabEntry> = {
  "lab-plant-growth": { Component: PlantGrowthLab, questions: plantQuestions },
  "lab-water-cycle": { Component: WaterCycleLab, questions: waterQuestions },
  "lab-states-of-matter": { Component: StatesOfMatterLab, questions: matterQuestions },
};
