import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Footprints, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Remembers in this browser that the visitor already counted themselves, so one person adds one.
const VISITED_KEY = "abeer-visited";
const EMAIL = "ak5das@uwaterloo.ca";
// Long enough to read the message, short enough that it doesn't linger.
const TOAST_MS = 2400;

type Toast = { message: string; copied: boolean; shownAt: number };

function countFrom(body: unknown) {
  return typeof body === "object" && body !== null && "count" in body && typeof body.count === "number"
    ? body.count
    : null;
}

export default function Footer() {
  const [count, setCount] = useState<number | null>(null);
  const [visited, setVisited] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    try {
      setVisited(window.localStorage.getItem(VISITED_KEY) === "1");
    } catch {
      // Storage blocked, as in some private windows. The visitor can still count themselves.
    }
    const controller = new AbortController();
    async function loadCount() {
      try {
        const response = await fetch("/api/visits", { signal: controller.signal });
        if (response.ok) setCount(countFrom(await response.json()));
      } catch {
        // Counter unreachable. The button still shows, just without a number.
      }
    }
    void loadCount();
    return () => controller.abort();
  }, []);

  async function markVisit() {
    if (visited) return;
    setVisited(true);
    try {
      window.localStorage.setItem(VISITED_KEY, "1");
    } catch {
      // Storage blocked. The count still goes up for this click.
    }
    try {
      const response = await fetch("/api/visits", { method: "POST" });
      if (response.ok) setCount(countFrom(await response.json()));
    } catch {
      // Counter unreachable. The thank-you still shows.
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast({ message: "Email copied to clipboard", copied: true, shownAt: Date.now() });
    } catch {
      // The browser refused, as on a page without a secure connection, so show the address to copy by hand.
      setToast({ message: `Couldn't copy it. The email is ${EMAIL}`, copied: false, shownAt: Date.now() });
    }
  }

  return (
    <footer className="relative z-10 w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between gap-4 py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by{" "}
            <Link href="https://github.com/AbeerDas" target="_blank" passHref className="text-foreground transition hover:text-primary">
              Abeer
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <button
            type="button"
            onClick={() => void markVisit()}
            disabled={visited}
            className={cn(
              "group hidden items-center gap-2 rounded-full border py-1 pl-3 pr-1 text-xs transition md:flex",
              visited
                ? "border-primary/30 bg-primary/10 text-foreground"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-foreground",
            )}
          >
            <Footprints className="h-3.5 w-3.5 transition group-hover:scale-110" />
            <span className="py-1 pr-1">{visited ? "Thanks for stopping by" : "I was here"}</span>
            {count !== null && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 tabular-nums text-foreground">{count}</span>
            )}
          </button>
        </span>

        <Button variant={"outline"} onClick={() => void copyEmail()} aria-label={`Copy ${EMAIL}`}>
          <MailIcon className="h-4 w-4 md:mr-2" />
          <span className="hidden md:flex">{EMAIL}</span>
        </Button>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
      <div role="status" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.shownAt}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 rounded-full border border-[#a78bfa]/40 bg-background/90 px-4 py-2 text-sm text-white shadow-lg backdrop-blur"
            >
              {toast.copied && <Check className="h-4 w-4 text-[#a78bfa]" />}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}
