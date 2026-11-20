import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Maximize2, Plus, X, ZoomIn, ZoomOut } from "lucide-react";

import CaseTOC from "@/components/CaseTOC";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

import orchestration from "@/images/sibyl/orchestration.jpg";
import ifrsStandards from "@/images/sibyl/ifrs.png";

const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "system", label: "System Design" },
  { id: "agents", label: "The Agents" },
  { id: "verdicts", label: "Earning a Verdict" },
  { id: "decisions", label: "Design Decisions" },
  { id: "interface", label: "The Interface" },
  { id: "conclusion", label: "Conclusion" },
];

const team: Array<{ name: string; href: string }> = [
  { name: "Abeer Das", href: "https://devpost.com/AbeerDas" },
  { name: "Aaron Chow", href: "https://devpost.com/aaron-sl-chow" },
  { name: "Tawsif Mayaz", href: "https://devpost.com/tawsifmayaz" },
];

const phases: Array<{ short: string; title: string; body: string }> = [
  {
    short: "Extract",
    title: "Extract the claims",
    body: "The claims agent reads the whole parsed report in one pass and tags every verifiable claim with its type, page and likely IFRS paragraph.",
  },
  {
    short: "Route",
    title: "Route each claim",
    body: "The orchestrator builds a routing plan and sends each claim to one or more specialists. A geographic emissions claim can go to geography and data at the same time.",
  },
  {
    short: "Investigate",
    title: "Investigate in parallel",
    body: "Five specialists work at once, each seeing only the claims in its own domain.",
  },
  {
    short: "Judge",
    title: "Judge, and loop",
    body: "The judge scores the evidence for every claim. Weak claims go back for another round with a specific gap to close, up to three cycles.",
  },
  {
    short: "Find gaps",
    title: "Find what's missing",
    body: "The legal agent compares every IFRS requirement against what the report covers and flags each disclosure the company left out.",
  },
];

type Agent = {
  name: string;
  role: string;
  model: string;
  color: string;
  body: string;
  x: number;
  y: number;
  labelRight?: boolean;
};

// Laid out the way a claim travels, extraction and routing on the left, specialists in the middle, the judge on the right.
const agents: Agent[] = [
  { name: "Menny", role: "Claims", model: "Gemini 3 Flash", color: "#7c9cbf", x: 70, y: 170, body: "Extracts and categorizes every verifiable claim before anything else runs." },
  { name: "Bron", role: "Orchestrator", model: "Claude Sonnet 4.5", color: "#b8a99a", x: 230, y: 170, body: "Routes claims, brokers requests between agents and takes re-investigation orders from the judge." },
  { name: "Columbo", role: "Geography", model: "Gemini 2.5 Pro", color: "#6aaa64", x: 470, y: 40, labelRight: true, body: "Pulls Sentinel-2 satellite imagery and measures vegetation change, so a reforestation claim gets checked from space." },
  { name: "Mike", role: "Legal", model: "Claude Sonnet 4.5", color: "#9b6dd0", x: 470, y: 105, labelRight: true, body: "Maps each claim to IFRS paragraphs like S2.14(a)(iv) and checks every sub-requirement." },
  { name: "Izzy", role: "News", model: "Claude Sonnet 4.5", color: "#e8b84b", x: 470, y: 170, labelRight: true, body: "Searches company, industry and controversy coverage, weighting each source by credibility." },
  { name: "Newton", role: "Academic", model: "DeepSeek V3.2", color: "#4db6ac", x: 470, y: 235, labelRight: true, body: "Checks methods against frameworks like the GHG Protocol and Science Based Targets." },
  { name: "Rhea", role: "Data", model: "Claude Sonnet 4.5", color: "#e8855a", x: 470, y: 300, labelRight: true, body: "Recomputes totals, reduction rates and target feasibility with a calculator tool instead of model math." },
  { name: "Judy", role: "Judge", model: "Claude Opus 4.5", color: "#c0392b", x: 700, y: 170, body: "Scores the evidence and issues a verdict, or sends the claim back with what's missing." },
];

const ORCHESTRATOR = 1;
const JUDGE = 7;
const SPECIALISTS = [2, 3, 4, 5, 6];

const rubric: Array<{ label: string; weight: number; color: string; detail: string }> = [
  { label: "Sufficiency", weight: 30, color: "#7980fe", detail: "Is there enough evidence to decide at all" },
  { label: "Consistency", weight: 25, color: "#9a70ff", detail: "Do the agents' findings agree with each other" },
  { label: "Quality", weight: 25, color: "#b794f6", detail: "How authoritative the sources are, with legal weighted above news" },
  { label: "Completeness", weight: 20, color: "#d8ccff", detail: "Did every relevant agent weigh in" },
];

const verdictTypes: Array<{ label: string; className: string }> = [
  { label: "Verified", className: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" },
  { label: "Unverified", className: "border-amber-400/40 bg-amber-400/10 text-amber-300" },
  { label: "Contradicted", className: "border-rose-400/40 bg-rose-400/10 text-rose-300" },
  { label: "Insufficient evidence", className: "border-slate-400/40 bg-slate-400/10 text-slate-300" },
];

const sourceWeights: Array<{ label: string; weight: number }> = [
  { label: "Investigative journalism and regulators", weight: 4 },
  { label: "Established outlets", weight: 3 },
  { label: "Press releases", weight: 2 },
  { label: "Social media", weight: 0 },
];

const decisions: Array<{ title: string; body: string }> = [
  {
    title: "Many agents, not one",
    body: "One context window juggling satellite imagery, legal text, emissions math and news coverage dilutes attention and gives inconsistent answers. Each specialist only sees the claims in its domain, like a real investigative team.",
  },
  {
    title: "An orchestrator and shared state, not a swarm",
    body: "Agents never talk to each other directly. They post requests to a shared state and the orchestrator routes them, which avoids every agent talking to every other one and keeps a clear audit trail.",
  },
  {
    title: "LangGraph for the loop",
    body: "The judge's re-investigation loop needs real cycles in the control flow. LangGraph gave us conditional edges, Postgres checkpointing and streaming callbacks out of the box, where CrewAI had no cycles and AutoGen added complexity we didn't need.",
  },
  {
    title: "pgvector inside Postgres",
    body: "Vectors live next to the claims and findings, so retrieval joins straight onto relational data. Search combines vector similarity with full-text matching and re-ranks the two, catching both concepts and exact terminology.",
  },
  {
    title: "Server-sent events over WebSockets",
    body: "Streaming agent reasoning only flows one way, from server to browser. Server-sent events are simpler and reconnect on their own.",
  },
  {
    title: "A model per job",
    body: "We matched each agent to the cheapest model that does its job well. A long-context model reads the full report, a low-cost model handles research synthesis, and the strongest reasoning model is saved for final verdicts.",
  },
];

const stateSchema = `class SibylState(BaseModel):
    report_id: str
    claims: list[Claim]                       # from the claims agent
    routing_plan: list[RoutingAssignment]     # from the orchestrator
    findings: list[AgentFinding]              # from the specialists
    info_requests: list[InfoRequest]          # cross-domain questions
    info_responses: list[InfoResponse]        # and their answers
    verdicts: list[ClaimVerdict]              # from the judge
    reinvestigation_requests: list[ReinvestigationRequest]
    iteration_count: int                      # capped at 3
    events: list[StreamEvent]                 # streamed to the dashboard`;

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <Reveal>
      <p className="text-sm tracking-[0.3em] text-muted-foreground">{number}</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
    </Reveal>
  );
}

// The orchestration diagram, opening full screen when clicked.
function DiagramViewer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the orchestration diagram full screen"
        className="group relative block w-full overflow-hidden rounded-2xl border borderColour bg-[#fff7ea] p-3 text-left"
      >
        <Image
          src={orchestration}
          alt="Sibyl agent orchestration flow"
          priority
          placeholder="blur"
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="h-auto w-full transition duration-500 group-hover:scale-[1.01]"
        />
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs text-white shadow-lg transition group-hover:bg-black">
          <Maximize2 className="h-3.5 w-3.5" />
          Click to enlarge
        </span>
      </button>
      <AnimatePresence>{open && <DiagramLightbox onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

// Full screen view of the diagram. Clicking it zooms to the diagram's own size, where its smallest labels are sharp,
// centred on the spot that was clicked, and scrolling moves around it.
function DiagramLightbox({ onClose }: { onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const zoomTarget = useRef({ x: 0.5, y: 0.5 });

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!zoomed || !scroller) return;
    scroller.scrollLeft = zoomTarget.current.x * scroller.scrollWidth - scroller.clientWidth / 2;
    scroller.scrollTop = zoomTarget.current.y * scroller.scrollHeight - scroller.clientHeight / 2;
  }, [zoomed]);

  const toggleZoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    zoomTarget.current = { x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.height };
    setZoomed((current) => !current);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={scrollerRef}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={cn("max-h-full overflow-auto rounded-xl bg-[#fff7ea] p-3", zoomed ? "w-full" : "w-full max-w-7xl")}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={toggleZoom}
          aria-label={zoomed ? "Zoom out of the diagram" : "Zoom into the diagram"}
          className={cn("block", zoomed ? "cursor-zoom-out" : "w-full cursor-zoom-in")}
          style={zoomed ? { width: orchestration.width } : undefined}
        >
          <Image
            src={orchestration}
            alt="Sibyl agent orchestration flow, enlarged"
            placeholder="blur"
            quality={90}
            sizes={zoomed ? `${orchestration.width}px` : "100vw"}
            className="h-auto w-full"
          />
        </button>
      </motion.div>
      <span className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white">
        {zoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
        {zoomed ? "Click to zoom out, scroll to move around" : "Click anywhere on the diagram to zoom in"}
      </span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close the diagram"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

// The five phases as a clickable pipeline, with the chosen step explained underneath.
function PipelineStepper() {
  const [step, setStep] = useState(0);
  return (
    <div className="mt-12">
      <div className="relative">
        <div className="absolute left-10 right-10 top-5 h-px bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-[#c4b5fd]"
            animate={{ width: `${(step / (phases.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <div className="relative flex justify-between">
          {phases.map((phase, i) => (
            <button
              key={phase.short}
              type="button"
              onClick={() => setStep(i)}
              aria-pressed={i === step}
              className="flex w-20 flex-col items-center gap-2 text-center"
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm transition duration-300",
                  i <= step ? "border-primary bg-primary/25 text-white" : "border-white/15 bg-background text-muted-foreground hover:border-white/40",
                  i === step && "shadow-[0_0_20px_rgba(121,128,254,0.6)]",
                )}
              >
                {i + 1}
              </span>
              <span className={cn("text-xs md:text-sm", i === step ? "text-foreground" : "text-muted-foreground")}>{phase.short}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Every step shares one cell, so the box keeps the height of the longest step and nothing below it moves. */}
      <div className="mt-8 grid">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.short}
            aria-hidden={i !== step}
            initial={false}
            animate={{ opacity: i === step ? 1 : 0, y: i === step ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            className={cn("[grid-area:1/1]", i !== step && "pointer-events-none")}
          >
            <h4 className="text-xl font-semibold">{phase.title}</h4>
            <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{phase.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// The agents as a map of how a claim moves between them. Hovering or tapping one explains it.
function AgentMap() {
  const [selected, setSelected] = useState(JUDGE);
  const chosen = agents[selected];
  const linked = (from: number, to: number) => selected === from || selected === to;
  const bron = agents[ORCHESTRATOR];
  const judy = agents[JUDGE];
  const menny = agents[0];

  return (
    <div className="mt-10">
      <svg viewBox="0 0 800 360" className="w-full overflow-visible" role="group" aria-label="How a claim moves between Sibyl's agents">
        <g fill="none" strokeWidth={1.3}>
          {menny && bron && (
            <path
              d={`M ${menny.x + 26} ${menny.y} H ${bron.x - 26}`}
              stroke={linked(0, ORCHESTRATOR) ? "#c4b5fd" : "rgba(255,255,255,0.15)"}
              strokeDasharray="4 6"
              className="animate-dash-flow motion-reduce:animate-none"
            />
          )}
          {bron &&
            judy &&
            SPECIALISTS.map((i) => {
              const specialist = agents[i];
              if (!specialist) return null;
              return (
                <g key={specialist.name}>
                  <path
                    d={`M ${bron.x + 26} ${bron.y} C ${bron.x + 130} ${bron.y}, ${specialist.x - 110} ${specialist.y}, ${specialist.x - 26} ${specialist.y}`}
                    stroke={linked(ORCHESTRATOR, i) ? specialist.color : "rgba(255,255,255,0.15)"}
                    strokeDasharray="4 6"
                    className="animate-dash-flow motion-reduce:animate-none"
                  />
                  <path
                    d={`M ${specialist.x + 26} ${specialist.y} C ${specialist.x + 110} ${specialist.y}, ${judy.x - 110} ${judy.y}, ${judy.x - 26} ${judy.y}`}
                    stroke={linked(i, JUDGE) ? specialist.color : "rgba(255,255,255,0.15)"}
                    strokeDasharray="4 6"
                    className="animate-dash-flow motion-reduce:animate-none"
                  />
                </g>
              );
            })}
          {bron && judy && (
            <path
              d={`M ${judy.x} ${judy.y + 30} C ${judy.x} 352, ${bron.x} 352, ${bron.x} ${bron.y + 30}`}
              stroke={selected === JUDGE || selected === ORCHESTRATOR ? "#c0392b" : "rgba(192,57,43,0.35)"}
              strokeDasharray="6 6"
              className="animate-dash-flow motion-reduce:animate-none"
            />
          )}
        </g>
        <text x={465} y={352} textAnchor="middle" fontSize={11} fill="#9ca3af">
          sent back for another round
        </text>

        {agents.map((agent, i) => {
          const isSelected = i === selected;
          return (
            <g
              key={agent.name}
              role="button"
              tabIndex={0}
              aria-label={`${agent.name}, the ${agent.role.toLowerCase()} agent`}
              aria-pressed={isSelected}
              onClick={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
              onFocus={() => setSelected(i)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected(i);
                }
              }}
              className="outline-none"
            >
              <circle
                cx={agent.x}
                cy={agent.y}
                r={isSelected ? 30 : 25}
                fill={agent.color}
                fillOpacity={isSelected ? 0.35 : 0.14}
                stroke={agent.color}
                strokeWidth={isSelected ? 2.5 : 1.5}
                style={{ transition: "all 0.25s ease", filter: isSelected ? `drop-shadow(0 0 10px ${agent.color})` : undefined }}
              />
              <text x={agent.x} y={agent.y + 6} textAnchor="middle" fontSize={17} fontWeight={600} fill="#ffffff">
                {agent.name.charAt(0)}
              </text>
              <text
                x={agent.labelRight ? agent.x + 40 : agent.x}
                y={agent.labelRight ? agent.y + 5 : agent.y + 50}
                textAnchor={agent.labelRight ? "start" : "middle"}
                fontSize={13}
                fill={isSelected ? "#ffffff" : "#9ca3af"}
              >
                {agent.name} · {agent.role}
              </text>
            </g>
          );
        })}
      </svg>

      <AnimatePresence mode="wait">
        {chosen && (
          <motion.div
            key={chosen.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-6 flex min-h-[6rem] gap-4"
          >
            <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: chosen.color, boxShadow: `0 0 12px ${chosen.color}` }} />
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="text-xl font-semibold">
                  {chosen.name} <span className="font-normal text-muted-foreground">the {chosen.role.toLowerCase()} agent</span>
                </h4>
                <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-muted-foreground">{chosen.model}</span>
              </div>
              <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{chosen.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// The judge's four weighted dimensions as a donut. Hovering a slice or a row picks it out.
function RubricDonut() {
  const [active, setActive] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const gap = 4;
  const chosen = rubric[active];
  let start = 0;

  return (
    <div className="mt-10 grid items-center gap-10 md:grid-cols-[240px_minmax(0,1fr)]">
      <svg viewBox="0 0 220 220" className="mx-auto w-56" role="img" aria-label="How the judge weights evidence">
        {rubric.map((row, i) => {
          const length = (circumference * row.weight) / 100;
          const offset = start;
          start += length;
          return (
            <circle
              key={row.label}
              cx={110}
              cy={110}
              r={radius}
              fill="none"
              stroke={row.color}
              strokeWidth={i === active ? 30 : 22}
              strokeDasharray={`${length - gap} ${circumference - length + gap}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 110 110)"
              opacity={i === active ? 1 : 0.4}
              onMouseEnter={() => setActive(i)}
              style={{ transition: "all 0.25s ease" }}
            />
          );
        })}
        {chosen && (
          <>
            <text x={110} y={108} textAnchor="middle" fontSize={34} fontWeight={600} fill="#ffffff">
              {chosen.weight}%
            </text>
            <text x={110} y={132} textAnchor="middle" fontSize={13} fill="#9ca3af">
              {chosen.label}
            </text>
          </>
        )}
      </svg>
      <ul className="space-y-1">
        {rubric.map((row, i) => (
          <li key={row.label}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition",
                i === active ? "bg-white/[0.06]" : "hover:bg-white/[0.03]",
              )}
            >
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: row.color }} />
              <span>
                <span className="flex items-baseline gap-2">
                  <span className="font-semibold">{row.label}</span>
                  <span className="text-sm text-muted-foreground">{row.weight}%</span>
                </span>
                <span className="block text-sm text-muted-foreground">{row.detail}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DecisionAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-10 border-t border-white/10">
      {decisions.map((decision, i) => {
        const isOpen = open === i;
        return (
          <div key={decision.title} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className={cn("text-lg font-semibold transition-colors", isOpen ? "text-foreground" : "text-foreground/80")}>
                {decision.title}
              </span>
              <Plus className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300", isOpen && "rotate-45 text-[#c4b5fd]")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-lg leading-relaxed text-muted-foreground">{decision.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const Sibyl = () => {
  const router = useRouter();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>Sibyl · Abeer Das</title>
        <meta
          name="description"
          content="Software case study: Sibyl, a multi-agent system that checks corporate sustainability reports against real-world evidence. 1st Place at Hack for Humanity 2026."
        />
      </Head>

      {/* Sticky top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => router.push("/#cases")}
          className="group flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/HackForHumanity2026/Sibyl"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://devpost.com/software/sibyl-x8gpor"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
          >
            Devpost
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      <CaseTOC items={tocItems} />

      <main className="mx-auto max-w-3xl px-6 pb-32 pt-32 md:pt-40">
        {/* Title block */}
        <Reveal className="flex flex-col items-center text-center">
          <h1 className="clash-grotesk text-7xl tracking-tight md:text-8xl">Sibyl</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A multi-agent system that checks sustainability reports against real-world evidence
          </p>
          <p className="text-gradient clash-grotesk mt-4 text-xl font-semibold tracking-tight md:text-2xl">
            1st Place &amp; Best Use of AI/ML · Hack for Humanity 2026
          </p>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.1} className="mt-16">
          <DiagramViewer />
        </Reveal>

        {/* Two-column metadata + overview */}
        <section id="overview" className="mt-24 grid scroll-mt-24 grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Timeline</h3>
              <p className="mt-1 text-muted-foreground">One month, Hack for Humanity 2026</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Team</h3>
              <div className="mt-1 flex flex-col text-muted-foreground">
                {team.map((person) => (
                  <a
                    key={person.name}
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {person.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tools</h3>
              <p className="mt-1 text-muted-foreground">
                Python · FastAPI · LangGraph · PostgreSQL · pgvector · React · TypeScript · OpenRouter
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p>
              Sibyl reads a corporate sustainability report and checks every claim in it against
              real-world evidence. It produces a{" "}
              <span className="text-gradient font-semibold tracking-tight">
                paragraph-level IFRS S1/S2 compliance report
              </span>{" "}
              that shows what a company claims and what it chose to leave out.
            </p>
            <p>
              We built it in a month for Hack for Humanity 2026, where it won 1st Place and Best Use
              of AI/ML. Nothing in it is mocked. It parses real PDFs, pulls real satellite imagery,
              searches real news and research, and maps every finding to the actual standard.
            </p>
          </Reveal>
        </section>

        {/* 01 - Problem */}
        <section id="problem" className="mt-40 scroll-mt-24">
          <SectionHeading number="01" title="The Problem" />
          <Reveal className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Sustainability reports run 100 to 200 pages of claims about emissions cuts, net-zero
              targets and governance, and they steer trillions of dollars in ESG investment. A 2020
              European Commission study found that more than half of green claims were vague or
              misleading, and 40% had no support at all.
            </p>
            <p>
              Since January 2024 the IFRS S1 and S2 standards require specific disclosures across
              governance, strategy, risk management, and metrics and targets. But no tool checked
              whether the claims behind those disclosures held up.
            </p>
            <p>
              Greenwashing isn&apos;t only invented claims. It&apos;s also{" "}
              <span className="text-gradient font-semibold tracking-tight">strategic omission</span>,
              like quietly dropping Scope 3 emissions from a report. We designed Sibyl to catch both.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <div className="overflow-hidden rounded-xl border borderColour bg-white p-4 opacity-[0.85]">
              <Image src={ifrsStandards} alt="IFRS S1 and S2 disclosure requirements" placeholder="blur" className="h-auto w-full" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The two standards Sibyl checks against. S1 sets how disclosures are structured, S2 sets
              what to disclose about climate.
            </p>
          </Reveal>
        </section>

        {/* 02 - System design */}
        <section id="system" className="mt-40 scroll-mt-24">
          <SectionHeading number="02" title="System Design" />
          <Reveal className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Sibyl is a LangGraph state machine. A report moves through five phases, sequential at
              first and then parallel. Click through them below.
            </p>
          </Reveal>
          <Reveal>
            <PipelineStepper />
          </Reveal>
          <Reveal className="mt-12 space-y-6 text-lg leading-relaxed">
            <p>
              The core design choice is that{" "}
              <span className="text-gradient font-semibold tracking-tight">
                specialists never talk to each other directly
              </span>
              . When one needs context from another domain, it posts a request to the shared state.
              The orchestrator spots it, routes it to the right agent, and the answer lands back in
              the same state. Every node reads and writes one schema, checkpointed to Postgres after
              each step, so a failed run resumes from the last good node.
            </p>
          </Reveal>
          <pre className="mt-6 overflow-x-auto rounded-xl border borderColour bg-[#0A0A13] p-6 font-mono text-sm leading-relaxed text-foreground/90">
            {stateSchema}
          </pre>
        </section>

        {/* 03 - Agents */}
        <section id="agents" className="mt-40 scroll-mt-24">
          <SectionHeading number="03" title="The Agents" />
          <Reveal className="mt-10 text-lg leading-relaxed">
            <p>
              Eight agents, each with one job and the model best suited to it. Hover or tap one to
              see what it does.
            </p>
          </Reveal>
          <Reveal>
            <AgentMap />
          </Reveal>
        </section>

        {/* 04 - Verdicts */}
        <section id="verdicts" className="mt-40 scroll-mt-24">
          <SectionHeading number="04" title="Earning a Verdict" />
          <Reveal className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              We didn&apos;t want a system that just sounds confident. Every verdict has to clear an
              explicit bar, and evidence is scored rather than taken at face value. The judge rates
              each claim on four weighted dimensions.
            </p>
          </Reveal>
          <Reveal>
            <RubricDonut />
          </Reveal>

          <Reveal className="mt-14 space-y-6 text-lg leading-relaxed">
            <p>
              A claim scoring above 0.7 gets a verdict. Below that, the judge doesn&apos;t guess. It
              sends a{" "}
              <span className="text-gradient font-semibold tracking-tight">targeted re-investigation request</span>{" "}
              back through the orchestrator, naming which agents should look again, the exact gap,
              and what would count as enough. After three cycles a verdict is forced.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <div className="relative pt-7">
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-500/50 via-amber-400/50 to-emerald-500/60" />
              <div className="absolute top-4 h-8 w-0.5 rounded bg-white" style={{ left: "70%" }} />
              <span className="absolute top-0 -translate-x-1/2 text-xs font-semibold text-white" style={{ left: "70%" }}>
                0.7
              </span>
              <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                <span>Sent back for another round</span>
                <span>Verdict issued</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {verdictTypes.map((verdict) => (
                <span key={verdict.label} className={cn("rounded-full border px-3 py-1 text-sm", verdict.className)}>
                  {verdict.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14 text-lg leading-relaxed">
            <p>The specialists hold their own evidence to a standard too.</p>
          </Reveal>
          <Reveal className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">How much a news source counts</h4>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-7">
                {sourceWeights.map((source) => (
                  <div key={source.label}>
                    <p
                      className={cn(
                        "clash-grotesk text-5xl tracking-tight md:text-6xl",
                        source.weight === 0 ? "text-muted-foreground/40" : "text-gradient",
                      )}
                    >
                      {source.weight}×
                    </p>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">
                      {source.weight === 0 ? `${source.label}, ignored` : source.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Kinds of contradiction</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Direct", "Contextual", "Omission", "Timeline"].map((kind) => (
                    <span key={kind} className="rounded-full border border-[#a78bfa]/30 bg-primary/10 px-3 py-1 text-sm text-[#d8ccff]">
                      {kind}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Math the model never does</h4>
                <p className="mt-3 text-muted-foreground">
                  Totals and reduction rates run through a calculator tool, so the numbers are right by
                  construction.
                </p>
                <code className="mt-3 block rounded-lg bg-[#0A0A13] px-4 py-3 font-mono text-sm text-[#d8ccff]">
                  safe_eval(&quot;(baseline - current) / baseline&quot;)
                </code>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 05 - Decisions */}
        <section id="decisions" className="mt-40 scroll-mt-24">
          <SectionHeading number="05" title="Design Decisions" />
          <Reveal>
            <DecisionAccordion />
          </Reveal>
        </section>

        {/* 06 - Interface */}
        <section id="interface" className="mt-40 scroll-mt-24">
          <SectionHeading number="06" title="The Interface" />
          <Reveal className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              A multi-agent system is hard to trust when you can&apos;t see it work. The{" "}
              <span className="text-gradient font-semibold tracking-tight">Detective Dashboard</span>{" "}
              turns each agent into an animated avatar in a small village built on React Flow. As the
              run streams in, claims travel between agents as animated edges, cross-domain requests
              collect in a shared message pool in the middle, and each agent&apos;s live reasoning
              pulses underneath it.
            </p>
            <p>
              The output is the{" "}
              <span className="text-gradient font-semibold tracking-tight">Source of Truth report</span>
              , organized by IFRS pillar. Every claim card shows its verdict, the evidence from each
              agent and the full reasoning chain. Hovering an IFRS tag like S2.14(a)(iv) shows the
              actual requirement, and each pillar ends with a list of what the report never disclosed.
            </p>
            <p>
              We gave it a warm cream palette on purpose, so it reads like a document you review
              rather than another dark monitoring dashboard.
            </p>
          </Reveal>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="mt-40 scroll-mt-24">
          <SectionHeading number="07" title="Conclusion" />
          <Reveal className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Sibyl checks a sustainability report the way an investigative team would. Each
              specialist owns one kind of evidence, the judge holds every verdict to an explicit bar
              and sends weak claims back, and the dashboard shows the whole investigation as it runs.
            </p>
            <p>
              We built it in a month, and it won{" "}
              <span className="text-gradient font-semibold tracking-tight">1st Place and Best Use of AI/ML</span>{" "}
              at Hack for Humanity 2026.
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://devpost.com/software/sibyl-x8gpor"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-white transition hover:bg-primary/90"
            >
              Read the Devpost
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://github.com/HackForHumanity2026/Sibyl"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:border-white/30"
            >
              See the code
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </section>

        {/* Footer signature */}
        <div className="mt-32 flex items-center justify-between border-t borderColour pt-8 text-sm text-muted-foreground">
          <span>Abeer Das</span>
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default Sibyl;
