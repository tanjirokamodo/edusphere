/*
 * States of matter model, using water at normal pressure: it freezes/melts at
 * 0 °C and boils/condenses at 100 °C. Particles are drawn as dots in a box.
 * The motion is a simple picture of the idea (hotter = faster, solids keep a
 * pattern, gases spread out). It is not a molecular simulation.
 */

export type MatterState = "solid" | "liquid" | "gas";
export type MatterProcess = "melting" | "freezing" | "evaporation" | "condensation";

export const MIN_TEMP = -20;
export const MAX_TEMP = 120;
export const MELT_AT = 0;
export const BOIL_AT = 100;
export const DEFAULT_TEMP = 20;
export const PARTICLE_COUNT = 40;

/** At exactly 0 °C or 100 °C water is changing state: treated as the colder state. */
export function stateOf(temp: number): MatterState {
  if (temp <= MELT_AT) return "solid";
  if (temp <= BOIL_AT) return "liquid";
  return "gas";
}

export function processBetween(from: MatterState, to: MatterState): MatterProcess | null {
  if (from === "solid" && to === "liquid") return "melting";
  if (from === "liquid" && to === "solid") return "freezing";
  if (from === "liquid" && to === "gas") return "evaporation";
  if (from === "gas" && to === "liquid") return "condensation";
  return null;
}

/** Moves the temperature toward the target at a steady rate (degrees per second). */
export function approach(temp: number, target: number, seconds: number, rate = 30): number {
  const step = rate * seconds;
  if (Math.abs(target - temp) <= step) return target;
  return temp + Math.sign(target - temp) * step;
}

/* ---------- particles ---------- */
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Lattice position held in the solid state. */
  hx: number;
  hy: number;
}

export interface Regime {
  /** Pull toward the lattice position (strong in a solid). */
  spring: number;
  /** Typical particle speed (box widths per second, picture units). */
  speed: number;
  /** Top of the space the particles may use (0 = top of box, 1 = bottom). */
  fillTop: number;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Blends smoothly across 0 °C and 100 °C so a change of state is gradual, not a jump. */
export function regimeFor(temp: number): Regime {
  const gas = smooth(BOIL_AT - 4, BOIL_AT + 4, temp);
  const solid = 1 - smooth(MELT_AT - 4, MELT_AT + 4, temp);
  const liquid = Math.max(0, 1 - solid - gas);
  const solidSpeed = 0.04 + (Math.min(temp, 0) - MIN_TEMP) * 0.0015;
  const liquidSpeed = 0.28 + Math.min(Math.max(temp, 0), 100) * 0.0035;
  const gasSpeed = 0.9 + (Math.max(temp, BOIL_AT) - BOIL_AT) * 0.012;
  return {
    spring: 7 * solid,
    speed: solid * solidSpeed + liquid * liquidSpeed + gas * gasSpeed,
    fillTop: solid * 0.5 + liquid * 0.42 + gas * 0.02,
  };
}

/** Small seeded random numbers so the model is repeatable in tests. */
export function makeRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLS = 8;

export function createParticles(random: () => number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const hx = 0.12 + col * 0.108;
    const hy = 0.56 + row * 0.09;
    const angle = random() * Math.PI * 2;
    return { x: hx, y: hy, vx: Math.cos(angle), vy: Math.sin(angle), hx, hy };
  });
}

/** Advances every particle by `dt` seconds at the given temperature. Mutates `particles`. */
export function stepParticles(particles: Particle[], temp: number, dt: number, random: () => number): void {
  const { spring, speed, fillTop } = regimeFor(temp);
  const lo = 0.035;
  const hi = 0.965;
  const top = Math.min(fillTop + 0.035, 0.9);

  for (const p of particles) {
    // random nudges, then keep the speed near the typical speed for this temperature
    p.vx += (random() - 0.5) * speed * 30 * dt;
    p.vy += (random() - 0.5) * speed * 30 * dt;
    const mag = Math.hypot(p.vx, p.vy) || 1;
    const target = speed / mag;
    p.vx *= 1 + (target - 1) * Math.min(1, dt * 8);
    p.vy *= 1 + (target - 1) * Math.min(1, dt * 8);

    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (spring > 0) {
      p.x += (p.hx - p.x) * Math.min(1, spring * dt);
      p.y += (p.hy - p.y) * Math.min(1, spring * dt);
    }

    if (p.x < lo) { p.x = lo; p.vx = Math.abs(p.vx); }
    if (p.x > hi) { p.x = hi; p.vx = -Math.abs(p.vx); }
    if (p.y < top) { p.y = top; p.vy = Math.abs(p.vy); }
    if (p.y > hi) { p.y = hi; p.vy = -Math.abs(p.vy); }
  }
}

/** How much the particles are moving, 0 to 1, for a simple "energy" gauge. */
export function energyLevel(temp: number): number {
  return Math.min(1, Math.max(0, (regimeFor(temp).speed - 0.04) / 1.2));
}
