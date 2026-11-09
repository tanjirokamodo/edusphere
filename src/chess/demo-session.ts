"use client";

import { readStoredJson, useStoredJson, writeStored } from "@/lib/local-store";
import { createLocalDemoTransport } from "./local-transport";
import type { ChessTransport } from "./transport";
import type { MatchSnapshot } from "./types";

/** The one chess match in progress on this device for a student (localStorage, demo only). */
const activeKey = (studentId: string) => `edusphere.demo.chess.active.${studentId}`;
const NO_MATCH: MatchSnapshot | null = null;

export function createStudentTransport(studentId: string): ChessTransport {
  return createLocalDemoTransport({
    load: () => readStoredJson<MatchSnapshot | null>(activeKey(studentId), NO_MATCH),
    save: (snapshot) => {
      writeStored(activeKey(studentId), snapshot ? JSON.stringify(snapshot) : null);
    },
  });
}

export function useActiveMatch(studentId: string) {
  return useStoredJson<MatchSnapshot | null>(activeKey(studentId), NO_MATCH);
}
