import { isWilting, stageOf, type PlantKind, type Pot, type SoilKind } from "./model";

const soilColour: Record<SoilKind, string> = { sandy: "#E3C98A", garden: "#6B4A2F", clay: "#B5654A" };
const skyColour = ["#B9C3D6", "#DDEBFA", "#E6F3FF", "#FFF1C9"];

/** Height of the plant above the soil, in drawing units. */
function heightFor(g: number): number {
  if (g < 8) return 0;
  if (g < 28) return 6 + ((g - 8) / 20) * 14;
  if (g < 52) return 20 + ((g - 28) / 24) * 26;
  if (g < 78) return 46 + ((g - 52) / 26) * 36;
  return 82 + ((g - 78) / 22) * 26;
}

const BASE_Y = 146;

function Sunflower({ g, wilt }: { g: number; wilt: boolean }) {
  const stage = stageOf(g);
  const H = heightFor(g);
  const bend = wilt ? 18 : 0;
  const topX = 100 + bend;
  const topY = BASE_Y - H;
  const green = wilt ? "#A7B05A" : "#2F9E44";
  const leaf = wilt ? "#C4C57A" : "#51CF66";
  const pairs = [0, 1, 2, 3, 3][stage];

  return (
    <g>
      <path d={`M100 ${BASE_Y} Q100 ${BASE_Y - H / 2} ${topX} ${topY}`} stroke={green} strokeWidth={4} strokeLinecap="round" fill="none" />
      {Array.from({ length: pairs }, (_, i) => {
        const f = (i + 1) / (pairs + 1);
        const y = BASE_Y - H * f;
        const x = 100 + bend * f * f;
        const size = 6 + stage * 1.5;
        return [-1, 1].map((side) => (
          <ellipse
            key={`${i}-${side}`}
            cx={x + side * size}
            cy={y}
            rx={size}
            ry={size / 2}
            fill={leaf}
            transform={`rotate(${side * (wilt ? 35 : -25)} ${x} ${y})`}
          />
        ));
      })}
      {stage === 1 && <ellipse cx={topX} cy={topY - 3} rx={5} ry={3} fill={leaf} />}
      {stage === 2 && (
        <>
          <ellipse cx={topX - 5} cy={topY} rx={6} ry={3} fill={leaf} transform={`rotate(-30 ${topX} ${topY})`} />
          <ellipse cx={topX + 5} cy={topY} rx={6} ry={3} fill={leaf} transform={`rotate(30 ${topX} ${topY})`} />
        </>
      )}
      {stage === 3 && <circle cx={topX} cy={topY - 3} r={6} fill={green} />}
      {stage === 4 && (
        <g transform={`translate(${topX} ${topY + (wilt ? 10 : 0)})`}>
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse key={i} cx={0} cy={-15} rx={4.5} ry={8} fill={wilt ? "#D6BC67" : "#FFC857"} transform={`rotate(${i * 30})`} />
          ))}
          <circle r={9} fill="#6B4A2F" />
        </g>
      )}
    </g>
  );
}

function Fern({ g, wilt }: { g: number; wilt: boolean }) {
  const stage = stageOf(g);
  const H = heightFor(g);
  const n = [0, 1, 3, 5, 7][stage];
  const green = wilt ? "#A7B05A" : "#2F9E44";
  const leaf = wilt ? "#C4C57A" : "#69DB7C";

  return (
    <g fill="none" strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => {
        const spread = n === 1 ? 0 : (i / (n - 1) - 0.5) * 2;
        const a = spread * (wilt ? 1.3 : 0.95);
        const L = (wilt ? 0.8 : 1) * H * (1 - Math.abs(spread) * 0.25);
        const ex = 100 + Math.sin(a) * L * 0.85;
        const ey = BASE_Y - Math.cos(a) * L * (wilt ? 0.75 : 1);
        const cx = 100 + Math.sin(a) * L * 0.2;
        const cy = BASE_Y - Math.cos(a) * L * 0.7;
        const d = `M100 ${BASE_Y} Q${cx} ${cy} ${ex} ${ey}`;
        return (
          <g key={i}>
            <path d={d} stroke={leaf} strokeWidth={9} strokeDasharray="3 3" />
            <path d={d} stroke={green} strokeWidth={2.5} />
          </g>
        );
      })}
    </g>
  );
}

function Cactus({ g, wilt }: { g: number; wilt: boolean }) {
  const stage = stageOf(g);
  const H = heightFor(g);
  const green = wilt ? "#A9B36A" : "#3FA34D";
  const rib = wilt ? "#8E9852" : "#2F8A3C";
  const armY = BASE_Y - H * 0.45;

  return (
    <g>
      {stage >= 3 && (
        <g stroke={green} strokeWidth={9} strokeLinecap="round" fill="none">
          <path d={`M92 ${armY} h-12 v-${H * 0.22}`} />
          {stage === 4 && <path d={`M108 ${armY - 8} h12 v-${H * 0.2}`} />}
        </g>
      )}
      <rect x={89} y={BASE_Y - H} width={22} height={H} rx={11} fill={green} />
      <path d={`M100 ${BASE_Y - H + 5} V${BASE_Y - 2}`} stroke={rib} strokeWidth={1.5} />
      <path d={`M94 ${BASE_Y - H + 8} V${BASE_Y - 3}M106 ${BASE_Y - H + 8} V${BASE_Y - 3}`} stroke={rib} strokeWidth={1} opacity={0.7} />
      {stage === 4 && <circle cx={100} cy={BASE_Y - H - 2} r={6} fill={wilt ? "#D9A0A0" : "#FF8585"} />}
    </g>
  );
}

const plants: Record<PlantKind, typeof Sunflower> = { sunflower: Sunflower, fern: Fern, cactus: Cactus };

/** Original drawing of one pot: sky, sun, water drops, soil and the plant at its current stage. */
export function PlantSvg({ pot, running }: { pot: Pot; running: boolean }) {
  const wilt = isWilting(pot);
  const Plant = plants[pot.plant];
  const seed = pot.growth < 8;
  const sunOpacity = pot.sun === 0 ? 0 : 0.35 + pot.sun * 0.22;

  return (
    <svg viewBox="0 0 200 200" className="block w-full" role="img" aria-hidden>
      <rect width="200" height="200" rx="14" fill={skyColour[pot.sun]} style={{ transition: "fill .4s" }} />

      {/* sun, with rays that grow with the sunlight level */}
      <g style={{ transition: "opacity .4s" }} opacity={sunOpacity}>
        <circle cx="164" cy="34" r={11 + pot.sun * 2} fill="#FFC857" />
        <g stroke="#FFC857" strokeWidth="3" strokeLinecap="round" opacity={pot.sun >= 2 ? 1 : 0.5}>
          <path d="M164 8v6M164 54v6M138 34h6M184 34h6M146 16l4 4M178 48l4 4M182 16l-4 4M150 48l-4 4" />
        </g>
      </g>
      {pot.sun === 0 && (
        <g fill="#8D99AE" opacity="0.85">
          <ellipse cx="160" cy="36" rx="26" ry="12" />
          <ellipse cx="146" cy="30" rx="14" ry="10" />
        </g>
      )}

      {/* water drops, one per water level */}
      {Array.from({ length: pot.water }, (_, i) => (
        <path
          key={i}
          d={`M${28 + i * 16} 60q-5 8 0 12q5 -4 0 -12z`}
          fill="#4C9BE0"
          className={running ? "animate-drip" : ""}
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}

      {/* pot and soil */}
      <path d="M68 154L74 196H126L132 154Z" fill="#C98B5B" />
      <rect x="62" y="146" width="76" height="10" rx="3" fill="#B97A4B" />
      <rect x="66" y="146" width="68" height="8" fill={soilColour[pot.soil]} />
      <rect x="66" y="146" width="68" height="8" fill="#1D4ED8" opacity={pot.water * 0.07} style={{ transition: "opacity .4s" }} />

      {seed ? <ellipse cx="100" cy="150" rx="5" ry="3.2" fill="#7A4E2D" /> : <Plant g={pot.growth} wilt={wilt} />}
    </svg>
  );
}
