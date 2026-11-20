import { cn } from "@/lib/utils";

const haze = "radial-gradient(closest-side, rgba(240,255,247,0.06), rgba(121,128,254,0.05) 45%, transparent)";

// A soft pale glow behind part of the page, matching the haze at the top of the homepage.
export default function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 h-[36rem] w-[36rem]", className)}
      style={{ background: haze }}
    />
  );
}
