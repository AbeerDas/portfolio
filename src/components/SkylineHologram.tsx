import { motion, useReducedMotion } from "framer-motion";

// Moving one world unit along x or y shifts the drawing one step sideways and GROUND_TILT of a step down, and
// moving up one unit shifts it one step up.
type Vec = [number, number, number];

const UNIT = 13;
// Classic isometric is 0.5. Lower values look at the scene from nearer the ground, so fronts show more and roofs less.
const GROUND_TILT = 0.2;
// The ground sits below the bottom of the picture, so every building runs off the bottom edge.
const ORIGIN_X = 800;
const ORIGIN_Y = 900;
const WIDTH = 1600;
const HEIGHT = 720;

function project([x, y, z]: Vec): [number, number] {
  return [ORIGIN_X + (x - y) * UNIT, ORIGIN_Y + (x + y) * UNIT * GROUND_TILT - z * UNIT];
}

// The ground spot drawn at a given column of the picture and depth, so buildings can be placed by where they appear.
function groundAt(screenX: number, depth: number): [number, number] {
  const across = (screenX - ORIGIN_X) / UNIT;
  return [(across + depth) / 2, (depth - across) / 2];
}

const at = (v: Vec) => project(v).map((n) => n.toFixed(1)).join(" ");
const line = (points: Vec[]) => `M ${points.map(at).join(" L ")}`;
const polygon = (points: Vec[]) => `${line(points)} Z`;

// A face is a filled surface that hides what is behind it, and a line is only a stroke. Depth grows toward the
// viewer, so shapes are drawn in order of depth and nearer ones cover farther ones.
type Face = "top" | "east" | "south";
type Shape = { d: string; depth: number; face?: Face };

// The upright box's top and the two sides facing the viewer.
function box(x: number, y: number, z: number, w: number, d: number, h: number): Shape[] {
  const depth = x + w + y + d;
  return [
    { face: "south", depth, d: polygon([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]) },
    { face: "east", depth, d: polygon([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]) },
    { face: "top", depth, d: polygon([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]) },
  ];
}

// A level circle drawn as its on-screen ellipse.
function ellipseAt(x: number, y: number, z: number, radius: number) {
  const [cx, cy] = project([x, y, z]);
  return { cx, cy, rx: radius * Math.SQRT2 * UNIT, ry: radius * Math.SQRT2 * UNIT * GROUND_TILT };
}

// An upright, optionally tapering cylinder: its outline as a face, and the front rim of its top as a line.
function cylinder(x: number, y: number, z0: number, z1: number, r0: number, r1 = r0): Shape[] {
  const bottom = ellipseAt(x, y, z0, r0);
  const top = ellipseAt(x, y, z1, r1);
  const f = (n: number) => n.toFixed(1);
  const outline =
    `M ${f(bottom.cx - bottom.rx)} ${f(bottom.cy)} L ${f(top.cx - top.rx)} ${f(top.cy)} ` +
    `A ${f(top.rx)} ${f(top.ry)} 0 0 1 ${f(top.cx + top.rx)} ${f(top.cy)} ` +
    `L ${f(bottom.cx + bottom.rx)} ${f(bottom.cy)} ` +
    `A ${f(bottom.rx)} ${f(bottom.ry)} 0 0 1 ${f(bottom.cx - bottom.rx)} ${f(bottom.cy)} Z`;
  const rim = `M ${f(top.cx - top.rx)} ${f(top.cy)} A ${f(top.rx)} ${f(top.ry)} 0 0 0 ${f(top.cx + top.rx)} ${f(top.cy)}`;
  const depth = x + y + r0;
  return [
    { face: "east", depth, d: outline },
    { depth, d: rim },
  ];
}

// The Golden Gate runs along y from the left half into the right, its far span passing behind the CN Tower and its
// deck and anchorages below the bottom of the picture.
const DECK_X = -14;
const DECK_Z = 12;
const DECK_WIDTH = 3;
const TOWER_YS = [-23, 6];
const TOWER_HEIGHT = 40;
const SIDE_SPAN = 18;
const CABLE_LOW_Z = DECK_Z + 2;

// Height of the main cable at y: a sag between the towers, and a rise from each anchorage up to a tower top.
function cableZ(y: number) {
  const [far, near] = TOWER_YS as [number, number];
  const top = TOWER_HEIGHT - 1;
  if (y >= far && y <= near) {
    const half = (near - far) / 2;
    const t = (y - (far + half)) / half;
    return CABLE_LOW_Z + (top - CABLE_LOW_Z) * t * t;
  }
  const anchorage = y < far ? far - SIDE_SPAN : near + SIDE_SPAN;
  const tower = y < far ? far : near;
  const t = (y - anchorage) / (tower - anchorage);
  return DECK_Z + (top - DECK_Z) * Math.pow(t, 1.5);
}

function bridgeShapes(): Shape[] {
  const [far, near] = TOWER_YS as [number, number];
  const shapes: Shape[] = [];
  for (let y = far - SIDE_SPAN; y < near + SIDE_SPAN * 2; y += 4) {
    shapes.push(...box(DECK_X, y, DECK_Z - 1, DECK_WIDTH, 4, 1));
  }
  for (const towerY of TOWER_YS) {
    for (const legX of [DECK_X - 0.5, DECK_X + DECK_WIDTH - 0.7]) {
      shapes.push(...box(legX, towerY - 0.6, 0, 1.2, 1.2, TOWER_HEIGHT));
    }
    for (const strutZ of [DECK_Z + 3, 21, 28, 34, TOWER_HEIGHT - 0.9]) {
      shapes.push(...box(DECK_X + 0.6, towerY - 0.4, strutZ, DECK_WIDTH - 1.2, 0.8, 0.9));
    }
  }
  for (const x of [DECK_X, DECK_X + DECK_WIDTH]) {
    let previous: Vec | null = null;
    for (let y = far - SIDE_SPAN; y <= near + SIDE_SPAN + 0.01; y += 1) {
      const point: Vec = [x, y, cableZ(y)];
      if (previous) shapes.push({ depth: x + y + 0.5, d: line([previous, point]) });
      if (point[2] > DECK_Z + 0.4) shapes.push({ depth: x + y + 0.4, d: line([point, [x, y, DECK_Z]]) });
      previous = point;
    }
  }
  return shapes;
}

// The CN Tower stands right of centre, in front of the bridge's far span, its pod halfway up the picture.
const [CN_X, CN_Y] = groundAt(1060, -10);

function cnTowerShapes(): Shape[] {
  return [
    ...cylinder(CN_X, CN_Y, 2, 33, 1.25, 0.8),
    ...cylinder(CN_X, CN_Y, 32.6, 35.2, 2.7),
    ...cylinder(CN_X, CN_Y, 35.2, 36.2, 2.1),
    ...cylinder(CN_X, CN_Y, 36.2, 44, 0.55, 0.5),
    ...cylinder(CN_X, CN_Y, 44, 45.4, 1.1),
    ...cylinder(CN_X, CN_Y, 45.4, 58, 0.22, 0.06),
  ].map((shape) => ({ ...shape, depth: CN_X + CN_Y + 2 }));
}

// Transamerica's pyramid behind the bridge, between its towers.
function pyramidShapes(screenX: number, depth: number, size: number, height: number): Shape[] {
  const [cx, cy] = groundAt(screenX, depth);
  const x = cx - size / 2;
  const y = cy - size / 2;
  const apex: Vec = [cx, cy, height];
  const front = depth + size;
  return [
    { face: "south", depth: front, d: polygon([[x, y + size, 0], [x + size, y + size, 0], apex]) },
    { face: "east", depth: front, d: polygon([[x + size, y, 0], [x + size, y + size, 0], apex]) },
    { depth: front, d: line([apex, [cx, cy, height + 5]]) },
  ];
}

// Picture column, depth, footprint and height of the plain towers, San Francisco's on the left and Toronto's on the
// right. Depth decides which of two overlapping towers is in front.
const TOWERS: Array<[number, number, number, number]> = [
  [120, -20, 5, 46], [250, -34, 6, 52], [330, -8, 4.5, 34], [470, -26, 5, 44],
  [1200, -24, 5.5, 50], [1330, -6, 5, 38], [1460, -30, 6, 54], [1560, -12, 5, 40],
];

const scene: Shape[] = [
  ...TOWERS.flatMap(([screenX, depth, size, height]) => {
    const [x, y] = groundAt(screenX, depth);
    return box(x - size / 2, y - size / 2, 0, size, size, height);
  }),
  ...pyramidShapes(760, -32, 7, 50),
  ...bridgeShapes(),
  ...cnTowerShapes(),
].sort((a, b) => a.depth - b.depth);

const FACE_FILLS: Record<Face, string> = { top: "#17142a", east: "#12101f", south: "#0e0d19" };

// The tallest tower on the San Francisco side flies a tiny Bangladesh flag, the one coloured thing in the scene. It
// stands at the right corner of the roof and streams out toward the bottom right, sagging a little in the wind.
const FLAG_TOWER = TOWERS.filter(([screenX]) => screenX < WIDTH / 2).reduce((tallest, tower) =>
  tower[3] > tallest[3] ? tower : tallest,
);
const [FLAG_TOWER_X, FLAG_TOWER_Y] = groundAt(FLAG_TOWER[0], FLAG_TOWER[1]);
const POLE_X = FLAG_TOWER_X + FLAG_TOWER[2] / 2 - 0.4;
const POLE_Y = FLAG_TOWER_Y - FLAG_TOWER[2] / 2 + 0.4;
const ROOF_Z = FLAG_TOWER[3];
const POLE_TOP_Z = ROOF_Z + 2.6;
// The flag is ten long by six high, in world units, with the red disc a fifth of its length across and set
// towards the pole.
const FLAG_LENGTH = 1.7;
const FLAG_HEIGHT = FLAG_LENGTH * 0.6;
// How far the loose end sags below the pole end, and how deep the folds run across the cloth.
const FLAG_SAG = 0.55;
const FLAG_FOLD = 0.16;
// The flag's green and red, softened a little so they sit with the drawing rather than glow on top of it.
const FLAG_GREEN = "#14805a";
const FLAG_RED = "#d63a4a";
const WAVE_SECONDS = "2.4s";

// Where a point on the cloth sits, a share u of the way out from the pole and a share v of the way down, at a
// moment in the wave. The folds push the cloth back and forth across its own plane, and the loose bottom corner sags most.
function clothPoint(u: number, v: number, phase: number): [number, number] {
  const fold = FLAG_FOLD * u * Math.sin(u * Math.PI * 3 - phase) * (1 + 0.25 * v);
  const sag = FLAG_SAG * u * u * (0.7 + 0.6 * v);
  return project([POLE_X + u * FLAG_LENGTH, POLE_Y + fold, POLE_TOP_Z - v * FLAG_HEIGHT - sag]);
}

const pathThrough = (points: Array<[number, number]>) =>
  `M ${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")} Z`;

// The loose edge is frayed, reaching out unevenly down its height.
const FRAYED_EDGE: Array<[number, number]> = [[1, 0], [0.93, 0.34], [0.99, 0.66], [0.92, 1]];

function clothOutline(phase: number) {
  const along = Array.from({ length: 6 }, (_, i) => i / 6);
  return pathThrough([
    ...along.map((u) => clothPoint(u, 0, phase)),
    ...FRAYED_EDGE.map(([u, v]) => clothPoint(u, v, phase)),
    ...[...along].reverse().map((u) => clothPoint(u, 1, phase)),
  ]);
}

function discOutline(phase: number) {
  return pathThrough(
    Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      return clothPoint(0.45 + 0.2 * Math.cos(angle), 0.5 + (0.2 / 0.6) * Math.sin(angle), phase);
    }),
  );
}

// Moments through one full wave, ending where it began so the loop never jumps.
const WAVE_PHASES = Array.from({ length: 9 }, (_, i) => (i / 8) * Math.PI * 2);
const CLOTH_FRAMES = WAVE_PHASES.map(clothOutline);
const DISC_FRAMES = WAVE_PHASES.map(discOutline);

const [POLE_FOOT_X, POLE_FOOT_Y] = project([POLE_X, POLE_Y, ROOF_Z]);
const [POLE_TIP_X, POLE_TIP_Y] = project([POLE_X, POLE_Y, POLE_TOP_Z + 0.25]);

const arrival = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
} as const;

// The scene appears gradually from the top, runs to the page's bottom edge and softens at the sides.
const fadeEdges = {
  maskImage:
    "linear-gradient(to bottom, transparent, black 28%, black 94%, transparent), linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 28%, black 94%, transparent), linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

// A faint purple drawing of San Francisco and Toronto seen from low down, a few tall buildings overlapping as they
// run off the bottom of the page behind the footer. Whatever is passed in sits on top of the drawing on the left.
export default function SkylineHologram({ children }: { children?: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  // Loops an attribute through the flag's wave frames, or leaves it still for visitors who turn motion off.
  const wave = (attributeName: string, frames: string[]) =>
    reduceMotion ? null : <animate attributeName={attributeName} dur={WAVE_SECONDS} repeatCount="indefinite" values={frames.join(";")} />;
  return (
    <div className="relative ml-[calc(50%-50vw)] h-[380px] w-screen select-none sm:aspect-[1600/720] sm:h-auto sm:max-h-[780px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden" style={fadeEdges}>
        <motion.div className="absolute inset-0" {...arrival}>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
            <defs>
              <linearGradient id="holo-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HEIGHT}>
                <stop offset="0%" stopColor="#a9c2ff" />
                <stop offset="55%" stopColor="#8b8ff0" />
                <stop offset="100%" stopColor="#6366c9" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <g opacity={0.4}>
              <g stroke="url(#holo-stroke)" strokeWidth={0.9} strokeLinejoin="round" strokeLinecap="round">
                {scene.map((shape, i) => (
                  <path key={i} d={shape.d} fill={shape.face ? FACE_FILLS[shape.face] : "none"} />
                ))}
              </g>
            </g>
          </svg>
        </motion.div>
      </div>
      {/* Kept outside the fade above, which would otherwise dim the flag along with the top of the scene. */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10" {...arrival}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <line
            x1={POLE_FOOT_X}
            y1={POLE_FOOT_Y}
            x2={POLE_TIP_X}
            y2={POLE_TIP_Y}
            stroke="#8b8ff0"
            strokeOpacity={0.7}
            strokeWidth={1.1}
            strokeLinecap="round"
          />
          <g opacity={0.85}>
            <path d={CLOTH_FRAMES[0]} fill={FLAG_GREEN}>
              {wave("d", CLOTH_FRAMES)}
            </path>
            <path d={DISC_FRAMES[0]} fill={FLAG_RED}>
              {wave("d", DISC_FRAMES)}
            </path>
          </g>
        </svg>
      </motion.div>
      {children && <div className="absolute inset-x-0 bottom-[24%] z-20">{children}</div>}
    </div>
  );
}
