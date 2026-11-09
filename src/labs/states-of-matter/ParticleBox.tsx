"use client";

import { useEffect, useRef } from "react";
import { createParticles, energyLevel, makeRandom, stateOf, stepParticles } from "./model";

const W = 600;
const H = 400;

function mix(a: [number, number, number], b: [number, number, number], t: number): string {
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
}

const COOL: [number, number, number] = [67, 56, 196]; // slow particles
const HOT: [number, number, number] = [255, 133, 133]; // fast particles

const tint = { solid: "#EEF0FB", liquid: "#E3F1FB", gas: "#FDF3F3" };

/**
 * Canvas drawing of water particles in a box. The particle maths lives in
 * model.ts; this only owns the animation loop and the picture.
 */
export function ParticleBox({
  temp,
  running,
  seed,
  label,
}: {
  temp: number;
  running: boolean;
  seed: number;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempRef = useRef(temp);
  const runningRef = useRef(running);

  useEffect(() => {
    tempRef.current = temp;
    runningRef.current = running;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const random = makeRandom(seed);
    const particles = createParticles(random);
    let last = performance.now();
    let frame = 0;

    const draw = () => {
      const t = tempRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = tint[stateOf(t)];
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = mix(COOL, HOT, energyLevel(t));
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, 11, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (runningRef.current) stepParticles(particles, tempRef.current, dt, random);
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      role="img"
      aria-label={label}
      className="block aspect-[3/2] w-full rounded-xl border border-line"
    />
  );
}
