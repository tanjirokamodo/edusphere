/*
 * Water cycle model: a teaching sketch. The numbers are "amounts of water" on
 * an arbitrary 0-100 scale, not litres. Water is only moved between the lake,
 * the air, the cloud and the ground, never created or lost, which is the idea
 * the lab is meant to show.
 */

export type WaterStage = "evaporation" | "condensation" | "precipitation" | "collection";
export const STAGE_ORDER: WaterStage[] = ["evaporation", "condensation", "precipitation", "collection"];

/** 0 no sun (cold) ... 3 strong sun (hot). */
export type SunLevel = 0 | 1 | 2 | 3;
export const SUN_LEVELS: SunLevel[] = [0, 1, 2, 3];

export interface WaterState {
  /** Water in the lake / sea. */
  lake: number;
  /** Invisible water vapour in the air. */
  vapour: number;
  /** Tiny droplets gathered in the cloud. */
  cloud: number;
  /** Rain water that has fallen and is running back to the lake. */
  runoff: number;
  raining: boolean;
  /** Seconds left of "cooled cloud" after the student taps it. */
  cooled: number;
}

export const RAIN_STARTS_AT = 40;
export const RAIN_STOPS_AT = 8;
export const TAP_RAIN_AT = 25;

export const initialWater = (): WaterState => ({ lake: 85, vapour: 0, cloud: 0, runoff: 0, raining: false, cooled: 0 });

const clamp = (n: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, n));

export function stepWater(s: WaterState, sun: SunLevel, dt: number): WaterState {
  const evap = Math.min(s.lake, sun * 1.5 * dt);
  const condRate = 0.6 + (s.cooled > 0 ? 0.6 : 0);
  const cond = s.vapour * Math.min(1, condRate * dt);
  const vapour = clamp(s.vapour + evap - cond);

  let cloud = s.cloud + cond;
  const raining = s.raining ? cloud > RAIN_STOPS_AT : cloud >= RAIN_STARTS_AT;
  const rainOut = raining ? Math.min(cloud, 14 * dt) : 0;
  cloud -= rainOut;

  let runoff = s.runoff + rainOut;
  const flow = Math.min(runoff, 7 * dt);
  runoff -= flow;

  return {
    lake: clamp(s.lake - evap + flow),
    vapour,
    cloud,
    runoff,
    raining,
    cooled: Math.max(0, s.cooled - dt),
  };
}

/** The stage that is most visibly happening right now, or null when nothing is moving. */
export function currentStage(s: WaterState, sun: SunLevel): WaterStage | null {
  if (s.raining) return "precipitation";
  if (s.runoff > 1) return "collection";
  if (s.cloud > 3 && s.vapour > 2) return "condensation";
  if (sun > 0 && s.lake > 0) return "evaporation";
  return null;
}

/** Tapping a cloud with enough water squeezes out rain; otherwise it cools it for a moment. */
export function tapCloud(s: WaterState): WaterState {
  if (s.cloud >= TAP_RAIN_AT) return { ...s, raining: true };
  return { ...s, cooled: 3 };
}

export function totalWater(s: WaterState): number {
  return s.lake + s.vapour + s.cloud + s.runoff;
}

/** Number of stages in the correct place (0-4) for a student's order. */
export function orderScore(order: (WaterStage | null)[]): number {
  return order.filter((st, i) => st === STAGE_ORDER[i]).length;
}
