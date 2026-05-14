import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TOCItem = {
  id: string;
  label: string;
};

type CaseTOCProps = {
  items: TOCItem[];
};

export default function CaseTOC({ items }: CaseTOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
    }
  };

  return (
    <nav
      aria-label="Case study sections"
      className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-1.5 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "group flex items-center gap-3 transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-px transition-all duration-200",
                    isActive
                      ? "w-8 bg-foreground"
                      : "w-4 bg-muted-foreground group-hover:w-6 group-hover:bg-foreground"
                  )}
                />
                <span className="tracking-tight">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
