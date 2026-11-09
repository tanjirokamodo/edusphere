import { initialWater, type SunLevel, type WaterStage, type WaterState } from "./model";

/** Centres of the four label spots on the 400 x 240 diagram, in drawing units. */
export const ZONES: Record<WaterStage, { x: number; y: number }> = {
  evaporation: { x: 110, y: 140 },
  condensation: { x: 160, y: 66 },
  precipitation: { x: 240, y: 118 },
  collection: { x: 302, y: 168 },
};

const HIGHLIGHT: Record<WaterStage, { x: number; y: number; w: number; h: number }> = {
  evaporation: { x: 40, y: 92, w: 150, h: 98 },
  condensation: { x: 170, y: 18, w: 130, h: 72 },
  precipitation: { x: 190, y: 90, w: 110, h: 84 },
  collection: { x: 215, y: 168, w: 175, h: 66 },
};

const CLOUD = "M-38 12 C-56 12 -58 -8 -40 -10 C-38 -28 -12 -32 -4 -18 C6 -30 32 -24 32 -8 C52 -8 54 12 34 12 Z";

/**
 * The water cycle picture. In "live" mode it is drawn from the simulation state
 * (water level, vapour, cloud size, rain, runoff). In "diagram" mode it shows
 * fixed arrows for the labelling activity.
 */
export function WaterCycleScene({
  mode,
  state = initialWater(),
  sun = 2,
  running = false,
  highlight = null,
}: {
  mode: "live" | "diagram";
  state?: WaterState;
  sun?: SunLevel;
  running?: boolean;
  highlight?: WaterStage | null;
}) {
  const live = mode === "live";
  const s = live ? state : { ...initialWater(), cloud: 50 };
  const waterY = 205 - s.lake * 0.3;
  const vapourDots = live ? Math.min(10, Math.ceil(s.vapour / 4)) : 0;
  const cloudScale = 0.8 + (s.cloud / 100) * 0.55;
  const cloudFill = s.raining ? "#9AA5B8" : "#FFFFFF";
  const sunOpacity = sun === 0 ? 0.25 : 0.5 + sun * 0.17;
  const play = running ? "running" : "paused";

  return (
    <svg viewBox="0 0 400 240" className="block h-auto w-full rounded-xl" role="img" aria-hidden>
      <defs>
        <linearGradient id={`sky-${mode}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.raining ? "#9FB3CC" : sun === 0 ? "#B5C3DA" : "#BFE0FA"} />
          <stop offset="1" stopColor="#E9F5FF" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#sky-${mode})`} />

      {/* sun: bigger and brighter with more sun */}
      <g opacity={sunOpacity} style={{ transition: "opacity .4s" }}>
        <circle cx="58" cy="44" r={11 + sun * 3} fill="#FFC857" />
        <g stroke="#FFC857" strokeWidth="3" strokeLinecap="round" opacity={sun >= 2 ? 1 : 0.5}>
          <path d="M58 12v8M58 68v8M26 44h8M82 44h8M35 21l6 6M75 61l6 6M81 21l-6 6M41 61l-6 6" />
        </g>
      </g>

      {/* lake: the level drops when water evaporates and rises as rain runs back */}
      <rect x="0" y={waterY} width="290" height={240 - waterY} fill="#2A6FB3" fillOpacity="0.85" style={{ transition: "y .3s, height .3s" }} />
      <path d={`M0 ${waterY} q17 -6 35 0 t35 0 t35 0 t35 0 t35 0 t35 0 t35 0 t35 0`} stroke="#fff" strokeOpacity=".6" strokeWidth="2" fill="none" />

      {/* mountain, ground and river */}
      <polygon points="250,192 322,78 400,192" fill="#8FA3B8" />
      <polygon points="322,78 303,108 321,100 336,112" fill="#fff" />
      <path d="M250 192 Q300 172 400 182 V240 H250Z" fill="#7BC47F" />
      <path d="M330 120 Q316 152 300 180 T268 206" stroke="#4C9BE0" strokeWidth="5" fill="none" strokeLinecap="round" />
      {live && s.runoff > 1 && (
        <path
          d="M330 120 Q316 152 300 180 T268 206"
          stroke="#fff"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="6 6"
          className="animate-flow"
          style={{ animationPlayState: play }}
        />
      )}

      {/* water vapour rising */}
      {Array.from({ length: vapourDots }, (_, i) => (
        <circle
          key={i}
          cx={36 + ((i * 37) % 150)}
          cy={waterY - 6}
          r={4}
          fill="#fff"
          className="animate-rise"
          style={{ animationDelay: `${(i % 5) * 0.55}s`, animationPlayState: play }}
        />
      ))}

      {/* cloud, bigger and greyer as it fills */}
      <g transform={`translate(235 52) scale(${cloudScale})`} opacity={0.55 + s.cloud * 0.0045} style={{ transition: "opacity .3s" }}>
        <path d={CLOUD} fill={cloudFill} />
      </g>

      {live && s.raining &&
        Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M${205 + i * 9} 70v9`}
            stroke="#4C9BE0"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-rainfall"
            style={{ animationDelay: `${(i % 4) * 0.22}s`, animationPlayState: play }}
          />
        ))}

      {live && highlight && (
        <rect
          x={HIGHLIGHT[highlight].x}
          y={HIGHLIGHT[highlight].y}
          width={HIGHLIGHT[highlight].w}
          height={HIGHLIGHT[highlight].h}
          rx="12"
          fill="#14B8A6"
          fillOpacity=".12"
          stroke="#0E8F80"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      )}

      {/* fixed arrows for the labelling diagram */}
      {!live && (
        <g fill="none" stroke="#20284A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M110 186V98M100 108l10 -10 10 10" />
          <path d="M128 92Q148 62 196 56M186 46l10 10 -10 10" />
          <path d="M240 84V152M230 142l10 10 10 -10" />
          <path d="M322 132Q302 165 266 202M268 190l-2 12 12 -2" />
        </g>
      )}
    </svg>
  );
}
