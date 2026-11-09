"use client";

import { LAB_XP, tasksForBand } from "@/data/labs";
import type { AgeBand, LabDef, LabProgress } from "@/types";
import { readStoredJson, updateStoredJson, useStoredJson } from "./local-store";
import { addXp } from "./progress";

/*
 * Lab progress is saved in this browser only (localStorage), per student.
 * Completion pays XP exactly once through the shared XP store (addXp), so
 * repeating a finished lab never pays again.
 */

type LabMap = Record<string, LabProgress>;
const labKey = (studentId: string) => `edusphere.demo.labs.${studentId}`;
const NO_LABS: LabMap = {};

export function useLabProgress(studentId: string) {
  const { value, loaded } = useStoredJson<LabMap>(labKey(studentId), NO_LABS);
  return { map: value, loaded };
}

export function completedLabCount(map: LabMap): number {
  return Object.values(map).filter((p) => p.completed).length;
}

/** Whole quiz questions needed to pass: two thirds, rounded up. */
export function passMark(total: number): number {
  return Math.ceil((total * 2) / 3);
}

const blank = (): LabProgress => ({
  lastAccessed: new Date().toISOString(),
  tasks: [],
  quizPassed: false,
  completed: false,
  xpEarned: 0,
});

function isReady(lab: LabDef, band: AgeBand, p: LabProgress): boolean {
  return p.quizPassed && tasksForBand(lab, band).every((t) => p.tasks.includes(t.id));
}

/** Applies a change, then completes the lab (and pays XP once) when everything is done. */
function apply(studentId: string, lab: LabDef, band: AgeBand, change: (p: LabProgress) => LabProgress) {
  const before = readStoredJson<LabMap>(labKey(studentId), NO_LABS)[lab.id] ?? blank();
  let after = change({ ...before, lastAccessed: new Date().toISOString() });
  if (!after.completed && isReady(lab, band, after)) {
    after = { ...after, completed: true, completedAt: new Date().toISOString(), xpEarned: LAB_XP };
    addXp(studentId, LAB_XP);
  }
  updateStoredJson<LabMap>(labKey(studentId), NO_LABS, (map) => ({ ...map, [lab.id]: after }));
}

/** Records that the lab was opened (drives "recently explored"). */
export function touchLab(studentId: string, lab: LabDef, band: AgeBand) {
  apply(studentId, lab, band, (p) => p);
}

export function markLabTask(studentId: string, lab: LabDef, band: AgeBand, taskId: string) {
  const current = readStoredJson<LabMap>(labKey(studentId), NO_LABS)[lab.id];
  if (current?.tasks.includes(taskId)) return;
  apply(studentId, lab, band, (p) => ({ ...p, tasks: [...p.tasks, taskId] }));
}

export function recordLabQuiz(
  studentId: string,
  lab: LabDef,
  band: AgeBand,
  correct: number,
  total: number,
) {
  apply(studentId, lab, band, (p) => {
    const better = !p.best || correct / total > p.best.correct / p.best.total;
    return {
      ...p,
      best: better ? { correct, total } : p.best,
      quizPassed: p.quizPassed || correct >= passMark(total),
    };
  });
}

export function saveLabNotes(studentId: string, lab: LabDef, band: AgeBand, notes: string) {
  apply(studentId, lab, band, (p) => ({ ...p, notes }));
}
