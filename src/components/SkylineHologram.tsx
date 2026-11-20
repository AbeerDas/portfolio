import { motion } from "framer-motion";

// World units are drawn on a 2:1 isometric grid, so moving one unit along x or y shifts the drawing one step
// sideways and half a step down, and moving up one unit shifts it one step up.
type Vec = [number, number, number];

const UNIT = 9;
const ORIGIN_X = 640;
const ORIGIN_Y = 640;
const WIDTH = 1600;
const HEIGHT = 720;

function project([x, y, z]: Vec): [number, number] {
  return [ORIGIN_X + (x - y) * UNIT, ORIGIN_Y + (x + y) * UNIT * 0.5 - z * UNIT];
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
  return { cx, cy, rx: radius * Math.SQRT2 * UNIT, ry: (radius * Math.SQRT2 * UNIT) / 2 };
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

// The Golden Gate runs along y, its near end leaving the bottom of the picture and its far end reaching into Toronto.
const DECK_Z = 4.2;
const DECK_WIDTH = 3;
const BRIDGE_NEAR_Y = 48;
const BRIDGE_FAR_Y = -36;
const TOWER_YS = [-24, 4];
const TOWER_HEIGHT = 24;
const CABLE_LOW_Z = DECK_Z + 1.4;

// Height of the main cable at y: a sag between the towers, and a rise from each anchorage up to a tower top.
function cableZ(y: number) {
  const [far, near] = TOWER_YS as [number, number];
  const top = TOWER_HEIGHT - 0.6;
  if (y >= far && y <= near) {
    const half = (near - far) / 2;
    const t = (y - (far + half)) / half;
    return CABLE_LOW_Z + (top - CABLE_LOW_Z) * t * t;
  }
  const anchorage = y < far ? BRIDGE_FAR_Y : near + 12;
  const tower = y < far ? far : near;
  const t = (y - anchorage) / (tower - anchorage);
  return DECK_Z + (top - DECK_Z) * Math.pow(t, 1.5);
}

function bridgeShapes(): Shape[] {
  const shapes: Shape[] = [];
  for (let y = BRIDGE_FAR_Y; y < BRIDGE_NEAR_Y; y += 4) {
    shapes.push(...box(0, y, DECK_Z - 0.8, DECK_WIDTH, 4, 0.8));
  }
  for (const towerY of TOWER_YS) {
    for (const legX of [-0.3, DECK_WIDTH - 0.4]) shapes.push(...box(legX, towerY - 0.35, 0, 0.7, 0.7, TOWER_HEIGHT));
    for (const strutZ of [DECK_Z + 2.2, 11.5, 16.5, 21, TOWER_HEIGHT - 0.5]) {
      shapes.push(...box(0.4, towerY - 0.25, strutZ, DECK_WIDTH - 0.8, 0.5, 0.6));
    }
  }
  const anchorageNear = (TOWER_YS[1] ?? 0) + 12;
  for (const x of [0, DECK_WIDTH]) {
    let previous: Vec | null = null;
    for (let y = BRIDGE_FAR_Y; y <= anchorageNear + 0.01; y += 1) {
      const point: Vec = [x, y, cableZ(y)];
      if (previous) shapes.push({ depth: x + y + 0.5, d: line([previous, point]) });
      if (point[2] > DECK_Z + 0.4) shapes.push({ depth: x + y + 0.4, d: line([point, [x, y, DECK_Z]]) });
      previous = point;
    }
  }
  return shapes;
}

// The CN Tower stands just past the bridge's far tower, so the far span runs behind its shaft.
const CN_X = 7;
const CN_Y = -29;

function cnTowerShapes(): Shape[] {
  const legs = [90, 210, 330].map((angle) => {
    const radians = (angle * Math.PI) / 180;
    const foot: Vec = [CN_X + Math.cos(radians) * 2.6, CN_Y + Math.sin(radians) * 2.6, 0];
    const joint: Vec = [CN_X + Math.cos(radians) * 0.9, CN_Y + Math.sin(radians) * 0.9, 9];
    return { depth: CN_X + CN_Y + 1, d: line([foot, joint]) };
  });
  return [
    ...legs,
    ...cylinder(CN_X, CN_Y, 2, 33, 1.25, 0.8),
    ...cylinder(CN_X, CN_Y, 32.6, 35.2, 2.7),
    ...cylinder(CN_X, CN_Y, 35.2, 36.2, 2.1),
    ...cylinder(CN_X, CN_Y, 36.2, 44, 0.55, 0.5),
    ...cylinder(CN_X, CN_Y, 44, 45.4, 1.1),
    ...cylinder(CN_X, CN_Y, 45.4, 58, 0.22, 0.06),
  ].map((shape) => ({ ...shape, depth: CN_X + CN_Y + 2 }));
}

// Rogers Centre's dome at the tower's foot.
function domeShapes(): Shape[] {
  const x = 13;
  const y = -21;
  const base = ellipseAt(x, y, 0, 5.2);
  const f = (n: number) => n.toFixed(1);
  const rise = 3.4 * UNIT;
  const shell = `M ${f(base.cx - base.rx)} ${f(base.cy)} A ${f(base.rx)} ${f(base.ry + rise)} 0 0 1 ${f(base.cx + base.rx)} ${f(base.cy)} A ${f(base.rx)} ${f(base.ry)} 0 0 1 ${f(base.cx - base.rx)} ${f(base.cy)} Z`;
  const ribs = [0.55, 0.25].map(
    (k) => `M ${f(base.cx - base.rx * k)} ${f(base.cy + base.ry * 0.4)} A ${f(base.rx * k)} ${f(base.ry + rise * 0.9)} 0 0 1 ${f(base.cx + base.rx * k)} ${f(base.cy + base.ry * 0.4)}`,
  );
  const depth = x + y + 5;
  return [{ face: "top", depth, d: shell }, ...ribs.map((d) => ({ depth: depth + 0.1, d }))];
}

// Transamerica's pyramid among San Francisco's towers, behind the bridge on the left.
function pyramidShapes(x: number, y: number, size: number, height: number): Shape[] {
  const apex: Vec = [x + size / 2, y + size / 2, height];
  const depth = x + y + size * 2;
  return [
    { face: "south", depth, d: polygon([[x, y + size, 0], [x + size, y + size, 0], apex]) },
    { face: "east", depth, d: polygon([[x + size, y, 0], [x + size, y + size, 0], apex]) },
    { depth, d: line([apex, [apex[0], apex[1], height + 4]]) },
  ];
}

// Left corner, footprint and height of the plain towers in each city, thinning out toward the edges of the picture.
const SAN_FRANCISCO_BLOCKS: Array<[number, number, number, number, number]> = [
  [-17, -24, 3, 3, 10], [-21, -20, 3, 3, 15], [-14, -30, 2.6, 3, 19], [-24, -27, 3, 2.6, 12],
  [-19, -33, 3, 3, 8], [-11, -36, 3, 3, 13], [-27, -18, 2.6, 2.6, 7], [-30, -13, 3, 3, 10],
  [-26, -9, 2.6, 2.6, 6], [-33, -20, 3, 3, 14], [-30, -22, 3, 3, 16], [-40, -18, 3, 3, 12],
  [-34, -14, 2.6, 2.6, 8], [-38, -6, 2.6, 2.6, 7], [-46, -10, 3, 3, 9], [-52, -4, 3, 3, 14],
  [-56, -14, 3, 3, 10], [-48, 2, 2.6, 2.6, 6], [-62, -6, 3, 3, 8],
];

const TORONTO_BLOCKS: Array<[number, number, number, number, number]> = [
  [11, -36, 3, 3, 16], [15, -33, 2.6, 2.6, 11], [9, -41, 3, 3, 23], [14, -40, 3, 3, 19],
  [18, -37, 2.6, 3, 27], [19, -30, 3, 2.6, 9], [22, -34, 2.6, 2.6, 14], [24, -40, 2.6, 3, 9],
  [28, -44, 3, 3, 18], [32, -38, 2.6, 2.6, 11], [26, -50, 3, 3, 24], [34, -48, 3, 3, 14],
  [30, -56, 3, 3, 20], [38, -54, 3, 3, 10],
];

const scene: Shape[] = [
  ...SAN_FRANCISCO_BLOCKS.flatMap(([x, y, w, d, h]) => box(x, y, 0, w, d, h)),
  ...pyramidShapes(-9, -27, 4, 26),
  ...bridgeShapes(),
  ...cnTowerShapes(),
  ...domeShapes(),
  ...TORONTO_BLOCKS.flatMap(([x, y, w, d, h]) => box(x, y, 0, w, d, h)),
].sort((a, b) => a.depth - b.depth);

const FACE_FILLS: Record<Face, string> = { top: "#201c33", east: "#181628", south: "#12101f" };

// The scene rises out of the dark at the bottom and thins out at the sides.
const fadeEdges = {
  maskImage:
    "linear-gradient(to top, transparent, black 34%, black 95%, transparent), linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to top, transparent, black 34%, black 95%, transparent), linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

const scanlines = {
  backgroundImage: "repeating-linear-gradient(to bottom, rgba(196,181,253,0.06) 0 1px, transparent 1px 3px)",
};

// A faint purple hologram of the Golden Gate reaching back into the page toward the CN Tower, drawn in
// isometric 3D so the two cities share one scene.
export default function SkylineHologram({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative select-none">
      {children && <div className="relative z-10 flex justify-center">{children}</div>}
      <div aria-hidden className="relative -mt-2 h-[300px] overflow-hidden sm:aspect-[1600/720] sm:h-auto" style={fadeEdges}>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="xMidYMax slice"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="holo-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HEIGHT}>
                <stop offset="0%" stopColor="#e9d5ff" />
                <stop offset="55%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#7980fe" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <g opacity={0.55}>
              <g stroke="url(#holo-stroke)" strokeWidth={0.9} strokeLinejoin="round" strokeLinecap="round">
                {scene.map((shape, i) => (
                  <path key={i} d={shape.d} fill={shape.face ? FACE_FILLS[shape.face] : "none"} />
                ))}
              </g>
            </g>
          </svg>
        </motion.div>
        <div className="pointer-events-none absolute inset-0" style={scanlines} />
      </div>
      <p aria-hidden className="mt-3 text-center font-mono text-[11px] tracking-[0.35em] text-muted-foreground/50">
        BASED IN TORONTO AND SF
      </p>
    </div>
  );
}
