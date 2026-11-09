"use client";

import { gradients } from "@/components/library/BookCover";
import type { LabDef } from "@/types";

/** Original SVG scenes drawn for this demo, one per lab. */
function Scene({ id }: { id: string }) {
  switch (id) {
    case "lab-plant-growth":
      return (
        <g>
          <circle cx="150" cy="28" r="16" fill="#FFC857" />
          <g stroke="#FFC857" strokeWidth="3" strokeLinecap="round">
            <path d="M150 4v6M150 46v6M126 28h6M168 28h6M133 11l4 4M163 41l4 4M167 11l-4 4M137 41l-4 4" />
          </g>
          <path d="M70 118h60l-8 -34H78z" fill="#C98B5B" />
          <rect x="74" y="80" width="52" height="8" rx="3" fill="#6B4A2F" />
          <path d="M100 80V52" stroke="#2F9E44" strokeWidth="4" strokeLinecap="round" />
          <path d="M100 62c-18 0-26-10-26-20 16 0 26 6 26 20z" fill="#51CF66" />
          <path d="M100 56c16 0 24-9 24-19-14 0-24 6-24 19z" fill="#69DB7C" />
        </g>
      );
    case "lab-water-cycle":
      return (
        <g>
          <circle cx="36" cy="30" r="14" fill="#FFC857" />
          <path d="M96 52c-14 0-20-8-14-16 4-9 18-10 24-2 9-6 22 0 20 10 10 2 10 8-2 8z" fill="#fff" />
          <g stroke="#CFE8FF" strokeWidth="3" strokeLinecap="round">
            <path d="M96 66v10M110 62v12M124 66v10" />
          </g>
          <path d="M0 106c30-14 50 10 80-2s46 8 120-2v30H0z" fill="#2A6FB3" fillOpacity=".55" />
          <path d="M58 98c0-8 5-8 5-14M72 98c0-8 5-8 5-14" stroke="#fff" strokeOpacity=".7" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    default:
      return (
        <g fill="#fff">
          <g fillOpacity=".95">
            <circle cx="60" cy="96" r="6" /><circle cx="76" cy="96" r="6" /><circle cx="92" cy="96" r="6" />
            <circle cx="60" cy="112" r="6" /><circle cx="76" cy="112" r="6" /><circle cx="92" cy="112" r="6" />
          </g>
          <g fillOpacity=".8">
            <circle cx="126" cy="100" r="6" /><circle cx="142" cy="110" r="6" /><circle cx="134" cy="88" r="6" />
          </g>
          <g fillOpacity=".65">
            <circle cx="170" cy="30" r="6" /><circle cx="150" cy="58" r="6" /><circle cx="184" cy="64" r="6" /><circle cx="116" cy="26" r="6" />
          </g>
        </g>
      );
  }
}

export function LabIllustration({ lab, className = "" }: { lab: LabDef; className?: string }) {
  const [from, to] = gradients[lab.tone];
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden
    >
      <svg viewBox="0 0 200 125" className="size-full" preserveAspectRatio="xMidYMid slice">
        <Scene id={lab.id} />
      </svg>
    </div>
  );
}
