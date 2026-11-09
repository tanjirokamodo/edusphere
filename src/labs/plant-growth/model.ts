/*
 * Plant growth model: a deliberately simple classroom model.
 * Growth is a 0-100 "progress" value, not a measurement. There are no real
 * units and no claim about how fast real plants grow. The only point is the
 * idea that light, water and soil each have to suit the plant.
 */

export type PlantKind = "sunflower" | "fern" | "cactus";
export type SoilKind = "sandy" | "garden" | "clay";
/** 0 none, 1 low, 2 medium, 3 high. */
export type Level = 0 | 1 | 2 | 3;
export type Stage = 0 | 1 | 2 | 3 | 4;
export type Health = "thriving" | "good" | "slow" | "struggling" | "noWater" | "noLight";

export interface Pot {
  plant: PlantKind;
  sun: Level;
  water: Level;
  soil: SoilKind;
  /** 0 to 100 */
  growth: number;
}

interface Needs {
  sun: number;
  water: number;
  soil: Record<SoilKind, number>;
}

export const NEEDS: Record<PlantKind, Needs> = {
  sunflower: { sun: 3, water: 2, soil: { sandy: 0.5, garden: 1, clay: 0.5 } },
  fern: { sun: 1, water: 3, soil: { sandy: 0.3, garden: 1, clay: 0.7 } },
  cactus: { sun: 3, water: 1, soil: { sandy: 1, garden: 0.6, clay: 0.2 } },
};

export const PLANTS: PlantKind[] = ["sunflower", "fern", "cactus"];
export const SOILS: SoilKind[] = ["sandy", "garden", "clay"];
export const LEVELS: Level[] = [0, 1, 2, 3];

/** Whole-pot growth per second at a perfect fit (about 22 s to reach maturity). */
export const BASE_RATE = 100 / 22;
/** Below this fit the plant does not grow and starts to droop. */
export const STRUGGLE_FIT = 0.12;

export const defaultPot = (): Pot => ({ plant: "sunflower", sun: 2, water: 2, soil: "garden", growth: 0 });

/** Sandy soil drains (feels drier), clay holds water (feels wetter). */
export function effectiveWater(pot: Pot): number {
  const shift = pot.soil === "sandy" ? -0.5 : pot.soil === "clay" ? 0.5 : 0;
  return Math.min(3, Math.max(0, pot.water + shift));
}

function closeness(distance: number): number {
  if (distance <= 0.5) return 1;
  if (distance <= 1.5) return 0.6;
  if (distance <= 2.5) return 0.25;
  return 0;
}

export type Factor = "sun" | "water" | "soil";
export type FactorState = "low" | "high" | "ok";

export function factorStates(pot: Pot): Record<Factor, FactorState> {
  const n = NEEDS[pot.plant];
  const sunDiff = pot.sun - n.sun;
  const waterDiff = effectiveWater(pot) - n.water;
  return {
    sun: Math.abs(sunDiff) <= 0.5 ? "ok" : sunDiff < 0 ? "low" : "high",
    water: Math.abs(waterDiff) <= 0.5 ? "ok" : waterDiff < 0 ? "low" : "high",
    soil: n.soil[pot.soil] >= 0.6 ? "ok" : "low",
  };
}

/** 0 to 1: how well the three conditions suit the plant. */
export function fit(pot: Pot): number {
  const n = NEEDS[pot.plant];
  const sunC = closeness(Math.abs(pot.sun - n.sun));
  const waterC = closeness(Math.abs(effectiveWater(pot) - n.water));
  const soilMul = 0.4 + 0.6 * n.soil[pot.soil];
  return sunC * waterC * soilMul;
}

/** The highest growth the plant can reach with these conditions. */
export function growthCap(pot: Pot): number {
  if (pot.water === 0) return 0; // a seed needs water to wake up
  if (pot.sun === 0) return 28; // sprouts on stored food, then cannot make more
  return 100;
}

export function stageOf(growth: number): Stage {
  if (growth < 8) return 0;
  if (growth < 28) return 1;
  if (growth < 52) return 2;
  if (growth < 78) return 3;
  return 4;
}

export function healthOf(pot: Pot): Health {
  if (pot.water === 0) return "noWater";
  if (pot.sun === 0) return "noLight";
  const f = fit(pot);
  if (f >= 0.75) return "thriving";
  if (f >= 0.45) return "good";
  if (f >= STRUGGLE_FIT) return "slow";
  return "struggling";
}

export function isWilting(pot: Pot): boolean {
  const h = healthOf(pot);
  return pot.growth >= 8 && (h === "struggling" || h === "noWater" || h === "noLight");
}

export function stepPot(pot: Pot, seconds: number): Pot {
  const f = fit(pot);
  const rate = f < STRUGGLE_FIT ? 0 : f * BASE_RATE;
  const next = Math.min(growthCap(pot), pot.growth + rate * seconds);
  return next > pot.growth ? { ...pot, growth: next } : pot;
}

/** True when nothing more can happen to this pot with its current conditions. */
export function isSettled(pot: Pot): boolean {
  return pot.growth >= 100 || pot.growth >= growthCap(pot) || fit(pot) < STRUGGLE_FIT;
}

export function conditionsDiffer(a: Pot, b: Pot): boolean {
  return a.plant !== b.plant || a.sun !== b.sun || a.water !== b.water || a.soil !== b.soil;
}

export type Winner = "A" | "B" | "same";

/** Which pot has grown more (within 5 points counts as the same). */
export function winner(a: Pot, b: Pot): Winner {
  if (Math.abs(a.growth - b.growth) <= 5) return "same";
  return a.growth > b.growth ? "A" : "B";
}
