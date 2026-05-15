import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ArrowLeft,
  ArrowUpRight,
  FileUp,
  MessageCircleQuestion,
  FormInput,
} from "lucide-react";

import CaseTOC from "@/components/CaseTOC";

import spellbookLongLogo from "@/images/spellbook/SpellbookLongLogo.svg";
import spellbookDemo from "@/images/spellbook/SpellbookDemo.svg";
import spellbookCrew from "@/images/spellbook/spellbook-crew.jpeg";
import workflow1 from "@/images/spellbook/workflow-1.png";
import workflow2 from "@/images/spellbook/workflow-2.png";
import workflowChat1 from "@/images/spellbook/workflow-1-chat-1.png";
import workflowChat2 from "@/images/spellbook/workflow-1-chat-2.png";
import workflowChat3 from "@/images/spellbook/workflow-1-chat-3.png";
import workflowNatural1 from "@/images/spellbook/workflow-natural-1.png";
import orgProfile1 from "@/images/spellbook/org-profile-1.png";
import orgProfile3 from "@/images/spellbook/org-profile-3.png";
import orgProfileChat1 from "@/images/spellbook/org-profile-chat-1.png";
import orgProfileChat2 from "@/images/spellbook/org-profile-chat-2.png";
import personalization1 from "@/images/spellbook/personalization-1.png";
import reviewTableUi from "@/images/spellbook/review-table-ui.png";

const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "spellbook", label: "Spellbook" },
  { id: "workflows", label: "Workflows" },
  { id: "nl-builder", label: "NL Builder" },
  { id: "org-profiles", label: "Company Profiles" },
  { id: "personalization", label: "Personalization" },
  { id: "analytics", label: "Analytics" },
  { id: "other-features", label: "Other Features" },
  { id: "experience", label: "What I'll Remember" },
];

const teamLinks: Array<{ name: string; short: string; href: string }> = [
  { name: "Scott Stevenson", short: "Scott", href: "https://www.linkedin.com/in/scottas/" },
  { name: "Mitch Hynes", short: "Mitch", href: "https://www.linkedin.com/in/mitchell-hynes/" },
  { name: "Matthew Stenback", short: "Matthew", href: "https://www.linkedin.com/in/matthewstenback/" },
  { name: "Patrick Frost", short: "Patrick", href: "https://www.linkedin.com/in/patrickfrost/" },
  { name: "Jack Harrhy", short: "Jack", href: "https://www.linkedin.com/in/jack-harrhy/" },
  { name: "Ethan Denny", short: "Ethan", href: "https://www.linkedin.com/in/ethan-denny-709/" },
  { name: "Marty Whelan", short: "Marty", href: "https://www.linkedin.com/in/mwln/" },
];

const findLink = (short: string) => teamLinks.find((p) => p.short === short)?.href ?? "#";

const Spellbook = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Spellbook · Abeer Das</title>
        <meta
          name="description"
          content="Software case study: my coop at Spellbook, building AI-powered legal workflows used by 4,400+ legal teams."
        />
      </Head>

      {/* Sticky top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => router.push("/#projects")}
          className="group flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
        <a
          href="https://www.spellbook.legal"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
        >
          Website
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </header>

      <CaseTOC items={tocItems} />

      <main className="mx-auto max-w-3xl px-6 pb-32 pt-32 md:pt-40">
        {/* Title block */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center">
            <Image
              src={spellbookLongLogo as string}
              alt="Spellbook"
              priority
              className="h-auto w-72 md:w-96"
            />
          </div>
          <p className="mt-6 text-lg text-muted-foreground">Summer 2026</p>
        </div>

        {/* Hero */}
        <div className="relative mt-16 aspect-video w-full overflow-hidden rounded-2xl border borderColour">
          <Image
            src={spellbookDemo as string}
            alt="Spellbook product demo"
            priority
            className="h-full w-full object-cover"
          />
        </div>

        {/* Two-column metadata + overview */}
        <section id="overview" className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Timeline</h3>
              <p className="mt-1 text-muted-foreground">
                4 Months, January – May 2026
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Team</h3>
              <div className="mt-1 flex flex-col text-muted-foreground">
                {teamLinks.map((person) => (
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
                <span className="text-muted-foreground/70">+ many others</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tools</h3>
              <p className="mt-1 text-muted-foreground">
                TypeScript · Next.js · tRPC · MongoDB · Mixpanel · Anthropic SDK
              </p>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p>
              As a Software Engineering Intern at Spellbook with a focus on{" "}
              <span className="text-gradient font-semibold tracking-tight">
                full product ownership
              </span>
              , I shipped features end-to-end from design through release. I worked across the
              stack on AI-powered legal workflows, and the projects I touched were small in
              surface area but pretty deep in impact!
            </p>
            <p>
              The team was small and senior, so over the course of the coop I was treated less
              like an intern and more like a full-time engineer. I shipped projects
              independently and got real ownership over product surfaces used by thousands of
              legal professionals.
            </p>
          </div>
        </section>

        {/* Spellbook company framing */}
        <section id="spellbook" className="mt-32">
          <h2 className="text-4xl font-semibold tracking-tight">Spellbook</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed">
            <p>
              Spellbook is an AI platform for legal work. It powers contract drafting, review,
              and negotiation for{" "}
              <span className="text-gradient font-semibold tracking-tight">
                4,400+ legal teams
              </span>
              , including in-house counsel, enterprise law firms, and mid-sized practices.
            </p>
            <p>
              It sits at an unusually interesting crossroads. Large enough that I worked
              alongside long-tenured engineers and product managers I learned a lot from, but
              lean enough that the things I shipped reached a massive base of legal users and
              shaped features they spent a real portion of their day inside.
            </p>
            <p>
              The competitive sphere is sharp. Harvey, Legora, Ivo, and others. But Spellbook is
              building toward something broader: AI for anyone who touches contracts. Contracts
              run the world. The bet is that the workflow and speed of contracts should match
              that of commerce.
            </p>
          </div>
          <blockquote className="mt-10 text-2xl italic md:text-3xl">
            <span className="text-gradient">Contracts at the speed of commerce.</span>
          </blockquote>

          {/* Transition: why I liked working there */}
          <div className="mt-12 space-y-6 text-lg leading-relaxed">
            <p>
              I had genuinely great managers. The bar for code review and product thinking was
              high, and my judgment was trusted early. By the back half of the coop I was
              scoping and shipping features that closed enterprise deals. That&apos;s a kind of
              ownership I didn&apos;t expect to have as a coop.
            </p>
          </div>
        </section>

        {/* 01 - Workflows */}
        <section id="workflows" className="mt-40">
          <p className="text-sm tracking-[0.3em] text-muted-foreground">01</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Multi-Step Workflows
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Lawyers live in repeated workflows. Clause comparison runs, NDA reviews, table
              population, redline rounds. Spellbook was great at one-shot AI work, but it had
              no structured way to express{" "}
              <em>&quot;do this, then this, then this.&quot;</em> On top of that, the
              agent&apos;s tool-firing at decision points was non-deterministic, which produced
              unreproducible failure logs in Datadog.
            </p>
            <p>
              Auditing how power users actually built their templates, three patterns kept
              showing up. They wanted the AI to{" "}
              <span className="text-gradient font-semibold tracking-tight">Ask for Files</span>
              ,{" "}
              <span className="text-gradient font-semibold tracking-tight">
                Ask Conditional Questions
              </span>
              , or{" "}
              <span className="text-gradient font-semibold tracking-tight">
                Ask for Variable Inputs
              </span>{" "}
              to populate documents.
            </p>
          </div>

          {/* Three-card row */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-xl border borderColour bg-white/[0.02] p-6">
              <FileUp className="h-6 w-6 text-primary" />
              <h4 className="text-lg font-semibold">Ask for Files</h4>
              <p className="text-sm text-muted-foreground">
                Pause the workflow until the user uploads a constrained set (exact-count,
                at-most, at-least, or any) across five file types.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border borderColour bg-white/[0.02] p-6">
              <MessageCircleQuestion className="h-6 w-6 text-primary" />
              <h4 className="text-lg font-semibold">Ask Conditional Questions</h4>
              <p className="text-sm text-muted-foreground">
                Render structured options as chips with a custom-answer escape hatch. The model
                branches based on the answer with no parsing ambiguity.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border borderColour bg-white/[0.02] p-6">
              <FormInput className="h-6 w-6 text-primary" />
              <h4 className="text-lg font-semibold">Ask for Variable Inputs</h4>
              <p className="text-sm text-muted-foreground">
                Collect form-style inputs from the user that get threaded into downstream steps
                as template variables.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-6 text-lg leading-relaxed">
            <p>
              I designed the data model with templates separated from run state, so workflow
              execution is always queryable and resumable. The reliability work centered on a
              single agent tool: a step-completion call that advances state and returns the next
              step&apos;s typed config. That means the frontend renders the right interaction
              zone from a structured response instead of guessing. That single change collapsed{" "}
              <span className="text-gradient font-semibold tracking-tight">
                ~50% of the dominant Datadog error class
              </span>
              !
            </p>
            <p>
              The shape the model returns when it finishes a step looks roughly like this. The
              frontend reads <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-base">nextStep.kind</code>{" "}
              and renders the matching interaction zone, no guessing:
            </p>
          </div>

          <pre className="mt-6 overflow-x-auto rounded-xl border borderColour bg-[#0A0A13] p-6 font-mono text-sm leading-relaxed text-foreground/90">
{`type StepResult =
  | { status: "in_progress"; nextStep: NextStep }
  | { status: "workflow_complete" };

type NextStep =
  | { kind: "autonomous"; prompt: string }
  | { kind: "ask_for_files"; constraint: FileConstraint }
  | { kind: "ask_conditional"; options: ChoiceOption[] }
  | { kind: "ask_variable_inputs"; fields: InputField[] };`}
          </pre>

          <div className="mt-8 space-y-6 text-lg leading-relaxed">
            <p>Workflows were cited as a deal-closing feature in enterprise sales calls.</p>
          </div>

          {/* Workflow setup UIs side by side */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border borderColour">
              <Image
                src={workflow1}
                alt="Workflow builder UI"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
            <div className="overflow-hidden rounded-xl border borderColour">
              <Image
                src={workflow2}
                alt="Workflow management UI"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
          </div>

          {/* Chat-side step sequence — horizontal scroll-snap carousel with captions */}
          <div className="mt-8">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Swipe to see the steps in action
            </p>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
              <figure className="w-[85%] shrink-0 snap-center md:w-[70%]">
                <div className="overflow-hidden rounded-xl border borderColour">
                  <Image
                    src={workflowChat1}
                    alt="Ask for Files step in chat"
                    className="h-full w-full object-cover"
                    placeholder="blur"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Ask for Files.</span> The user
                  is given the chance to upload the documents the workflow needs.
                </figcaption>
              </figure>

              <figure className="w-[85%] shrink-0 snap-center md:w-[70%]">
                <div className="overflow-hidden rounded-xl border borderColour">
                  <Image
                    src={workflowChat2}
                    alt="Conditional question input in chat"
                    className="h-full w-full object-cover"
                    placeholder="blur"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Conditional Question Input.</span>{" "}
                  The agent renders structured options so the workflow can branch based on the
                  user&apos;s answer.
                </figcaption>
              </figure>

              <figure className="w-[85%] shrink-0 snap-center md:w-[70%]">
                <div className="overflow-hidden rounded-xl border borderColour">
                  <Image
                    src={workflowChat3}
                    alt="AI agent making identifications and edits"
                    className="h-full w-full object-cover"
                    placeholder="blur"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">The Agent Acts.</span> The AI
                  then makes the identifications and edits across the document.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 02 - NL Builder */}
        <section id="nl-builder" className="mt-40">
          <p className="text-sm tracking-[0.3em] text-muted-foreground">02</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Natural Language Workflow Builder
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Workflows were powerful but intimidating to configure manually. Even Legal
              Solution Advisors had a hard time demoing them. Reading through support logs and
              the feedback our LSAs were channeling internally, I realized the highest-leverage
              move wasn&apos;t more workflow features. It was making workflows{" "}
              <em>describable</em>!
            </p>
            <p>
              This one I scoped and built on{" "}
              <span className="text-gradient font-semibold tracking-tight">
                my own initiative
              </span>
              . I traced the request through logs, Slack signal, and what LSAs were quietly
              asking for, then pitched it. It shipped behind a feature flag as a premium
              onboarding accelerator, and was attributed to the closure of a{" "}
              <span className="text-gradient font-semibold tracking-tight">
                $100k+ enterprise contract
              </span>{" "}
              later that quarter!
            </p>
            <p>
              A conversational builder that takes plain-English descriptions of a workflow,
              generates a complete schema-validated plan via Claude Haiku in a single
              structured-object call, and lets users iterate the proposal in natural language
              before it becomes a live workflow. The system prompt encodes the semantics of
              agent-mode step execution and the composition rules a useful legal workflow needs.
              For example, the last step has to produce a deliverable, not leave the user
              hanging on input. Defaults are filled server-side so the LLM only authors what it
              should be authoring.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border borderColour">
            <Image
              src={workflowNatural1}
              alt="Natural language workflow builder"
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
        </section>

        {/* 03 - Company Profiles */}
        <section id="org-profiles" className="mt-40">
          <p className="text-sm tracking-[0.3em] text-muted-foreground">03</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Company Profiles
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Spellbook needed to{" "}
              <span className="text-gradient font-semibold tracking-tight">
                understand the company using it.
              </span>{" "}
              Not in a vague personalization way, but in a structured legal-context way. What
              industry are you in? What&apos;s your regulatory environment? Who are your
              customers? Without that, the AI was generic. With it, the AI suddenly fit.
            </p>
            <p>
              Zero to GA in ~3 weeks. Became the{" "}
              <span className="text-gradient font-semibold tracking-tight">
                anchor feature for the in-house enterprise push
              </span>
              !
            </p>
            <p>
              A company profile document model covering name, description, address, industry,
              size, revenue, customer type, regulatory context, and legal focus areas. Profiles
              auto-attach to new projects via a pre-save hook, so users never have to wire
              context manually. A full CRUD surface, an AI-powered autofill that uses
              structured tool-calling to bootstrap profiles from minimal input, and an agent
              tool that can request a profile switch mid-conversation when the model thinks the
              user&apos;s query needs a different lens. Telemetry attaches the profile ID to
              every LLM event downstream.
            </p>
          </div>

          {/* Profile editor images */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border borderColour">
              <Image
                src={orgProfile1}
                alt="Company profile editor"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
            <div className="overflow-hidden rounded-xl border borderColour">
              <Image
                src={orgProfile3}
                alt="Company profile details"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
          </div>

          {/* Chat with profile context, stacked vertically */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="overflow-hidden rounded-xl border borderColour">
              <Image
                src={orgProfileChat1}
                alt="AI using company context in chat"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
            <div className="overflow-hidden rounded-xl border borderColour">
              <Image
                src={orgProfileChat2}
                alt="Profile-aware chat response"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
          </div>
        </section>

        {/* 04 - Personalization */}
        <section id="personalization" className="mt-40">
          <p className="text-sm tracking-[0.3em] text-muted-foreground">04</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Personalization
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Not ticketed, not requested by management. I audited support escalations and saw
              a pattern: one of our enterprise accounts (a massive company in Korea) wanted the
              AI&apos;s <em>behavior</em> to change in account-scoped ways. Korean outputs. Less
              verbose English. A more assertive legal tone. Rather than patching with one-off
              prompt hacks per customer, I designed a generalized personalization system.
            </p>
            <p>
              Three preference axes: verbosity, tone register, and a freeform custom-instructions
              field. Stored in a dedicated MongoDB document separate from the user record,
              upserted so each user has exactly one. Threaded into the system prompt pipeline at
              agent init and into the document-editing subagent, so style settings apply whether
              the user is chatting or asking the AI to edit a doc directly. Closed an entire
              category of recurring support escalations and quietly created the infrastructure
              for international expansion. No model retraining required!
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border borderColour">
            <Image
              src={personalization1}
              alt="Personalization settings UI"
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
        </section>

        {/* 05 - Analytics */}
        <section id="analytics" className="mt-40">
          <p className="text-sm tracking-[0.3em] text-muted-foreground">05</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Analytics &amp; Event Tracking
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Across every feature I shipped, I instrumented the analytics layer underneath it.
              Before this work, the team had no reliable signal on whether workflows were being
              started or completed, where the company-profile wizard converted, or how the
              natural-language builder was being iterated.
            </p>
            <p>
              Two layers. A backend analytics service wired into the tRPC middleware that
              resolves identity from request-scoped storage, so events fired from inside LLM
              tool execution carry the right user. And a frontend hook proxied through a
              first-party domain to dodge ad blockers. I instrumented the full workflow funnel:
              step completion, workflow completion, and a reliability sentinel event that fires
              when the agent ends a turn without completing its step, carrying enough diagnostic
              context to reproduce the failure class.
            </p>
            <p>
              I authored{" "}
              <span className="text-gradient font-semibold tracking-tight">
                ~25 unique events
              </span>{" "}
              tied specifically to the work I shipped (workflows, the NL builder, company profiles,
              personalization). The Datadog dashboards built on top of those events caught{" "}
              <span className="text-gradient font-semibold tracking-tight">
                3 critical drop-offs before they reached users
              </span>
              , which felt like the most concrete proof that the instrumentation was actually
              useful and not just bookkeeping!
            </p>
            <p>
              I also authored the team&apos;s analytics reference document, covering Mixpanel
              funnels, formulas, event-to-layer mappings, and named gaps, so the team could
              iterate confidently after my term ended.
            </p>
          </div>
        </section>

        {/* 06 - Other Features */}
        <section id="other-features" className="mt-40">
          <p className="text-sm tracking-[0.3em] text-muted-foreground">06</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Other Features
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Outside the four core systems above, I shipped a steady stream of surface work
              that lifted the product&apos;s perceived polish. The Review Tables redesign got a
              slide-over panel, fullscreen toggle, inline rename, desktop push notifications on
              run completion, and three-format export. It became one of our most-demoed
              surfaces. Compare Documents got a four-column PDF export and significance-based
              filtering implemented at the prompt level, so the model just doesn&apos;t generate
              low-signal output. Advanced search across project names and message content,
              taskbar status indicators with collapsible per-file progress, and project
              auto-naming all chipped away at friction in the core chat-and-review loop.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border borderColour">
            <Image
              src={reviewTableUi}
              alt="Review tables UI"
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
        </section>

        {/* Featured In */}
        <section className="mt-40">
          <h2 className="text-2xl font-semibold tracking-tight">Featured In</h2>
          <p className="mt-3 text-muted-foreground">
            A couple of Spellbook&apos;s monthly product spotlights where the work I shipped
            went live for all teams.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <a
              href="https://www.spellbook.legal/blog/whats-new-in-spellbook-march-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-xl border borderColour bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Spellbook · March 2026
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="text-lg font-semibold leading-snug">
                What&apos;s New in Spellbook · March 2026
              </h3>
              <p className="text-sm text-muted-foreground">
                The release that introduced{" "}
                <span className="text-foreground font-medium">Company Profiles</span> to the
                product.
              </p>
            </a>

            <a
              href="https://www.spellbook.legal/blog/the-revision-spellbooks-april-product-release"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-xl border borderColour bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Spellbook · April 2026
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="text-lg font-semibold leading-snug">
                The Revision · Spellbook&apos;s April Product Release
              </h3>
              <p className="text-sm text-muted-foreground">
                Covering the{" "}
                <span className="text-foreground font-medium">Tone &amp; Style settings page</span>{" "}
                and the{" "}
                <span className="text-foreground font-medium">Multi-Step Workflows</span> file
                and question step updates.
              </p>
            </a>
          </div>
        </section>

        {/* Crew photo */}
        <section className="mt-40">
          <h2 className="text-2xl font-semibold tracking-tight">The Crew</h2>
          <p className="mt-3 text-muted-foreground">Some fun moments with the team.</p>
          <figure className="mt-10 overflow-hidden rounded-xl border borderColour">
            <Image
              src={spellbookCrew}
              alt="The Spellbook crew"
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </figure>
        </section>

        {/* What I'll Remember */}
        <section id="experience" className="mt-40">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            What I&apos;ll Remember
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Spellbook is sitting at an unusual moment. Large enough that you&apos;re
              surrounded by senior engineers and PMs worth learning from, lean enough that the
              things you ship reach a massive base of legal teams who actually depend on them.
              That balance is rare, and the months I was there were genuinely formative.
            </p>
            <p>
              I&apos;m proud of what I shipped, but more than that I&apos;m grateful for the
              trust I got. By the end I was scoping work independently, owning systems
              end-to-end, and seeing my features cited in sales calls. That&apos;s not the coop
              experience I expected, and it&apos;s not one most coops get!
            </p>
            <p>
              Thanks to{" "}
              <a
                href={findLink("Mitch")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Mitch
              </a>{" "}
              for the mentorship and the bar he set, to{" "}
              <a
                href={findLink("Jack")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Jack
              </a>
              ,{" "}
              <a
                href={findLink("Ethan")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Ethan
              </a>
              , and{" "}
              <a
                href={findLink("Marty")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Marty
              </a>{" "}
              for the code reviews and the standards, and to everyone on the team who treated me
              as a peer earlier than I deserved.
            </p>
          </div>
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

export default Spellbook;
