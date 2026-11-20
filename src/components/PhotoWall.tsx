import Image from "next/image";
import { cn } from "@/lib/utils";

export type Photo = { src: string; alt: string; caption: string };

const MAIN_COLUMNS = 3;
// Each column repeats its own photos until it is long enough to stay filled while it scrolls.
const MIN_PER_COLUMN = 6;

// Deals the photos out like cards across the three main columns, so no photo appears in two of them at once.
function mainColumns(photos: Photo[]) {
  return Array.from({ length: MAIN_COLUMNS }, (_, column) => {
    const own = photos.filter((_, i) => i % MAIN_COLUMNS === column);
    const repeated: Photo[] = [];
    while (own.length > 0 && repeated.length < MIN_PER_COLUMN) repeated.push(...own);
    return repeated;
  });
}

// The faint outer columns repeat every photo starting from a different one, so a copy never sits level with its original.
function shifted(photos: Photo[], start: number) {
  return [...photos.slice(start), ...photos.slice(0, start)];
}

type Column = { photos: Photo[]; faint: boolean; duration: string; className?: string };

function columnsOf(photos: Photo[]): Column[] {
  const [left = [], middle = [], right = []] = mainColumns(photos);
  return [
    { photos: shifted(photos, 4), faint: true, duration: "96s", className: "hidden flex-[0.6] sm:block" },
    { photos: left, faint: false, duration: "70s" },
    { photos: middle, faint: false, duration: "86s" },
    { photos: right, faint: false, duration: "78s", className: "hidden sm:block" },
    { photos: shifted(photos, 7), faint: true, duration: "104s", className: "hidden flex-[0.6] sm:block" },
  ];
}

// Clear over the three main columns, fading out across the faint ones on either side.
const softEdges = {
  maskImage:
    "linear-gradient(to right, transparent, black 13%, black 87%, transparent), linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 13%, black 87%, transparent), linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

// A tilted wall of photos drifting in alternating directions, paused while hovered, naming each photo as it lights up.
export default function PhotoWall({ photos, className }: { photos: Photo[]; className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden", className)} style={softEdges}>
      <div className="absolute inset-x-[-4%] inset-y-[-12%] flex gap-3 [transform:rotate(-8deg)]">
        {columnsOf(photos).map((column, c) => {
          const firstShowing = new Set<string>();
          return (
            <div key={c} className={cn("flex-1", column.className)}>
              <div
                className={cn(
                  "group-hover:[animation-play-state:paused] motion-reduce:animate-none",
                  c % 2 === 0 ? "animate-marquee-up" : "animate-marquee-down",
                )}
                style={{ animationDuration: column.duration }}
              >
                {/* The list runs twice so the loop restarts without a visible jump. */}
                {[...column.photos, ...column.photos].map((photo, i) => (
                  <div key={`${photo.src}-${i}`} className="pb-3">
                    <div
                      className={cn(
                        "group/photo relative aspect-[3/2] overflow-hidden rounded-xl transition duration-500",
                        column.faint ? "opacity-[0.12]" : "opacity-60 hover:scale-[1.04] hover:opacity-100",
                      )}
                    >
                      <Image
                        src={photo.src}
                        alt={column.faint || firstShowing.has(photo.src) ? "" : (firstShowing.add(photo.src), photo.alt)}
                        fill
                        sizes="(min-width: 1024px) 220px, 45vw"
                        className="object-cover"
                      />
                      {!column.faint && (
                        <span
                          aria-hidden
                          className="absolute bottom-2 left-2 max-w-[90%] truncate rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/90 opacity-0 backdrop-blur-sm transition duration-300 group-hover/photo:opacity-100"
                        >
                          {photo.caption}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
